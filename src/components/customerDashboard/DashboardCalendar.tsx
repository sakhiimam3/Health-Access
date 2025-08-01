import React, { useState } from "react";

const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  // Returns 0 (Monday) to 6 (Sunday)
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const today = new Date();

export default function DashboardCalendar({
  appointmentDates = [],
  onSelectDate,
}: {
  appointmentDates?: Date[];
  onSelectDate?: (date: Date) => void;
}) {
  // Use the first appointment date for initial month/year, or today if no appointments
  const initialDate = appointmentDates.length > 0 ? appointmentDates[0] : today;
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  // Helper function to check if a day has an appointment
  const hasAppointment = (day: number) => {
    return appointmentDates.some(date => 
      date.getDate() === day && 
      date.getMonth() === currentMonth && 
      date.getFullYear() === currentYear
    );
  };

  // Helper function to check if a day is today
  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  // Build calendar grid
  const calendarRows: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDayOfWeek).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      calendarRows.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    calendarRows.push(week);
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const handleSelectDay = (day: number | null) => {
    if (!day) return;
    setSelectedDay(day);
    if (onSelectDate) {
      onSelectDate(new Date(currentYear, currentMonth, day));
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });

  return (
    <div>
      {/* Month Selector */}
      <div className="flex items-center gap-2 mb-2">
        <button onClick={handlePrevMonth} className="text-gray-400 hover:text-gray-600" aria-label="Previous Month">&#8592;</button>
        <div className="bg-cyan-100 text-cyan-700 rounded px-3 py-1 text-sm font-medium min-w-[110px] text-center">
          {monthName} {currentYear}
        </div>
        <button onClick={handleNextMonth} className="text-gray-400 hover:text-gray-600" aria-label="Next Month">&#8594;</button>
      </div>
      {/* Calendar Grid */}
      <table className="w-full text-center text-xs text-gray-500 select-none">
        <thead>
          <tr>
            {daysOfWeek.map((d) => (
              <th key={d} className="font-semibold pb-1">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((row, i) => (
            <tr key={i}>
              {row.map((day, j) => (
                <td key={j} className="py-1">
                  {day ? (
                    <button
                      className={`w-7 h-7 rounded-full transition-colors
                        ${hasAppointment(day) ? "bg-cyan-600 text-white font-semibold" : "hover:bg-cyan-100"}
                        ${selectedDay !== null && day === selectedDay && !hasAppointment(day) ? "bg-cyan-300 text-cyan-800" : ""}
                        ${isToday(day) && !hasAppointment(day) && day !== selectedDay ? "border border-cyan-400" : ""}
                      `}
                      onClick={() => handleSelectDay(day)}
                    >
                      {day}
                    </button>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 