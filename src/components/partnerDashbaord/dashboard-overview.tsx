import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Clock, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardOverview() {
  const upcomingAppointments = [
    {
      id: 1,
      name: "Shawn Hampton",
      service: "Infected Insect Bites",
      time: "9:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Polly Paul",
      service: "Travel Vaccine",
      time: "9:30",
      price: "€ 80",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Jessie Paul",
      service: "Specialty Vaccine",
      time: "10:30",
      price: "€ 25",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Mabel Perkins",
      service: "Uncomplicated UTIs",
      time: "11:30",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 5,
      name: "Jayden Hall",
      service: "Sore Throat",
      time: "12:30",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const chartData = [
    { month: "JAN", emergency: 0, examination: 0, consultation: 60, routine: 0, sick: 0 },
    { month: "FEB", emergency: 0, examination: 0, consultation: 50, routine: 0, sick: 30 },
    { month: "MAR", emergency: 0, examination: 0, consultation: 40, routine: 0, sick: 0 },
    { month: "APR", emergency: 50, examination: 0, consultation: 0, routine: 0, sick: 0 },
    { month: "MAY", emergency: 0, examination: 60, consultation: 0, routine: 0, sick: 0 },
    { month: "JUN", emergency: 0, examination: 40, consultation: 0, routine: 0, sick: 0 },
    { month: "JUL", emergency: 0, examination: 0, consultation: 70, routine: 50, sick: 0 },
    { month: "AUG", emergency: 0, examination: 0, consultation: 30, routine: 0, sick: 0 },
    { month: "SEP", emergency: 0, examination: 0, consultation: 50, routine: 0, sick: 0 },
    { month: "OCT", emergency: 0, examination: 80, consultation: 60, routine: 0, sick: 0 },
    { month: "NOV", emergency: 0, examination: 0, consultation: 40, routine: 0, sick: 0 },
    { month: "DEC", emergency: 0, examination: 0, consultation: 0, routine: 0, sick: 70 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side - Main Content (2/3 width) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Top Row - Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Next Patient Card */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-ubuntu font-bold text-gray-700">Next patient</CardTitle>
                <div className="flex space-x-1">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gray-300 text-xs">PP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-roboto font-medium text-gray-900 text-sm">Polly Paul</p>
                  <p className="text-xs text-gray-500 font-roboto">USG + Consultation</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500 font-roboto">
                  <Clock className="h-3 w-3 mr-1" />
                  09:30
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* NHS Service Card */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-ubuntu font-bold text-gray-700">NHS Service</CardTitle>
                <div className="flex space-x-1">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-roboto">Ina Nelle Pearson</p>
                <p className="font-roboto font-medium text-sm text-gray-900">Sore Throat</p>
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
              </div>
              <div className="flex justify-between items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-roboto h-7 px-3 text-blue-600 border-blue-200 bg-blue-50"
                >
                  Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-roboto h-7 px-3 text-blue-600 border-blue-200 bg-blue-50"
                >
                  Contact Patient
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-roboto h-7 px-3 text-blue-600 border-blue-200 bg-blue-50"
                >
                  Objectives
                </Button>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Row - Two Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vaccine Appointments Chart */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-ubuntu font-bold text-gray-700">Vaccine Appointments</CardTitle>
                <div className="flex space-x-1">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-end justify-between px-4">
                {[
                  { month: "9:00", value: 45 },
                  { month: "9:30", value: 52 },
                  { month: "10:00", value: 48 },
                  { month: "11:00", value: 61 },
                  { month: "12:00", value: 55 },
                  { month: "13:00", value: 67 },
                  { month: "14:00", value: 59 },
                  { month: "15:00", value: 72 },
                  { month: "16:00", value: 65 },
                ].map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div
                      className="w-2 bg-blue-500"
                      style={{ height: `${(data.value / 80) * 120}px`, minHeight: "8px" }}
                    ></div>
                    <span className="text-xs text-gray-500 font-roboto">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* NHS Service Appointments Chart */}
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-ubuntu font-bold text-gray-700">NHS Service Appointments</CardTitle>
                <div className="flex space-x-1">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-40 flex items-end justify-between px-4">
                {[
                  { month: "9:00", value: 35 },
                  { month: "9:30", value: 40 },
                  { month: "10:00", value: 38 },
                  { month: "11:00", value: 45 },
                  { month: "12:00", value: 42 },
                  { month: "13:00", value: 48 },
                  { month: "14:00", value: 44 },
                  { month: "15:00", value: 52 },
                  { month: "16:00", value: 49 },
                ].map((data, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div
                      className="w-2 bg-blue-500"
                      style={{ height: `${(data.value / 60) * 120}px`, minHeight: "8px" }}
                    ></div>
                    <span className="text-xs text-gray-500 font-roboto">{data.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Overall Appointment Chart */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-ubuntu font-bold text-gray-700">Overall appointment</CardTitle>
              <div className="flex space-x-1">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-roboto mt-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">EMERGENCY</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">EXAMINATION</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">CONSULTATION</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">ROUTINE CHECKUP</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 font-semibold">SICK VISIT</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative overflow-hidden">
              {/* Chart container with proper bounds */}
              <div className="h-40 relative border-b border-gray-200">
                <div className="flex justify-between items-end h-full px-2">
                  {chartData.map((data, index) => (
                    <div
                      key={data.month}
                      className="flex flex-col items-center h-full justify-end"
                      style={{ width: "7%" }}
                    >
                      <div className="relative h-full flex justify-center items-end pb-2">
                        {/* Emergency - Red */}
                        {data.emergency > 0 && (
                          <div
                            className="w-0.5 border-l-2 border-red-500 border-dashed absolute bottom-0"
                            style={{ height: `${(data.emergency / 100) * 100}%` }}
                          ></div>
                        )}
                        {/* Examination - Teal */}
                        {data.examination > 0 && (
                          <div
                            className="w-0.5 border-l-2 border-teal-500 border-dashed absolute bottom-0"
                            style={{ height: `${(data.examination / 100) * 100}%`, left: "2px" }}
                          ></div>
                        )}
                        {/* Consultation - Blue */}
                        {data.consultation > 0 && (
                          <div
                            className="w-0.5 border-l-2 border-blue-500 border-dashed absolute bottom-0"
                            style={{ height: `${(data.consultation / 100) * 100}%`, left: "4px" }}
                          ></div>
                        )}
                        {/* Routine - Purple */}
                        {data.routine > 0 && (
                          <div
                            className="w-0.5 border-l-2 border-purple-500 border-dashed absolute bottom-0"
                            style={{ height: `${(data.routine / 100) * 100}%`, left: "6px" }}
                          ></div>
                        )}
                        {/* Sick Visit - Orange */}
                        {data.sick > 0 && (
                          <div
                            className="w-0.5 border-l-2 border-orange-500 border-dashed absolute bottom-0"
                            style={{ height: `${(data.sick / 100) * 100}%`, left: "8px" }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Month labels */}
              <div className="flex justify-between px-2 pt-2">
                {chartData.map((data) => (
                  <div key={data.month} className="text-xs text-gray-500 font-roboto" style={{ width: "7%" }}>
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Upcoming Appointments (1/3 width) */}
      <div className="lg:col-span-1">
        <Card className="bg-white shadow-sm border border-gray-200 h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-ubuntu font-bold text-gray-700">Upcoming appointments</CardTitle>
                <p className="text-xs text-blue-500 font-roboto">September - October</p>
              </div>
              <div className="flex space-x-1">
                <ChevronLeft className="w-4 h-4 text-gray-400" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Calendar */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {[
                { day: "26", label: "MON", active: false },
                { day: "27", label: "TUE", active: false },
                { day: "28", label: "WED", active: true },
                { day: "29", label: "THU", active: true },
                { day: "30", label: "FRI", active: true },
                { day: "1", label: "SAT", active: false },
                { day: "2", label: "SUN", active: false },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center space-y-1">
                  <div className="text-xs text-gray-400 font-roboto">{item.label}</div>
                  <div className="text-sm font-roboto text-gray-700">{item.day}</div>
                  {item.active && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                </div>
              ))}
            </div>

            {/* Appointments List */}
            <div className="space-y-3 border-t pt-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-300 text-xs">
                        {appointment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-blue-600 font-roboto text-sm">{appointment.name}</p>
                      <p className="text-xs text-gray-500 font-roboto">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center text-xs text-gray-500 font-roboto">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.time}
                    </div>
                    {appointment.price && (
                      <div className="text-xs font-roboto font-medium text-gray-900">{appointment.price}</div>
                    )}
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Phone className="h-3 w-3 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
