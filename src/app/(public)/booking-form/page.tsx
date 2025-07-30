"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useUserContext } from "@/context/userStore";
import Step1 from "@/components/booking-form-steps/Step1";
import Step2 from "@/components/booking-form-steps/Step2";
import Step3 from "@/components/booking-form-steps/Step3";
import { useAppointmentMutation, useGetPartnerServicesById } from "@/lib/hooks";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Calendar, FileText, Heart } from "lucide-react";

// Progress Steps Component
const ProgressSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { number: 1, title: "Select Date & Time", icon: Calendar, description: "Choose your preferred slot" },
    { number: 2, title: "Health Questions", icon: FileText, description: "Complete health form" },
    { number: 3, title: "Confirmation", icon: Heart, description: "Booking confirmed" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 z-0">
          <div 
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-500 text-white shadow-lg" 
                    : isCurrent 
                      ? "bg-white border-teal-500 text-teal-600 shadow-lg ring-4 ring-teal-100" 
                      : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="mt-3 text-center">
                <p className={`text-sm font-medium ${isCurrent ? "text-teal-600" : isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-[120px]">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-teal-200 rounded-full animate-spin border-t-teal-600"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-teal-300"></div>
      </div>
      <p className="text-teal-600 font-medium">Loading your booking experience...</p>
    </div>
  </div>
);

// Create a separate component for the form content
const BookingFormContent = () => {
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("partnerId");
  const serviceId = searchParams.get("serviceId");
  const serviceName = searchParams.get("serviceName");
  const address = searchParams.get("address");

  if (!partnerId || !serviceId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Missing Information</h2>
          <p className="text-gray-600 mb-6">
            We're missing some required information for your booking. Please try booking again from the services page.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const today = new Date();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth()); // 0-indexed
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    allergies: "",
    allergiesDetails: "",
    pregnant: "",
    neurological: "",
    neurolDetails: "",
  });
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState("");

  // Memoize the date string to prevent unnecessary recalculations
  const dateString = useMemo(() => {
    const month = (selectedMonth + 1).toString().padStart(2, "0");
    const day = selectedDate?.toString().padStart(2, "0");
    return `${selectedYear}-${month}-${day}`;
  }, [selectedDate, selectedMonth, selectedYear]);

  // Update the partnerId memo to use the query param instead of user context
  const partnerIdMemo = useMemo(() => partnerId, [partnerId]);

  // Fetch available slots for selected date - only if partnerId exists
  const {
    data: slotsData,
    isLoading: slotsLoading,
    error: slotsError,
    refetch: refetchSlots,
  } = useQuery({
    queryKey: ["available-slots", partnerIdMemo, dateString],
    queryFn: async () => {
      if (!partnerIdMemo) return [];
      try {
        const { data } = await api.get(
          `/v1/api/appointments/available-slots/${partnerIdMemo}`,
          {
            params: { date: dateString },
          }
        );
        return data;
      } catch (err) {
        console.error("Error fetching slots:", err);
        throw err;
      }
    },
    enabled: !!partnerIdMemo && !!dateString,
  });

  const availableTimeSlots = (slotsData?.data || []).map((slot: string) => {
    const [hour, minute] = slot.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
  });

  // Calendar navigation handlers
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
    setSelectedDate(1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
    setSelectedDate(1);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const {
    mutate: bookAppointment,
    isPending,
    error,
  } = useAppointmentMutation();

  const handleFinalSubmit = async () => {
    // Format date to ISO 8601 (YYYY-MM-DD)
    const formattedDate = `${selectedYear}-${(selectedMonth + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate?.toString().padStart(2, "0")}`;

    // Format time to HH:MM (24-hour format)
    const formatTimeToHHMM = (time: string): string => {
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

    const payload = {
      partnerId: partnerId,
      serviceId: serviceId,
      appointmentDate: formattedDate,
      appointmentTime: formatTimeToHHMM(selectedTime),
      notes,
      healthAnswers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    };

    bookAppointment(payload, {
      onSuccess: () => {
        toast.success("Appointment booked successfully!");
        setCurrentStep(3);
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to book appointment"
        );
      },
    });
  };

  // Get today's date for disabling previous dates
  const isToday = (year: number, month: number, day: number) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const isPastDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return (
      date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    );
  };

  // Generate year options (current year and next 4 years)
  const yearOptions = Array.from(
    { length: 10 },
    (_, i) => today.getFullYear() + i
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <Calendar className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
            Book Your <span className="text-emerald-200">Health</span> Appointment
          </h1>
          <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-6">
            Schedule your consultation with our expert healthcare professionals in just a few simple steps
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Expert Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Progress Steps */}
          <ProgressSteps currentStep={currentStep} />

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {isPending && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-teal-600 font-medium">Processing your booking...</p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <Step1
                selectedDate={selectedDate}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onDateChange={setSelectedDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                yearOptions={yearOptions}
                onYearChange={setSelectedYear}
                isPastDate={isPastDate}
                slotsLoading={slotsLoading}
                slotsError={slotsError}
                availableTimeSlots={availableTimeSlots}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                setCurrentStep={setCurrentStep}
                serviceName={serviceName}
                address={address}
              />
            )}
            {currentStep === 2 && (
              <Step2
                formData={formData}
                handleFormChange={handleFormChange}
                setCurrentStep={setCurrentStep}
                answers={answers}
                setAnswers={setAnswers}
                notes={notes}
                setNotes={setNotes}
                onSubmit={handleFinalSubmit}
              />
            )}
            {currentStep === 3 && <Step3 appointmentTime={selectedTime} />}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">NHS Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const AppointmentBooking = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingFormContent />
    </Suspense>
  );
};

export default AppointmentBooking;
