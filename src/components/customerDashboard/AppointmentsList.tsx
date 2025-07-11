"use client";

import { useUpcomingAppointments } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin } from "lucide-react";

interface Appointment {
  time: string;
  partnerCode: string;
  partnerName: string;
  serviceName: string;
  status: string;
  date: string;
}

export default function AppointmentsList() {
  const { data: appointments, isLoading: loading, error } = useUpcomingAppointments();

  const appointmentsArray = Array.isArray(appointments?.data) ? appointments?.data : [];

  // Status styling helper
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time helper
  const formatTime = (timeString: string) => {
    // Assuming time is in 24-hour format, convert to 12-hour
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-slate-800">
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-2 text-slate-500">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-300 border-t-blue-500"></div>
              <span className="text-sm">Loading appointments...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-slate-800">
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-red-50 p-3 mb-4">
              <Calendar className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-red-600 font-medium">Failed to load appointments</p>
            <p className="text-slate-500 text-sm mt-1">Please try refreshing the page</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (appointmentsArray.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-slate-800">
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-50 p-3 mb-4">
              <Calendar className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">No upcoming appointments</p>
            <p className="text-slate-500 text-sm mt-1">Your schedule is currently clear</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Upcoming Appointments
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
            {appointmentsArray.length} {appointmentsArray.length === 1 ? 'appointment' : 'appointments'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {appointmentsArray.map((appointment: Appointment, index: number) => (
            <div
              key={index}
              className="p-6 hover:bg-slate-50/50 transition-colors duration-200 group"
            >
              <div className="flex items-center space-x-4">
                {/* Time Section */}
                <div className="flex-shrink-0">
                  <div className="text-center min-w-[70px]">
                    <div className="text-lg font-bold text-slate-900 leading-tight">
                      {formatTime(appointment.time)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(appointment.date)}
                    </div>
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-sm group-hover:shadow-md transition-shadow">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                      {appointment.partnerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-slate-900 text-lg leading-tight">
                          {appointment.partnerName}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                          Healthcare Provider • {appointment.partnerCode}
                        </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-blue-800 font-medium text-sm">
                            {appointment.serviceName}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="flex-shrink-0 ml-4">
                      <Badge 
                        variant="outline" 
                        className={`capitalize font-medium ${getStatusStyle(appointment.status)}`}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}