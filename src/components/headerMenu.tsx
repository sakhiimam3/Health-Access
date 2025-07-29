"use client";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { useUserContext } from "@/context/userStore";
import Image from "next/image";
import { toast } from "react-toastify";
import { Loader2, User, ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useGetPartnerProfile } from "@/lib/hooks";

const CustomDropdownMenu = () => {
  const { user, logout } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Only call useGetPartnerProfile when user role is "partner"
  const isPartnerUser = user?.data?.user?.role === "partner";
  console.log(isPartnerUser,"isPartnerUser")
  const { data: partnerProfile } = useGetPartnerProfile(isPartnerUser);
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

  // Determine role from user context first, fallback to API data
  const isCustomer = user?.data?.role === "customer" || partnerProfile?.data?.role === "customer";
  const isPartner = isPartnerUser || partnerProfile?.data?.role === "partner";
  
  // Get user data conditionally based on role
  let userImage, userName, userEmail;
  
  if (isCustomer) {
    // For customers, use user context data
    userImage = user?.data?.image;
    userName = `${user?.data?.firstName || ""} ${user?.data?.lastName || ""}`.trim();
    userEmail = user?.data?.email;
  } else if (isPartner) {
    // For partners, use API data
    userImage = partnerProfile?.data?.image;
    userName = `${partnerProfile?.data?.user?.firstName || ""} ${partnerProfile?.data?.user?.lastName || ""}`.trim();
    userEmail = partnerProfile?.data?.user?.email;
  } else {
    // Fallback for when role is not determined
    userImage = user?.data?.image || partnerProfile?.data?.image;
    userName = `${user?.data?.firstName || partnerProfile?.data?.user?.firstName || ""} ${user?.data?.lastName || partnerProfile?.data?.user?.lastName || ""}`.trim();
    userEmail = user?.data?.email || partnerProfile?.data?.user?.email;
  }

  return (
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
                      {userName || "User"}
                    </p>
                    {userEmail && (
                      <p className="text-sm text-gray-500 truncate">
                        {userEmail}
                      </p>
                    )}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      {isCustomer ? "Customer" : "Partner"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <Link
                  href={isCustomer ? "/customer/appointment" : "/dashboard"}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                  onClick={closeDropdown}
                >
                  <LayoutDashboard className="w-4 h-4 mr-3 text-gray-400" />
                  Dashboard
                </Link>

                {!isCustomer && (
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                    onClick={closeDropdown}
                  >
                    <Settings className="w-4 h-4 mr-3 text-gray-400" />
                    Settings
                  </Link>
                )}
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
  );
};

export default CustomDropdownMenu;
