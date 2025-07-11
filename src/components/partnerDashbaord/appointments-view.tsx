"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, User, Mail, Phone, Calendar,Filter, Search,Clock, FileText, Settings, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  useGetPartnerAppointments,
  useUpdatePartnerAppointmentStatus,
  useGetPartnerAppointmentById,
} from "@/lib/hooks";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/DatePicker";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function AppointmentsView() {
  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [status, setStatus] = useState<string | undefined>("all");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch appointments
  const { data, isLoading, error, refetch } = useGetPartnerAppointments({
    status: status === "all" ? undefined : status,
    // Only include dateFrom/dateTo if both are set
    dateFrom:
      dateFrom && dateTo ? dateFrom.toISOString().slice(0, 10) : undefined,
    dateTo: dateFrom && dateTo ? dateTo.toISOString().slice(0, 10) : undefined,
    limit: 10,
    page: 1,
  });
  const appointments = data?.data || [];

  // Appointment detail
  const { data: detailData } = useGetPartnerAppointmentById(
    selectedAppointmentId || ""
  );
  const appointmentDetail = detailData || null;

  // Status update
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { mutate: updateStatus } = useUpdatePartnerAppointmentStatus(
    updatingId || ""
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setUpdatingId(id);
    updateStatus(
      { status: newStatus },
      {
        onSuccess: () => {
          refetch();
          setUpdatingId(null);
        },
      }
    );
  };

  // Filtered by search
  const filteredAppointments = search
    ? appointments.filter(
        (a: any) =>
          `${a.customerFirstName} ${a.customerLastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          a.serviceName?.toLowerCase().includes(search.toLowerCase())
      )
    : appointments;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-ubuntu font-semibold text-gray-900">
            Appointments
          </h1>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10 font-roboto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                className="font-roboto"
                onClick={() => setShowFilters((f) => !f)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="font-roboto"
                onClick={() => {
                  setDateFrom(new Date());
                  setDateTo(new Date());
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
            </div>
            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="w-40">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    {/* Add bg-white to SelectContent to fix transparency */}
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <DatePicker
                    value={dateFrom}
                    onChange={setDateFrom}
                    placeholder="From date"
                  />
                </div>
                <div className="w-40">
                  <DatePicker
                    value={dateTo}
                    onChange={setDateTo}
                    placeholder="To date"
                  />
                </div>
                {/* Show range indicator if both dates are set */}
                {dateFrom && dateTo && (
                  <div className="flex items-center text-sm text-gray-600 font-roboto">
                    {dateFrom.toLocaleDateString()} -{" "}
                    {dateTo.toLocaleDateString()}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-ubuntu">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.length === 0 && (
                <div className="text-center text-gray-500">
                  No appointments found.
                </div>
              )}
              {filteredAppointments.map((appointment: any) => (
                <div
                  key={appointment.appointmentId}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center min-w-[60px]">
                      <div className="text-lg font-bold text-gray-900 font-roboto">
                        {appointment.appointmentTime?.slice(0, 5) || "--:--"}
                      </div>
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={appointment.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {`${appointment.customerFirstName?.[0] || ""}${
                          appointment.customerLastName?.[0] || ""
                        }`}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 font-roboto">
                        {appointment.customerFirstName}{" "}
                        {appointment.customerLastName}
                      </h3>
                      <p className="text-sm text-gray-500 font-roboto">
                        {appointment.serviceName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium font-roboto ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button> */}
                    <Dialog
                      open={
                        modalOpen &&
                        selectedAppointmentId === appointment.appointmentId
                      }
                      onOpenChange={(open) => {
                        setModalOpen(open);
                        if (!open) setSelectedAppointmentId(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedAppointmentId(appointment.appointmentId);
                            setModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      {/* Switch beside Eye icon, colored by status, with tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                        <div
  role="switch"
  aria-checked={appointment.status === "confirmed"}
  tabIndex={0}
  onClick={() => {
    if (updatingId !== appointment.appointmentId) {
      handleStatusChange(
        appointment.appointmentId,
        appointment.status === "confirmed" ? "pending" : "confirmed"
      );
    }
  }}
  onKeyDown={e => {
    if ((e.key === "Enter" || e.key === " ") && updatingId !== appointment.appointmentId) {
      handleStatusChange(
        appointment.appointmentId,
        appointment.status === "confirmed" ? "pending" : "confirmed"
      );
    }
  }}
  className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300
    ${appointment.status === "confirmed" ? "bg-emerald-500" : "bg-gray-300"}
    ${updatingId === appointment.appointmentId ? "opacity-50 cursor-not-allowed" : ""}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
  `}
  style={{ pointerEvents: updatingId === appointment.appointmentId ? "none" : undefined }}
