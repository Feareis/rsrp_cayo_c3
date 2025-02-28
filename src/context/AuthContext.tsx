import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  employee_id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mode test (passer à false pour réactiver l'authentification normale)
const TEST_MODE = true;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (TEST_MODE) {
      const testUser = {
        id: "test-id",
        employee_id: "test-employee",
        username: "testuser",
        role: "Admin",
      };
      setUser(testUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(testUser));
      localStorage.setItem("isAuthenticated", "true");
      return;
    }

    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, []); // Supprimé `isAuthenticated` pour éviter les boucles infinies

  const login = async (username: string, password: string) => {
    if (TEST_MODE) {
      // Connexion automatique en mode test
      const testUser = {
        id: "test-id",
        employee_id: "test-employee",
        username: "testuser",
        role: "Admin",
      };
      setUser(testUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(testUser));
      localStorage.setItem("isAuthenticated", "true");
      return;
    }

    const { data, error } = await supabase
      .from("access")
      .select("id, employee_id, role, username, password_hash, is_active")
      .eq("username", username)
      .single();

    if (error || !data) {
      throw new Error("Utilisateur introuvable.");
    }

    if (!data.is_active) {
      throw new Error("Compte désactivé.");
    }

    // Vérification du mot de passe avec bcrypt
    const isValidPassword = await bcrypt.compare(password, data.password_hash);
    if (!isValidPassword) {
      throw new Error("Mot de passe incorrect.");
    }

    // Stocker l'utilisateur en session
    const userData: User = {
      id: data.id,
      employee_id: data.employee_id,
      username: data.username,
      role: data.role,
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = async () => {
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

// Hook personnalisé pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
