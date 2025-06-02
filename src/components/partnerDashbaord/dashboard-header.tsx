"use client";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/context/userStore";
import { toast } from "react-toastify";
import { Avatar } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Logo from "@public/images/logo.png";

export function DashboardHeader() {
  const { user, logout } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  console.log(user,"baba");

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
      toast.success("Logout successfully");
      await fetch("/api/clear-user-cookie", {
        method: "POST",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to clear cookie:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <Link href="/">
                <Image
                  src={Logo}
                  width={200}
                  height={200}
                  alt="HealthAccess Logo"
                />
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1">
            {/* Notification icon */}
            <Button variant="ghost" className="relative">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center relative">
                <Bell className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
            </Button>
            {/* Profile avatar with dropdown */}
            <div className="relative inline-block text-left">
              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {/* Using Avatar component for potential future image integration */}
                  <Avatar className="h-8 w-8 flex items-center justify-center">
                    {/* Replace with actual Image component and user image when available */}
                    <User className="h-5 w-5 text-gray-700" />
                  </Avatar>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="ml-1 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="py-1">
                    {/* Dashboard link */}
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <Link href="/dashboard">
                        <span>Dashboard</span>
                      </Link>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    {/* Logout button */}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Logging out...
                        </>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
