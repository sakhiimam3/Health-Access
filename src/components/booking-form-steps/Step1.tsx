import React from "react";
import BookingCalendar from "@/components/BookingCalendar";
import { MapPin, Calendar, User, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

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
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  setCurrentStep: (step: number) => void;
  setAppointmentDate?: (date: string) => void;
  serviceName?: string | null;
  address?: string | null;
};

// Function to convert time to HH:MM format
const formatTimeToHHMM = (time: string): string => {
  const [timeStr, period] = time.split(" ");
  let [hours, minutes] = timeStr.split(":").map((num) => parseInt(num));

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

// Function to format date to ISO 8601 (YYYY-MM-DD)
const formatDateToISO = (year: number, month: number, date: number): string => {
  const formattedMonth = (month + 1).toString().padStart(2, "0");
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
  selectedTime,
  setSelectedTime,
  setCurrentStep,
  setAppointmentDate,
  serviceName,
  address,
}) => {
  const isNextEnabled = selectedDate && selectedTime;
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const selectedDateFormatted = selectedDate 
    ? `${monthNames[selectedMonth]} ${selectedDate}, ${selectedYear}`
    : null;

  return (
    <div>
      {/* Service Information Header */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {serviceName || "Health Consultation"}
              </h2>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{address || "London, UK"}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Face-to-face consultation</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selection Summary */}
          {(selectedDateFormatted || selectedTime) && (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Your Selection</h3>
              <div className="space-y-1">
                {selectedDateFormatted && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>{selectedDateFormatted}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>{selectedTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Select Your Preferred Date & Time
          </h3>
          <p className="text-gray-600">
            Choose a convenient date and time slot for your appointment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>Select Date</span>
              </h4>
              <div className="bg-gray-50 rounded-xl p-6">
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
              </div>
            </div>
          </div>

          {/* Time Slots Section */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-teal-600" />
                <span>Available Times</span>
              </h4>
              
              <div className="bg-gray-50 rounded-xl p-6 h-[400px] flex flex-col">
                {!selectedDate && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Please select a date first to see available times</p>
                    </div>
                  </div>
                )}

                {selectedDate && slotsLoading && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading available times...</p>
                    </div>
                  </div>
                )}

                {selectedDate && slotsError && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        </svg>
                      </div>
                      <p className="text-red-600 font-medium">Error loading time slots</p>
                      <p className="text-gray-500 text-sm mt-1">Please try selecting a different date</p>
                    </div>
                  </div>
                )}

                {selectedDate && Array.isArray(availableTimeSlots) && availableTimeSlots.length > 0 && (
                  <div className="flex flex-col h-full">
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedDateFormatted} - Available slots:
                    </p>
                    <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
                      {availableTimeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`relative p-3 text-center rounded-lg border-2 transition-all duration-200 font-medium ${
                              isSelected
                                ? "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-500 text-white shadow-lg transform scale-70"
                                : "bg-white border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2 className="absolute top-1 right-1 w-4 h-4" />
                            )}
                            <div className="text-base">{time}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedDate && !slotsLoading && !slotsError && Array.isArray(availableTimeSlots) && availableTimeSlots.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="text-gray-700 font-medium">No available times</p>
                      <p className="text-gray-500 text-sm mt-1">Please try selecting a different date</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Step 1 of 3 - Select Date & Time
          </div>
          
          <button
            onClick={() => {
              if (isNextEnabled) {
                const formattedTime = formatTimeToHHMM(selectedTime);
                const formattedDate = formatDateToISO(selectedYear, selectedMonth, selectedDate);
                setSelectedTime(formattedTime);
                if (setAppointmentDate) {
                  setAppointmentDate(formattedDate);
                }
                setCurrentStep(2);
              }
            }}
            disabled={!isNextEnabled}
            className={`inline-flex items-center space-x-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              isNextEnabled
                ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md hover:shadow-lg hover:from-teal-700 hover:to-emerald-700 transform hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Continue to Health Questions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default Step1;
