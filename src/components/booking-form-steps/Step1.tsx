import React from "react";
import BookingCalendar from "@/components/BookingCalendar";
import { MapPin, Calendar, User } from "lucide-react";

type Step1Props = {
  selectedDate: number;
  selectedMonth: number;
  selectedYear: number;
  onDateChange: (date: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  yearOptions: number[];
  onYearChange: (year: number) => void;
  isPastDate: (year: number, month: number, day: number) => boolean;
  slotsLoading: boolean;
  slotsError: any;
  availableTimeSlots: string[];
  selectedTime: string; // single selection
  setSelectedTime: (time: string) => void; // single setter
  setCurrentStep: (step: number) => void;
  setAppointmentDate?: (date: string) => void; // Add this prop
  serviceName?: string | null;
  address?: string | null;
};

// Function to convert time to HH:MM format
const formatTimeToHHMM = (time: string): string => {
  // Handle "10:00 AM" or "2:30 PM" format
  const [timeStr, period] = time.split(" ");
  let [hours, minutes] = timeStr.split(":").map((num) => parseInt(num));

  // Convert to 24-hour format
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Ensure two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

// Function to format date to ISO 8601 (YYYY-MM-DD)
const formatDateToISO = (year: number, month: number, date: number): string => {
  const formattedMonth = (month + 1).toString().padStart(2, "0"); // month is 0-based
  const formattedDate = date.toString().padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDate}`;
};

const Step1: React.FC<Step1Props> = ({
  selectedDate,
  selectedMonth,
  selectedYear,
  onDateChange,
  onPrevMonth,
  onNextMonth,
  yearOptions,
  onYearChange,
  isPastDate,
  slotsLoading,
  slotsError,
  availableTimeSlots,
  selectedTime, // single
  setSelectedTime, // single
  setCurrentStep,
  setAppointmentDate,
  serviceName,
  address,
}) => (
  <div className=" mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="p-6 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">Service</h2>
            <p className="text-sm text-gray-500">{serviceName || "Nutritionist Consultation"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{address || "London"}</span>
          </div>
          {/* <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Face-to-face appointment (English, UK)</span>
          </div> */}
        </div>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Review your appointment details
      </h3>

      <div className="flex gap-8">
        <BookingCalendar
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onDateChange={onDateChange}
          onPrevMonth={onPrevMonth}
          onNextMonth={onNextMonth}
          yearOptions={yearOptions}
          onYearChange={onYearChange}
          isPastDate={isPastDate}
        />

        <div className="flex-1">
          <h4 className="text-base font-medium text-gray-900 mb-4">
            Available times
          </h4>
          {slotsLoading && (
            <div className="text-gray-500 flex justify-center items-center h-24">
              Loading available times...
            </div>
          )}
          {slotsError && (
            <div className="text-gray-500 flex justify-center items-center h-24">
              Error loading slots
            </div>
          )}

          {Array.isArray(availableTimeSlots) &&
          availableTimeSlots?.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {availableTimeSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 text-center rounded-lg border transition-colors text-sm ${
                      isSelected
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ) : (
            !slotsLoading &&
            !slotsError && (
              <div className="text-gray-500 flex justify-center items-center h-24">
                No available times for this date.
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex justify-end items-center mt-8">
        <button
          onClick={() => {
            const formattedTime = formatTimeToHHMM(selectedTime);
            const formattedDate = formatDateToISO(
              selectedYear,
              selectedMonth,
              selectedDate
            );
            setSelectedTime(formattedTime);
            if (setAppointmentDate) {
              setAppointmentDate(formattedDate);
            }
            setCurrentStep(2);
          }}
          className="bg-teal-600 text-white px-6 py-2 rounded-[16px] hover:bg-teal-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

export default Step1;
