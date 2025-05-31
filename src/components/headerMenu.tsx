"use client";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { useUserContext } from "@/context/userStore";
import Image from "next/image";
import { toast } from "react-toastify";

const CustomDropdownMenu = () => {
  const { user, logout } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    
      logout()
      toast.success("Logout successfully");
      window.location.href = "/login";
    
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <Image
            src={"/images/Profile_avatar.png"}
            width={36}
            height={36}
            alt={true ? "N/A" : "N/A"}
          />
        </Avatar>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="ml-1 w-4 h-4"
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
        <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {true ? (
              <>
                <div className="px-4 py-2 font-normal text-sm">
                 <span className="font-roboto"> Name: {user?.firstName} {user?.lastName}</span>
                </div>
                <div className="border-t border-gray-200"></div>

                <div className="px-4 py-2 text-sm text-gray-500">
                  <Link href="/partner/dashboard">
                  <span>Dashboard </span> 
                  </Link>
                </div>
                <div className="border-t border-gray-200"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownMenu;
