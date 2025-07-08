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
            <p className="text-sm text-gray-500">Nutritionist Consultation</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>London</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Face-to-face appointment (English, UK)</span>
          </div>
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
          {slotsLoading && <div>Loading available times...</div>}
          {slotsError && (
            <div className="text-red-500">Error loading slots</div>
          )}
          {!slotsLoading && !slotsError && availableTimeSlots.length === 0 && (
            <div className="text-gray-500">
              No available times for this date.
            </div>
          )}
          {Array.isArray(availableTimeSlots) &&
          availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
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
              <div className="text-gray-500">
                No available times for this date.
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex justify-end items-center mt-8">
        <button
          onClick={() => setCurrentStep(2)}
          className="bg-teal-600 text-white px-6 py-2 rounded-[16px] hover:bg-teal-700 transition-colors"
          disabled={!selectedTime}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

export default Step1;
