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

// Function to get user data from cookies
const getUserFromCookie = async (): Promise<User | null> => {
  if (typeof window === "undefined") return INITIAL_VALUE;
  
  try {
    const response = await fetch('/api/get-user-cookie');
    if (response.ok) {
      const data = await response.json();
      return data.userData || INITIAL_VALUE;
    }
  } catch (error) {
    console.error("Error fetching user from cookie:", error);
  }
  return INITIAL_VALUE;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getUserFromStorage());
  const [isInitialized, setIsInitialized] = useState(false);

  const setUserData = (userData: User | null) => {
    setUser(userData);
  };

  const logout = async () => {
    setUser(INITIAL_VALUE);
    localStorage.removeItem(STORAGE_KEY);
    // Also clear the cookie
    await fetch('/api/clear-user-cookie', {
      method: 'POST',
    });
  };

  // Load user data from cookies if localStorage is empty (after page refresh)
  useEffect(() => {
    const checkUserCookie = async () => {
      if (!user) {
        const cookieUser = await getUserFromCookie();
        if (cookieUser) {
          setUser(cookieUser);
          // Restore localStorage from cookie data
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cookieUser));
        }
      }
      setIsInitialized(true);
    };
    
    checkUserCookie();
  }, []);

  // Save user to localStorage when it changes
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