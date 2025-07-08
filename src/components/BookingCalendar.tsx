import React from "react";

interface BookingCalendarProps {
  selectedDate: number;
  selectedMonth: number;
  selectedYear: number;
  onDateChange: (date: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  yearOptions: number[];
  onYearChange: (year: number) => void;
  isPastDate: (year: number, month: number, day: number) => boolean;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedDate,
  selectedMonth,
  selectedYear,
  onDateChange,
  onPrevMonth,
  onNextMonth,
  yearOptions,
  onYearChange,
  isPastDate,
}) => {
  const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); // 0 = Sunday

  const today = new Date();

  const calendarCells = [
    ...Array(firstDayOfMonth).fill(null), // Padding for first week
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-medium text-gray-900 flex items-center gap-2">
          {`${new Date(selectedYear, selectedMonth).toLocaleString("default", {
            month: "long",
          })}`}
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </h4>
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded" onClick={onPrevMonth}>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" onClick={onNextMonth}>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="p-2 font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarCells.map((date, index) => {
          if (!date) {
            return <div key={`blank-${index}`} className="p-2" />; // blank space
          }

          const disabled = isPastDate(selectedYear, selectedMonth, date);

          const isToday =
            selectedYear === today.getFullYear() &&
            selectedMonth === today.getMonth() &&
            date === today.getDate();

          return (
            <button
              key={date}
              onClick={() => !disabled && onDateChange(date)}
              className={`p-2 rounded-full transition-colors border ${
                selectedDate === date
                  ? "bg-teal-500 text-white hover:bg-teal-600"
                  : disabled
                  ? "text-gray-300 cursor-not-allowed bg-gray-50 border-transparent"
                  : isToday
                  ? "border-teal-300 text-gray-800 hover:bg-teal-50"
                  : "text-gray-700 hover:bg-gray-100 border-transparent"
              }`}
              disabled={disabled}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
