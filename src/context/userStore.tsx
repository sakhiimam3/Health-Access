"use client"
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  email?: string;
  firstName?: string;
  id?: string;
  isActive?: boolean;
  isApproved?: boolean;
  isVerified?: boolean;
  lastName?: string;
  role?: string;
  token?: string;
}


export type UserContextType = {
  user: User | null;
  setUserData: (value: User | null) => void;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const INITIAL_VALUE = null;
const STORAGE_KEY = "health_access_user";

const getUserFromStorage = (): User | null => {
  if (typeof window === "undefined") return INITIAL_VALUE;
  
  const storedUser = localStorage.getItem(STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : INITIAL_VALUE;
};
// console.log("babab")
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getUserFromStorage());

  const setUserData = (userData: User | null) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(INITIAL_VALUE);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);



  return (
    <UserContext.Provider value={{ user, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};



export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}; 