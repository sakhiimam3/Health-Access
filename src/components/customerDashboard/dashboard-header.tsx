"use client";
import Image from "next/image";
import Link from "next/link";
import { Bell, User, Loader2, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useUserContext } from "@/context/userStore";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetPartnerProfile } from "@/lib/hooks";

export function CustomerDashboardHeader() {
  const { user, logout } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

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

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const userName = `${user?.data?.firstName || ""} ${user?.data?.lastName || ""}`.trim();
  const userEmail = user?.data?.email;
  const userImage = user?.data?.image;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div>
              <Link href="/">
                <Image
                  src="/images/logo.png"
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
            {/* <Button variant="ghost" className="relative">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center relative">
                <Bell className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </div>
            </Button> */}
            
            {/* Profile dropdown */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
              {/* Dropdown Trigger */}
              <button
                type="button"
                onClick={handleToggleDropdown}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <Avatar className="h-9 w-9 flex items-center justify-center border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  {userImage ? (
                    <Image
                      src={userImage}
                      width={36}
                      height={36}
                      alt="Profile image"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </Avatar>
                <div className="hidden sm:block">
                  <span className="text-gray-700 font-medium text-sm">
                    {userName || 'Customer'}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <>
                  {/* Backdrop for mobile */}
                  <div className="fixed inset-0 z-10 md:hidden" onClick={closeDropdown} />
                  
                  <div className="absolute right-0 z-20 w-72 mt-2 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="py-2">
                      {/* User Info Section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12 flex items-center justify-center border-2 border-gray-200">
                            {userImage ? (
                              <Image
                                src={userImage}
                                width={48}
                                height={48}
                                alt="Profile image"
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-6 h-6 text-gray-400" />
                            )}
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {userName || "Customer"}
                            </p>
                            {userEmail && (
                              <p className="text-sm text-gray-500 truncate">
                                {userEmail}
                              </p>
                            )}
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              Customer
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href="/customer/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                          onClick={closeDropdown}
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
                          Dashboard
                        </Link>
                      </div>

                      {/* Logout Section */}
                      <div className="border-t border-gray-100 py-1">
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                        >
                          {isLoggingOut ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                              Logging out...
                            </>
                          ) : (
                            <>
                              <LogOut className="w-4 h-4 mr-3" />
                              Sign out
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 