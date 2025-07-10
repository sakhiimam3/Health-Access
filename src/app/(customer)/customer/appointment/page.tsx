"use client";

import AppointmentsList from "@/components/customerDashboard/AppointmentsList";

export default function AppointmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-[#00A0AA]">My Appointments</h1>
      <AppointmentsList />
    </div>
  );
} 