"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, MoreHorizontal, Search, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function CustomerAppointmentPage() {
  const appointments = [
    {
      id: 1,
      time: "09:00",
      provider: "Dr. Smith's Pharmacy",
      service: "NHS Consultation",
      type: "consultation",
      status: "confirmed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      time: "09:30",
      provider: "Central Health Clinic",
      service: "Travel Vaccine",
      type: "vaccine",
      status: "confirmed",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      time: "10:00",
      provider: "City Wellness Center",
      service: "Health Check",
      type: "checkup",
      status: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-ubuntu font-semibold text-gray-900">My Appointments</h1>
        {/* <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 font-roboto transition-colors">Book New Appointment</Button> */}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search appointments..." className="pl-10 font-roboto rounded-full" />
              </div>
            </div>
            <Button variant="outline" className="font-roboto rounded-full border-2 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="font-roboto rounded-full border-2 hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-ubuntu">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center min-w-[60px]">
                    <div className="text-lg font-bold text-gray-900 font-roboto">{appointment.time}</div>
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {appointment.provider
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 font-roboto">{appointment.provider}</h3>
                    <p className="text-sm text-gray-500 font-roboto">{appointment.service}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium font-roboto ${getStatusColor(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 