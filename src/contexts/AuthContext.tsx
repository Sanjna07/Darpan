import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  aadhar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, aadhar: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('darpan_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, _password: string, aadhar: string) => {
    // Simple mock authentication logic
    // In a real app, you would verify email/password/aadhar with a backend
    if (email && aadhar.length === 12) {
      const newUser = { email, aadhar };
      setUser(newUser);
      localStorage.setItem('darpan_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('darpan_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
