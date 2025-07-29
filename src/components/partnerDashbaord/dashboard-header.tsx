"use client";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/userStore";
import Image from "next/image";
import Link from "next/link";
import Logo from "@public/images/logo.png";
import { useGetPartnerProfile } from "@/lib/hooks";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";

export function DashboardHeader() {
  const { user } = useUserContext();
  
  // Only call useGetPartnerProfile when user role is "partner"
  const isPartnerUser = user?.data?.role === "partner";
  const { data: partnerProfile, isLoading: isLoadingProfile } =
    useGetPartnerProfile(isPartnerUser);

  // Get user data from partner profile
  const userData = {
    firstName: partnerProfile?.data?.user?.firstName,
    lastName: partnerProfile?.data?.user?.lastName,
    email: partnerProfile?.data?.user?.email,
    image: partnerProfile?.data?.image,
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
            {/* Profile dropdown */}
            <ProfileDropdown
              userType="Partner"
              showSettings={true}
              userData={userData}
              isLoading={isLoadingProfile}
              dashboardUrl="/dashboard"
              settingsUrl="/dashboard/settings"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
