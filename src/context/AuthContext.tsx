import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcryptjs";

// User interface
type User = {
  id: string;
  employee_id: string;
  username: string;
  role: string;
};

// Authentication context interface
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test mode (set to `false` for normal authentication)
const TEST_MODE = false;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Load user from local storage or redirect to login
  useEffect(() => {
    const fetchTestUser = async () => {
      if (TEST_MODE) {
        const { data, error } = await supabase
          .from("access")
          .select("id, employee_id, role, first_name, last_name, username, password_hash, is_active")
          .eq("username", "tp")
          .single();

        if (error || !data) {
          console.error("Erreur lors de la récupération de l'utilisateur test:", error);
          return;
        }

        if (!data.is_active) {
          console.error("Le compte test est désactivé.");
          return;
        }

        const testUser = { ...data };

        setUser(testUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(testUser));
        localStorage.setItem("isAuthenticated", "true");
        return;
      }

      // Mode normal : récupération de l'utilisateur stocké
      const storedUser = localStorage.getItem("user");
      const storedAuth = localStorage.getItem("isAuthenticated");

      if (storedUser && storedAuth === "true") {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } else {
        logout();
        navigate("/login");
      }
    };

    fetchTestUser();
  }, []);

  // Login function
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

    // Normal Mode, check password
    if (!TEST_MODE) {
      const isValidPassword = await bcrypt.compare(password, data.password_hash);
      if (!isValidPassword) throw new Error("Incorrect password.");
    }

    // Fetch employee data
    const userData = { ...data, employee_id: data.employee_id };

    // Save user session
    console.log(userData)
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  // Logout function
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

// Custom hook to use authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};