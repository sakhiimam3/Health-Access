"use client";
import Image from "next/image";
import DashboardCalendar from "@/components/customerDashboard/DashboardCalendar";
import HealthStats from "@/components/customerDashboard/HealthStats";
import { useGetCustomerDashboard } from "@/lib/hooks";

export default function CustomerDashboardPage() {
  const { data: dashboardData, isLoading, error } = useGetCustomerDashboard();

  const handleEditHealthStats = () => {
    // TODO: Implement edit modal or navigation
    console.log("Edit health stats");
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Error loading dashboard data</div>
      </div>
    );
  }

  const userData = dashboardData?.data;
  const hasUpcomingAppointments = userData?.upcomingAppointments && userData.upcomingAppointments.length > 0;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Welcome + Stats + Health Stats */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Welcome Card */}
          <div className="bg-[#181C23] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
            <div>
              <div className="text-lg mb-1">Hello <span className="font-semibold">{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</span>,</div>
              <div className="text-sm text-gray-300 mb-4">Have a nice day and don't forget to take care of your health!</div>
            
            </div>
            <div className="mt-4 md:mt-0 md:ml-8">
              <Image 
                src="/images/customer.png" 
                alt="Meditation illustration" 
                width={180} 
                height={180} 
                className="object-contain"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow-sm">
              <div className="text-gray-500 text-sm mb-2">Total Appointments</div>
              <div className="text-3xl font-bold mb-2">{userData?.appointmentStats?.totalAppointments || 0}</div>
              <div className="bg-cyan-50 rounded-full p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="12" fill="#A7F3D0"/>
                  <path d="M8 12h8M12 8v8" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow-sm">
              <div className="text-gray-500 text-sm mb-2">Cancel Appointments</div>
              <div className="text-3xl font-bold mb-2">{userData?.appointmentStats?.cancelledAppointments || 0}</div>
              <div className="bg-rose-50 rounded-full p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="12" fill="#FECACA"/>
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Health Stats */}
          <HealthStats 
            height={userData?.healthStats?.height || 0}
            weight={userData?.healthStats?.weight || 0}
            onEdit={handleEditHealthStats}
          />
        </div>

        {/* Right: Upcoming Appointments */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-fit min-w-[320px]">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-gray-800">Upcoming appointments</div>
            {/* <button className="text-gray-400 hover:text-gray-600">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12m6-6H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button> */}
          </div>
          {/* Custom Calendar */}
          <DashboardCalendar 
            selectedDate={hasUpcomingAppointments ? new Date(userData?.upcomingAppointments?.[0]?.date) : undefined} 
          />
          
          {/* No Appointments Alert or Appointments List */}
          {!hasUpcomingAppointments ? (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">You don't have any upcoming appointments</div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 mt-4">
              {userData?.upcomingAppointments?.map((appointment: any) => (
                <div key={appointment.id} className="py-3">
                  <div className="text-xs text-gray-400 mb-1">
                    {new Date(appointment.date).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })} - {appointment.time}
                  </div>
                  <div className="font-semibold text-cyan-700 text-sm cursor-pointer hover:underline">
                    {appointment.serviceName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {appointment.partnerName} - {appointment.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 