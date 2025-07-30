"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, User, Mail, Phone, Calendar,Filter, Search,Clock, FileText, Settings, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from "react-toastify";

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
  // const [showFilters, setShowFilters] = useState(false);
  // const [status, setStatus] = useState<string | undefined>("all");
  // const [dateFrom, setDateFrom] = useState<Date | null>(null);
  // const [dateTo, setDateTo] = useState<Date | null>(null);
  const [search, setSearch] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch appointments
  const { data, isLoading, error, refetch } = useGetPartnerAppointments({
    // status: status === "all" ? undefined : status,
    // Only include dateFrom/dateTo if both are set
    // dateFrom:
    //   dateFrom && dateTo ? dateFrom.toISOString().slice(0, 10) : undefined,
    // dateTo: dateFrom && dateTo ? dateTo.toISOString().slice(0, 10) : undefined,
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
          toast.success(`Appointment status updated to ${newStatus} successfully!`);
        },
        onError: (error) => {
          setUpdatingId(null);
          toast.error("Failed to update appointment status. Please try again.");
        },
      }
    );
  };

  // Format date and time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString?.slice(0, 5) || "--:--";
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading appointments...</div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-ubuntu font-bold text-gray-900">
              Appointments
            </h1>
            <p className="text-gray-600 mt-1">Manage your upcoming appointments</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-700 font-medium">{filteredAppointments.length} Total</span>
          </div>
        </div>

        {/* Search */}
        <Card className="shadow-sm border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by patient name or service..."
                    className="pl-12 font-roboto h-12 border-white bg-white shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              {/* Comment out filter buttons for now */}
              {/* <Button
                variant="outline"
                className="font-roboto h-12"
                onClick={() => setShowFilters((f) => !f)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                className="font-roboto h-12"
                onClick={() => {
                  setDateFrom(new Date());
                  setDateTo(new Date());
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button> */}
            </div>
            {/* Comment out filter section */}
            {/* {showFilters && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="w-40">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
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
                {dateFrom && dateTo && (
                  <div className="flex items-center text-sm text-gray-600 font-roboto">
                    {dateFrom.toLocaleDateString()} -{" "}
                    {dateTo.toLocaleDateString()}
                  </div>
                )}
              </div>
            )} */}
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="shadow-sm border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="font-ubuntu text-xl text-gray-800">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredAppointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                  <p className="text-gray-500">
                    {search ? "Try adjusting your search criteria" : "You don't have any appointments scheduled"}
                  </p>
                </div>
              )}
              {filteredAppointments.map((appointment: any, index: number) => (
                <div
                  key={appointment.appointmentId}
                  className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-all duration-200 group ${
                    index !== filteredAppointments.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center space-x-6 flex-1">
                    {/* Time Section */}
                    <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-4 min-w-[100px] group-hover:bg-blue-100 transition-colors">
                      <div className="text-xl font-bold text-blue-900 font-roboto">
                        {formatTime(appointment.appointmentTime)}
                      </div>
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        {appointment.dayOfWeek}
                      </div>
                      <div className="text-xs text-blue-500 mt-1">
                        {formatDate(appointment.appointmentDate)}
                      </div>
                    </div>

                    {/* Patient Avatar */}
                    <Avatar className="h-14 w-14 border-2 border-gray-200 shadow-sm">
                      <AvatarImage
                        src={appointment.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                        {`${appointment.customerFirstName?.[0] || ""}${
                          appointment.customerLastName?.[0] || ""
                        }`}
                      </AvatarFallback>
                    </Avatar>

                    {/* Patient & Service Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 font-roboto">
                          {appointment.customerFirstName} {appointment.customerLastName}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                            appointment.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : appointment.status === "pending"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : appointment.status === "cancelled"
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-gray-100 text-gray-800 border border-gray-200"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{appointment.serviceName}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{appointment.customerPhone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{appointment.customerEmail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Price */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        £{appointment.serviceBasePrice}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.durationMinutes} min
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-6">
                    {/* View Details Button */}
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
                          variant="outline"
                          size="sm"
                          className="h-10 px-4 font-roboto border-gray-300 hover:border-blue-500 hover:text-blue-600"
                          onClick={() => {
                            setSelectedAppointmentId(appointment.appointmentId);
                            setModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>

                      {/* Status Toggle Switch */}
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
  className={`relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full transition-all duration-300 shadow-sm ml-3
    ${appointment.status === "confirmed" ? "bg-emerald-500 shadow-emerald-200" : "bg-gray-300"}
    ${updatingId === appointment.appointmentId ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
  `}
  style={{ pointerEvents: updatingId === appointment.appointmentId ? "none" : undefined }}
>
  <span
    className={`absolute left-1 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300
      ${appointment.status === "confirmed" ? "translate-x-6" : "translate-x-0"}
    `}
  >
    {updatingId === appointment.appointmentId ? (
      <div className="h-3 w-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
    ) : appointment.status === "confirmed" ? (
      <CheckCircle className="h-4 w-4 text-emerald-500" />
    ) : (
      <XCircle className="h-4 w-4 text-gray-400" />
    )}
  </span>
</div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="font-medium">
                            {appointment.status === "confirmed" ? "Mark as Pending" : "Mark as Confirmed"}
                          </p>
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
                                      <span className="font-medium">Name:</span> {appointmentDetail?.customer?.user?.firstName || "N/A"} {appointmentDetail?.customer?.user?.lastName || ""}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-500" />
                                      <span>{appointmentDetail?.customer?.user?.email || "N/A"}</span>
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
