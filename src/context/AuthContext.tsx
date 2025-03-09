import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcryptjs";

/**
 * User type definition.
 */
type User = {
  id: string;
  employee_id: string;
  username: string;
  role: string;
};

/**
 * Authentication context type definition.
 */
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * TEST_MODE allows bypassing authentication for testing purposes.
 * Set to `false` for normal authentication.
 */
const TEST_MODE = false;

/**
 * AuthProvider component manages authentication state and session persistence.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * Fetches the test user from Supabase (used in TEST_MODE).
   */
  const fetchTestUser = async () => {
    try {
      const { data, error } = await supabase
        .from("access")
        .select("id, employee_id, role, first_name, last_name, username, password_hash, is_active")
        .eq("username", "tp")
        .single();

      if (error || !data) {
        console.error("Error fetching test user:", error);
        return;
      }

      if (!data.is_active) {
        console.error("Test account is disabled.");
        return;
      }

      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      console.error("Unexpected error fetching test user:", err);
    }
  };

  /**
   * Loads the user session from localStorage or redirects to login.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";

    if (TEST_MODE) {
      fetchTestUser();
      return;
    }

    if (storedUser && storedAuth) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      logout();
      navigate("/login");
    }
  }, [navigate]);

  /**
   * Handles user login with username and password.
   */
  const login = async (username: string, password: string) => {
    if (TEST_MODE) {
      username = "tp";
    }

    // Fetch user credentials from database
    const { data, error } = await supabase
      .from("access")
      .select("id, employee_id, role, first_name, last_name, username, password_hash, is_active")
      .eq("username", username)
      .single();

    if (error || !data) throw new Error("User not found.");
    if (!data.is_active) throw new Error("Account disabled.");

    // Validate password if not in TEST_MODE
    if (!TEST_MODE) {
      const isValidPassword = await bcrypt.compare(password, data.password_hash);
      if (!isValidPassword) throw new Error("Incorrect password.");
    }

    // Save user session
    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("isAuthenticated", "true");
  };

  /**
   * Logs out the user and clears the session.
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
