"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Dashboard", href: "/customer/dashboard" },
  { name: "Appointments", href: "/customer/appointment" },
];

export function CustomerDashboardTabs() {
  const pathname = usePathname();

  return (
    <div className="my-6">
      <nav className="flex space-x-3">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/customer/dashboard" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "px-6 py-3 text-base font-roboto font-medium rounded-[20px] transition-colors",
                isActive
                  ? "bg-teal-600 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 