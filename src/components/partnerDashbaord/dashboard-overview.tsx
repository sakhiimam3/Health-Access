"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Clock,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  RefreshCw,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Star,
  BarChart3,
  X,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Skeleton from "@/components/ui/Skeleton";
import { useState, useMemo, useEffect } from "react";
import {
  useGetAppointmentAnalytics,
  useGetOverallAppointmentAnalytics,
  useGetRevenueAnalytics,
  useGetServicePerformance,
  useGetPatientDemographics,
  useGetPartnerDashboard,
  useGetPartnerAppointments,
} from "@/lib/hooks";

interface FilterState {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  serviceType: string;
  appointmentStatus: string;
  timeRange: string;
  searchQuery: string;
}

export function DashboardOverview() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: null, to: null },
    serviceType: "all",
    appointmentStatus: "all",
    timeRange: "today",
    searchQuery: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(filters);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // Calculate date ranges based on timeRange filter
  const getDateRangeFromTimeFilter = (timeRange: string) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (timeRange) {
      case "today":
        return {
          from: today.toISOString().split("T")[0],
          to: today.toISOString().split("T")[0],
        };
      case "week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return {
          from: weekStart.toISOString().split("T")[0],
          to: weekEnd.toISOString().split("T")[0],
        };
      case "month":
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return {
          from: monthStart.toISOString().split("T")[0],
          to: monthEnd.toISOString().split("T")[0],
        };
      case "quarter":
        const quarterStart = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3,
          1
        );
        const quarterEnd = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3 + 3,
          0
        );
        return {
          from: quarterStart.toISOString().split("T")[0],
          to: quarterEnd.toISOString().split("T")[0],
        };
      case "year":
        const yearStart = new Date(today.getFullYear(), 0, 1);
        const yearEnd = new Date(today.getFullYear(), 11, 31);
        return {
          from: yearStart.toISOString().split("T")[0],
          to: yearEnd.toISOString().split("T")[0],
        };
      default:
        return { from: undefined, to: undefined };
    }
  };

  // Get effective date range
  const effectiveDateRange = useMemo(() => {
    if (appliedFilters.dateRange.from && appliedFilters.dateRange.to) {
      return {
        from: appliedFilters.dateRange.from.toISOString().split("T")[0],
        to: appliedFilters.dateRange.to.toISOString().split("T")[0],
      };
    }
    return getDateRangeFromTimeFilter(appliedFilters.timeRange);
  }, [appliedFilters.dateRange, appliedFilters.timeRange]);

  // API hooks with filter parameters
  const { data: analytics, isLoading: analyticsLoading } =
    useGetAppointmentAnalytics();
  const { data: overallAnalytics, isLoading: overallLoading } =
    useGetOverallAppointmentAnalytics();
  const { data: servicePerformance, isLoading: performanceLoading } =
    useGetServicePerformance();
  const { data: demographics, isLoading: demographicsLoading } =
    useGetPatientDemographics();

  // Use filtered appointment data
  const {
    data: upcomingAppointments,
    isLoading: appointmentsLoading,
    refetch: refetchAppointments,
  } = useGetPartnerAppointments({
    status:
      appliedFilters.appointmentStatus !== "all"
        ? appliedFilters.appointmentStatus
        : undefined,
    dateFrom: effectiveDateRange.from,
    dateTo: effectiveDateRange.to,
    limit: 50,
    page: 1,
  });

  const { data: revenueData, isLoading: revenueLoading } =
    useGetRevenueAnalytics();
  const { data: dashboardData, isLoading: dashboardLoading } =
    useGetPartnerDashboard();
  console.log(dashboardData, "dashboardData111");

  const nextPatient = dashboardData?.data?.nextPatient || {};
  const dashboardStats = dashboardData?.data?.stats || {};
  const dashboardUpcomingAppointments =
    dashboardData?.data?.upcomingAppointments || [];

  console.log(dashboardUpcomingAppointments, "dashboardUpcomingAppointments)");
  const applyFilters = () => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  // Reset filters function
  const resetFilters = () => {
    const defaultFilters = {
      dateRange: { from: null, to: null },
      serviceType: "all",
      appointmentStatus: "all",
      timeRange: "today",
      searchQuery: "",
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      appliedFilters.serviceType !== "all" ||
      appliedFilters.appointmentStatus !== "all" ||
      appliedFilters.timeRange !== "today" ||
      appliedFilters.searchQuery !== "" ||
      appliedFilters.dateRange.from !== null ||
      appliedFilters.dateRange.to !== null
    );
  }, [appliedFilters]);

  // Filter appointments based on search and service type
  const filteredAppointments = useMemo(() => {
    if (!upcomingAppointments?.data) return [];

    return upcomingAppointments.data.filter((appointment: any) => {
      // Search filter
      if (appliedFilters.searchQuery) {
        const searchLower = appliedFilters.searchQuery.toLowerCase();
        const patientName = (
          appointment.patient?.name ||
          appointment.customerName ||
          ""
        ).toLowerCase();
        const serviceName = (
          appointment.service?.name ||
          appointment.serviceName ||
          ""
        ).toLowerCase();

        if (
          !patientName.includes(searchLower) &&
          !serviceName.includes(searchLower)
        ) {
          return false;
        }
      }

      // Service type filter (applied at API level, but double-check for client-side filtering)
      if (
        appliedFilters.serviceType !== "all" &&
        appointment.service?.type !== appliedFilters.serviceType
      ) {
        return false;
      }

      return true;
    });
  }, [
    upcomingAppointments,
    appliedFilters.searchQuery,
    appliedFilters.serviceType,
  ]);

  // Use dashboardUpcomingAppointments instead of filteredAppointments for the main display
  const displayAppointments =
    dashboardUpcomingAppointments.length > 0
      ? dashboardUpcomingAppointments
      : filteredAppointments;

  // Smart filtering for active appointments (prioritize current and near-future dates)
  const getSmartFilteredAppointments = (appointments: any[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    // Filter appointments to show only today and upcoming within next week
    const activeAppointments = appointments.filter((appointment: any) => {
      if (!appointment.appointmentDate) return false;
      
      const appointmentDate = new Date(appointment.appointmentDate);
      const appointmentDay = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
      
      // Show only appointments from today onwards and within next week
      return appointmentDay >= today && appointmentDay <= nextWeek;
    });

    // Sort appointments: Today first, then by date and time
    const sortedAppointments = activeAppointments.sort((a: any, b: any) => {
      const dateA = new Date(a.appointmentDate);
      const dateB = new Date(b.appointmentDate);
      
      const dayA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
      const dayB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
      
      // Prioritize today's appointments
      const isToday = (date: Date) => date.getTime() === today.getTime();
      
      if (isToday(dayA) && !isToday(dayB)) return -1;
      if (!isToday(dayA) && isToday(dayB)) return 1;
      
      // Then sort by date
      if (dayA.getTime() !== dayB.getTime()) {
        return dayA.getTime() - dayB.getTime();
      }
      
      // Then sort by time
      const timeA = a.appointmentTime || '';
      const timeB = b.appointmentTime || '';
      return timeA.localeCompare(timeB);
    });

    // Limit to max 10 appointments to prevent UI overflow
    return sortedAppointments.slice(0, 10);
  };

  const smartFilteredAppointments = getSmartFilteredAppointments(displayAppointments);

  // Copy phone number function
  const copyPhoneNumber = async (phone: string, appointmentId: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(appointmentId);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  const handleRefresh = () => {
    refetchAppointments();
  };

  // Auto-refresh when filters change
  useEffect(() => {
    refetchAppointments();
  }, [appliedFilters, refetchAppointments]);

  const chartData = overallAnalytics?.data?.monthlyData || [];

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Partner Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your healthcare dashboard overview
          </p>
        </div>
        {/* <div className="flex gap-2">
          <Button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant={hasActiveFilters ? "default" : "outline"} 
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 bg-white text-blue-600">
                {Object.values(appliedFilters).filter(v => v !== "all" && v !== "" && v !== null).length}
              </Badge>
            )}
          </Button>
          <Button 
            onClick={handleRefresh}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div> */}
      </div>

      {/* Enhanced Filters Section */}
      {isFilterOpen && (
        <Card className="bg-white shadow-lg border border-gray-200 transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-ubuntu font-bold text-gray-700 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search Patients or Services
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by patient name or service..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Quick Time Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Quick Time Range
                </label>
                <Select
                  value={filters.timeRange}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      timeRange: value,
                      dateRange: { from: null, to: null }, // Clear custom date range when using quick filter
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Service Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <Select
                  value={filters.serviceType}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, serviceType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Services" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="vaccine">Vaccine Services</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="examination">
                      Health Examination
                    </SelectItem>
                    <SelectItem value="emergency">Emergency Care</SelectItem>
                    <SelectItem value="routine">Routine Checkup</SelectItem>
                    <SelectItem value="prescription">Prescription</SelectItem>
                    <SelectItem value="lab">Lab Tests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Appointment Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Appointment Status
                </label>
                <Select
                  value={filters.appointmentStatus}
                  onValueChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      appointmentStatus: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Date Range (Optional Override) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Custom Date Range
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={
                      filters.dateRange.from?.toISOString().split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: {
                          ...prev.dateRange,
                          from: e.target.value
                            ? new Date(e.target.value)
                            : null,
                        },
                        timeRange: e.target.value ? "custom" : prev.timeRange,
                      }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="From Date"
                  />
                  <input
                    type="date"
                    value={
                      filters.dateRange.to?.toISOString().split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateRange: {
                          ...prev.dateRange,
                          to: e.target.value ? new Date(e.target.value) : null,
                        },
                        timeRange: e.target.value ? "custom" : prev.timeRange,
                      }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="To Date"
                    min={filters.dateRange.from?.toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Active Filters:
                </p>
                <div className="flex flex-wrap gap-2">
                  {appliedFilters.timeRange !== "today" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Time: {appliedFilters.timeRange}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            timeRange: "today",
                          }))
                        }
                      />
                    </Badge>
                  )}
                  {appliedFilters.serviceType !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Service: {appliedFilters.serviceType}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            serviceType: "all",
                          }))
                        }
                      />
                    </Badge>
                  )}
                  {appliedFilters.appointmentStatus !== "all" && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Status: {appliedFilters.appointmentStatus}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            appointmentStatus: "all",
                          }))
                        }
                      />
                    </Badge>
                  )}
                  {appliedFilters.searchQuery && (
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      Search: "{appliedFilters.searchQuery}"
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, searchQuery: "" }))
                        }
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Filter Actions */}
            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={applyFilters}
                  className="flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Results Summary */}
      {/* {hasActiveFilters && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Showing filtered results: {filteredAppointments.length} appointments found
                </span>
                {effectiveDateRange.from && effectiveDateRange.to && (
                  <Badge variant="outline" className="bg-white">
                    {effectiveDateRange.from} to {effectiveDateRange.to}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-blue-600 hover:bg-blue-100"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">
                  Total Appointments
                </p>
                {dashboardLoading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-3xl font-bold text-blue-700">
                    {dashboardStats.appointmentsToday || 0}
                  </p>
                )}
                <p className="text-xs text-blue-500 mt-1">
                  {hasActiveFilters
                    ? "Filtered results"
                    : `${dashboardStats.appointmentsThisWeek || 0} this week`}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Total Revenue
                </p>
                {revenueLoading ? (
                  <Skeleton className="h-8 w-20 mt-1" />
                ) : (
                  <p className="text-3xl font-bold text-green-700">
                    £{revenueData?.data?.totalRevenue || 0}
                  </p>
                )}
                <p className="text-xs text-green-500 mt-1">
                  {revenueData?.data?.totalAppointments || 0} appointments • Avg
                  £{revenueData?.data?.averageRevenuePerAppointment || 0}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">
                  Active Patients
                </p>
                {demographicsLoading ? (
                  <Skeleton className="h-8 w-12 mt-1" />
                ) : (
                  <p className="text-3xl font-bold text-purple-700">
                    {demographics?.data?.totalPatients || 0}
                  </p>
                )}
                <p className="text-xs text-purple-500 mt-1">
                  +5% from last month
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">
                  Patient Rating
                </p>
                {dashboardLoading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-3xl font-bold text-orange-700">
                    {dashboardStats.averageRating || 0}/5
                  </p>
                )}
                <p className="text-xs text-orange-500 mt-1">
                  Active Services: {dashboardStats.activeServices || 0}
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Main Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Patient and Service Performance Cards - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Next Patient Card */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-ubuntu font-bold text-gray-700 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Next Patient
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {nextPatient?.data ? "Active" : "None"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {dashboardLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : nextPatient && nextPatient.fullName ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {nextPatient.fullName
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {nextPatient.fullName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {nextPatient.serviceDescription}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {nextPatient.appointmentTime} -{" "}
                              {nextPatient.appointmentDate}
                            </span>
                          </div>
                          <Badge
                            variant={
                              nextPatient.status === "confirmed"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs capitalize"
                          >
                            {nextPatient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  
                    <div className="text-center pt-6 border-t">
                      <p className="text-sm text-gray-600">
                        Contact: {nextPatient.phoneNumber}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      No upcoming patients
                    </p>
                    <p className="text-xs text-gray-400">
                      Your schedule is clear
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service Performance Card */}
            <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-ubuntu font-bold text-gray-700 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Service Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {performanceLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                ) : servicePerformance?.data &&
                  Array.isArray(servicePerformance.data) ? (
                  <div className="space-y-3">
                    {servicePerformance.data
                      .sort(
                        (a: any, b: any) =>
                          b.totalAppointments - a.totalAppointments
                      )
                      .slice(0, 3)
                      .map((service: any, index: number) => (
                        <div
                          key={service.serviceId}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                index === 0
                                  ? "bg-green-500"
                                  : index === 1
                                  ? "bg-blue-500"
                                  : "bg-orange-500"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <span className="text-sm font-medium">
                                {service.serviceName}
                              </span>
                              <p className="text-xs text-gray-500">
                                {service.category}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              {service.totalAppointments}
                            </p>
                            <p className="text-xs text-gray-500">
                              appointments
                            </p>
                            <p className="text-xs text-green-600 font-medium">
                              £{service.totalRevenue}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No performance data</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Side - Upcoming Appointments (1/3 width) */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm border border-gray-200 h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-ubuntu font-bold text-gray-700">
                    Upcoming Appointments
                    {smartFilteredAppointments.length > 0 && (
                      <span className="ml-2 text-sm font-normal text-blue-600">
                        ({smartFilteredAppointments.length})
                      </span>
                    )}
                  </CardTitle>
                  <p className="text-sm text-blue-500 font-roboto">
                    {appliedFilters.timeRange === "today"
                      ? "Today & This Week"
                      : appliedFilters.timeRange === "week"
                      ? "This Week"
                      : appliedFilters.timeRange === "month"
                      ? "This Month"
                      : appliedFilters.timeRange === "custom"
                      ? "Custom Range"
                      : "Filtered"} • Active Appointments Only
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Week Day View */}
              <div className="grid grid-cols-7 gap-1 text-center bg-gray-50 p-3 rounded-lg">
                {(() => {
                  const today = new Date();
                  const currentWeekStart = new Date(today);
                  currentWeekStart.setDate(
                    today.getDate() - today.getDay() + 1
                  ); // Start from Monday

                  // Get appointment dates from display appointments
                  const appointmentDates = smartFilteredAppointments
                    .filter((apt: any) => apt.appointmentDate)
                    .map((apt: any) =>
                      new Date(apt.appointmentDate).toDateString()
                    );

                  const weekDays = [
                    "MON",
                    "TUE",
                    "WED",
                    "THU",
                    "FRI",
                    "SAT",
                    "SUN",
                  ];

                  return Array.from({ length: 7 }, (_, i) => {
                    const date = new Date(currentWeekStart);
                    date.setDate(currentWeekStart.getDate() + i);

                    const dayString = date.toDateString();
                    const hasAppointment = appointmentDates.includes(dayString);
                    const isToday =
                      date.toDateString() === today.toDateString();
                    const isPast = date < today && !isToday;

                    return {
                      day: date.getDate().toString(),
                      label: weekDays[i],
                      active: hasAppointment && !isPast,
                      isToday: isToday,
                      isPast: isPast,
                    };
                  });
                })().map((item, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1">
                    <div className="text-xs text-gray-400 font-roboto">
                      {item.label}
                    </div>
                    <div
                      className={`text-sm font-roboto w-8 h-8 rounded-full flex items-center justify-center ${
                        item.isToday
                          ? "bg-blue-500 text-white font-semibold"
                          : item.active
                          ? "bg-blue-100 text-blue-600 font-semibold"
                          : item.isPast
                          ? "text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {item.day}
                    </div>
                    {(item.active || item.isToday) && (
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Appointments List */}
              <div className="space-y-3 border-t pt-4 max-h-96 overflow-y-auto">
                {/* Show indicator if there are more appointments beyond the smart filter */}
                {displayAppointments.length > smartFilteredAppointments.length && smartFilteredAppointments.length > 0 && (
                  <div className="text-center py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium">
                      Showing {smartFilteredAppointments.length} most relevant appointments
                    </p>
                    <p className="text-xs text-blue-500">
                      {displayAppointments.length - smartFilteredAppointments.length} more available
                    </p>
                  </div>
                )}
                
                {appointmentsLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-16 w-full" />
                      </div>
                    ))
                ) : smartFilteredAppointments.length > 0 ? (
                  smartFilteredAppointments.map((appointment: any) => {
                    // Handle both data structures
                    const patientName =
                      appointment.patientName ||
                      appointment.patient?.name ||
                      appointment.customerName;
                    const serviceName =
                      appointment.serviceDescription ||
                      appointment.service?.name ||
                      appointment.serviceName;
                    const patientAvatar =
                      appointment.patientAvatar || appointment.patient?.avatar;
                    const appointmentTime =
                      appointment.appointmentTime || appointment.time;
                    const appointmentId =
                      appointment.appointmentId || appointment.id;

                    return (
                      <div
                        key={appointmentId}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={patientAvatar || "/placeholder.svg"}
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-semibold">
                              {patientName
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("") || "PA"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-blue-600 text-sm">
                              {patientName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {serviceName}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={
                                  appointment.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {appointment.status}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {appointmentTime}
                              </div>
                              {appointment.appointmentDate && (
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(
                                    appointment.appointmentDate
                                  ).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          {appointment.price && (
                            <div className="text-sm font-semibold text-gray-900">
                              £{appointment.price}
                            </div>
                          )}
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:bg-blue-100 relative"
                              onClick={() =>
                                copyPhoneNumber(
                                  appointment.patientPhone ||
                                    appointment.patient?.phone ||
                                    appointment.phone ||
                                    "",
                                  appointmentId
                                )
                              }
                              title={`Copy phone: ${
                                appointment.patientPhone ||
                                appointment.patient?.phone ||
                                appointment.phone ||
                                "N/A"
                              }`}
                            >
                              <Phone className="h-3 w-3 text-blue-600" />
                              {copiedPhone === appointmentId && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                  Copied!
                                </div>
                              )}
                            </Button>
                            {/* <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 hover:bg-gray-100"
                            >
                              <MoreHorizontal className="h-3 w-3 text-gray-600" />
                            </Button> */}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      {hasActiveFilters
                        ? "No appointments match your filters"
                        : "No active appointments"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {hasActiveFilters
                        ? "Try adjusting your filters"
                        : "No appointments scheduled for today or this week"}
                    </p>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={resetFilters}
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Width Bottom Section */}
      <div className="space-y-6">
        {/* Patient Demographics - Full Width */}
        <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-ubuntu font-bold text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Patient Demographics
            </CardTitle>
            <p className="text-sm text-gray-500">Age and gender distribution</p>
          </CardHeader>
          <CardContent>
            {demographicsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="text-center space-y-2">
                      <Skeleton className="h-16 w-16 rounded-full mx-auto" />
                      <Skeleton className="h-4 w-12 mx-auto" />
                    </div>
                  ))}
              </div>
            ) : demographics?.data ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-pink-600">
                      {demographics.data.ageGroups?.["18-30"] || 0}
                    </span>
                  </div>
                  <p className="text-sm font-medium">18-30 years</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {demographics.data.ageGroups?.["31-50"] || 0}
                    </span>
                  </div>
                  <p className="text-sm font-medium">31-50 years</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {demographics.data.ageGroups?.["51-70"] || 0}
                    </span>
                  </div>
                  <p className="text-sm font-medium">51-70 years</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {demographics.data.ageGroups?.["70+"] || 0}
                    </span>
                  </div>
                  <p className="text-sm font-medium">70+ years</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-500">
                  No demographic data available
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overall Appointment Chart - Full Width */}
        <Card className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-ubuntu font-bold text-gray-700 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Overall Appointments Trends
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Monthly appointment distribution by service type
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-roboto mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">EMERGENCY</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">EXAMINATION</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">
                  CONSULTATION
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">
                  ROUTINE CHECKUP
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">SICK VISIT</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {overallLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : chartData.length > 0 ? (
              <div className="h-64 relative overflow-hidden">
                <div className="h-52 relative border-b border-gray-200 bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-end h-full">
                    {chartData.map((data: any, index: number) => (
                      <div
                        key={data.month || index}
                        className="flex flex-col items-center h-full justify-end relative group"
                        style={{ width: "8%" }}
                      >
                        <div className="relative h-full flex justify-center items-end pb-2">
                          {data.emergency > 0 && (
                            <div
                              className="w-1 bg-red-500 absolute bottom-0 hover:bg-red-600 transition-colors"
                              style={{
                                height: `${(data.emergency / 100) * 100}%`,
                              }}
                            ></div>
                          )}
                          {data.examination > 0 && (
                            <div
                              className="w-1 bg-teal-500 absolute bottom-0 hover:bg-teal-600 transition-colors"
                              style={{
                                height: `${(data.examination / 100) * 100}%`,
                                left: "2px",
                              }}
                            ></div>
                          )}
                          {data.consultation > 0 && (
                            <div
                              className="w-1 bg-blue-500 absolute bottom-0 hover:bg-blue-600 transition-colors"
                              style={{
                                height: `${(data.consultation / 100) * 100}%`,
                                left: "4px",
                              }}
                            ></div>
                          )}
                          {data.routine > 0 && (
                            <div
                              className="w-1 bg-purple-500 absolute bottom-0 hover:bg-purple-600 transition-colors"
                              style={{
                                height: `${(data.routine / 100) * 100}%`,
                                left: "6px",
                              }}
                            ></div>
                          )}
                          {data.sick > 0 && (
                            <div
                              className="w-1 bg-orange-500 absolute bottom-0 hover:bg-orange-600 transition-colors"
                              style={{
                                height: `${(data.sick / 100) * 100}%`,
                                left: "8px",
                              }}
                            ></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between px-2 pt-3">
                  {chartData.map((data: any, index: number) => (
                    <div
                      key={data.month || index}
                      className="text-xs text-gray-600 font-medium"
                      style={{ width: "8%" }}
                    >
                      {data.month}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No chart data available</p>
                  <p className="text-sm">
                    Start booking appointments to see trends
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
