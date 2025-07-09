"use client";
import Image from "next/image";
import Link from "next/link";

export function CustomerDashboardHeader() {
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
          {/* Right side (placeholder for user info) */}
          <div className="flex items-center space-x-1">
            <span className="text-gray-700 font-medium">Customer</span>
          </div>
        </div>
      </div>
    </header>
  );
} 