>
  <span
    className={`absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 flex items-center justify-center rounded-full bg-white shadow transition-transform duration-300
      ${appointment.status === "confirmed" ? "translate-x-6" : "translate-x-0"}
    `}
  >
    {appointment.status === "confirmed" && (
      <CheckCircle className="h-3 w-3 text-emerald-500" />
    )}
  </span>
</div>


                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {"Update Status"}
                        </TooltipContent>
                      </Tooltip>
                      <DialogContent className="max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-2">Appointment Details</DialogTitle>
                          <DialogDescription asChild>
                            {appointmentDetail ? (
                              <div className="space-y-6 text-left">
                                {/* Patient Info */}
                                <div>
                                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><User className="h-5 w-5 text-blue-500" /> Patient Info</h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <span className="font-medium">Name:</span> {appointmentDetail?.partner?.user?.firstName || "N/A"} {appointmentDetail?.partner?.user?.lastName || ""}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <span>{appointmentDetail?.partner?.user?.email || "N/A"}</span>
                                    </div>
                                   
                                  </div>
                                </div>
                                {/* Appointment Info */}
                                <div>
                                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Calendar className="h-5 w-5 text-green-500" /> Appointment Info</h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">Service:</span> {appointmentDetail.service?.name || "N/A"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">Date:</span> {appointmentDetail.appointmentDate || "N/A"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">Time:</span> {appointmentDetail.appointmentTime?.slice(0, 5) || "N/A"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Day of Week:</span> {appointmentDetail.dayOfWeek || "N/A"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">Duration:</span> {appointmentDetail.durationMinutes ? `${appointmentDetail.durationMinutes} min` : "N/A"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Settings className="h-4 w-4 text-gray-500" />
                                      <span className="font-medium">Status:</span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-1 ${
                                        appointmentDetail.status === "confirmed"
                                          ? "bg-green-100 text-green-800"
                                          : appointmentDetail.status === "pending"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : appointmentDetail.status === "cancelled"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}>
                                        {appointmentDetail.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {/* Partner Info */}
                                <div>
                                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><Users className="h-5 w-5 text-pink-500" /> Partner Info</h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <span className="font-medium">Name:</span> {appointmentDetail.partner?.businessName || "N/A"}
                                    </div>
                                    <div>
                                      <span className="font-medium">Phone:</span> {appointmentDetail.partner?.phoneNumber || "N/A"}
                                    </div>
                                  </div>
                                </div>
                                {/* Notes */}
                                <div>
                                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2"><FileText className="h-5 w-5 text-purple-500" /> Notes</h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <span className="font-medium">Patient Notes:</span> {appointmentDetail.notes || <span className="text-gray-400">N/A</span>}
                                    </div>
                                    <div>
                                      <span className="font-medium">Admin Notes:</span> {appointmentDetail.adminNotes || <span className="text-gray-400">N/A</span>}
                                    </div>
                                    <div>
                                      <span className="font-medium">Partner Notes:</span> {appointmentDetail.partnerNotes || <span className="text-gray-400">N/A</span>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center min-h-[100px]">Loading...</div>
                            )}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
