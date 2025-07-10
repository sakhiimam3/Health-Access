"use client";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { useUserContext } from "@/context/userStore";
import Image from "next/image";
import { toast } from "react-toastify";
import { Loader2, User } from "lucide-react";
import { useGetPartnerProfile } from "@/lib/hooks";

const CustomDropdownMenu = () => {
  const { user, logout } = useUserContext();
  console.log(user, "baba321");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: partnerProfile } = useGetPartnerProfile();
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
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <Avatar className="h-9 w-9 flex items-center justify-center">
          {(
            (user?.data?.role === "customer" && user?.data?.image) ||
            (user?.data?.role !== "customer" && user?.data?.user?.image)
          ) ? (
            <Image
              src={
                user?.data?.role === "customer"
                  ? user?.data?.image
                  : user?.data?.user?.image
              }
              width={36}
              height={36}
              alt="profile-image"
            />
          ) : (
            <User className="w-7 h-7 text-gray-400 mx-auto" />
          )}
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
                {user?.data?.role === "customer" ? (
                  <div className="px-4 py-2 font-normal text-sm">
                    <span className="font-roboto">
                      {" "}
                      Name: {user?.data?.firstName} {user?.data?.lastName}
                    </span>
                  </div>
                ) : (
                  <div className="px-4 py-2 font-normal text-sm">
                    <span className="font-roboto">
                      {" "}
                      Name: {user?.data?.user?.firstName}{" "}
                      {user?.data?.user?.lastName}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200"></div>

                <div className="px-4 py-2 text-sm text-gray-500">
                  <Link href={user?.data?.role === "customer" ? "/customer/appointment":"/dashboard"}>
                    <span>Dashboard </span>
                  </Link>
                </div>
                <div className="border-t border-gray-200"></div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
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
