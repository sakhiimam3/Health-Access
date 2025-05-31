"use client"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { useUserContext } from "@/context/userStore"
import Image from "next/image"
import { toast } from "react-toastify"
import { Avatar } from "@/components/ui/avatar";

export function DashboardHeader() {
  const { user, logout } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success("Logout successfully")
    window.location.href = "/login"
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-teal-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path fillRule="evenodd" d="M12 6.00001C10.1381 6.00001 8.2763 6.65063 6.87009 7.88915C5.46388 9.12767 4.59826 10.8013 4.40317 12.5805L4.3324 13.247C4.3011 13.5469 4.04705 13.7757 3.74716 13.807C3.44728 13.8383 3.21852 13.5843 3.18722 13.2844L3.25799 12.6179C3.50636 10.3144 4.55908 8.22423 6.19752 6.73421C7.83596 5.24419 9.96459 4.50001 12 4.50001C14.0354 4.50001 16.164 5.24419 17.8025 6.73421C19.4409 8.22423 20.4936 10.3144 20.742 12.6179L20.8128 13.2844C20.7815 13.5843 20.5527 13.8383 20.2528 13.807C19.9529 13.7757 19.6989 13.5469 19.6676 13.247L19.5968 12.5805C19.4017 10.8013 18.5361 9.12767 17.1299 7.88915C15.7237 6.65063 13.8619 6.00001 12 6.00001ZM12 17.45C11.7612 17.45 11.5298 17.3616 11.3545 17.1959C11.1792 17.0303 11.0799 16.8057 11.0799 16.5699V13.5699H8.07994C7.84416 13.5699 7.61953 13.4706 7.4539 13.2953C7.28827 13.12 7.19994 12.8886 7.19994 12.6499C7.19994 12.4111 7.28827 12.1797 7.4539 12.0044C7.61953 11.8291 7.84416 11.7398 8.07994 11.7398H11.0799V8.73975C11.0799 8.50097 11.1792 8.27634 11.3545 8.11071C11.5298 7.94508 11.7612 7.85675 12 7.85675C12.2388 7.85675 12.4702 7.94508 12.6455 8.11071C12.8208 8.27634 12.9201 8.50097 12.9201 8.73975V11.7398H15.9201C16.1589 11.7398 16.3902 11.8291 16.5655 12.0044C16.7409 12.1797 16.8292 12.4111 16.8292 12.6499C16.8292 12.8886 16.7409 13.12 16.5655 13.2953C16.3902 13.4706 16.1589 13.5699 15.9201 13.5699H12.9201V16.5699C12.9201 16.8057 12.8208 17.0303 12.6455 17.1959C12.4702 17.3616 12.2388 17.45 12 17.45Z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-ubuntu text-xl font-semibold text-gray-900">
                <span className="text-teal-500">HEALTH</span>ACCESS
              </span>
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
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                   {/* Using Avatar component for potential future image integration */}
                   <Avatar className="h-8 w-8 flex items-center justify-center">
                     {/* Replace with actual Image component and user image when available */}
                     <User className="h-5 w-5 text-gray-700" />
                   </Avatar>
                </div>
                <button type="button" onClick={() => setIsOpen(!isOpen)} className="ml-1 cursor-pointer">
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
                      <Link href="/partner/dashboard">
                        <span>Dashboard</span>
                      </Link>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    {/* Logout button */}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
