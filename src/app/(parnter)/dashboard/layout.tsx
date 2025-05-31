import LayoutWrapper from "@/components/layout/wrapper";
import { DashboardHeader } from "@/components/partnerDashbaord/dashboard-header";
import { DashboardTabs } from "@/components/partnerDashbaord/dashboard-tabs";
import type React from "react";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <LayoutWrapper>
      <DashboardTabs />

      {children}
      </LayoutWrapper>
   
    </>
  );
}
