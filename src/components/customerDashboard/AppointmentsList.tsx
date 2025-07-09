"use client";

import { useUpcomingAppointments } from "@/lib/hooks";

interface Appointment {
  time: string;
  partnerCode: string;
  partnerName: string;
  serviceName: string;
  status: string;
  date: string;
}

export default function AppointmentsList() {
  const { data: appointments = [], isLoading: loading, error } = useUpcomingAppointments();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A0AA]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load appointments
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No appointments found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-4 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg text-[#00A0AA]">
              {appointment.serviceName}
            </h3>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 capitalize">
              {appointment.status}
            </span>
          </div>
          <div className="text-gray-600">
            <p className="font-medium">{appointment.partnerName}</p>
            <p className="text-sm">
              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 