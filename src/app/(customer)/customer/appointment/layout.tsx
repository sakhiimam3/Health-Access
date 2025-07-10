import LayoutWrapper from "@/components/layout/wrapper";
import { CustomerDashboardHeader } from "@/components/customerDashboard/dashboard-header";
import { CustomerDashboardTabs } from "@/components/customerDashboard/dashboard-tabs";
import type React from "react";

export default function CustomerAppointmentGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomerDashboardHeader />
      <LayoutWrapper>
        <CustomerDashboardTabs />
        {children}
      </LayoutWrapper>
    </>
  );
} 