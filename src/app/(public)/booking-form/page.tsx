"use client";
import React, { useState, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios"; // If you want to use your axios instance
import { useUserContext } from "@/context/userStore";
import Step1 from "@/components/booking-form-steps/Step1";
import Step2 from "@/components/booking-form-steps/Step2";
import Step3 from "@/components/booking-form-steps/Step3";
import { useAppointmentMutation } from "@/lib/hooks";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

// Create a separate component for the form content
const BookingFormContent = () => {
  const { user } = useUserContext();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get('partnerId');
  const serviceId = searchParams.get('serviceId');

  if (!partnerId || !serviceId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Missing required parameters. Please try booking again.
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

  // Only show available time slots from API
  const staticTimeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];
  const availableTimeSlots = slotsData?.data?.slots || staticTimeSlots;

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
      const [timeStr, period] = time.split(' ');
      let [hours, minutes] = timeStr.split(':').map(num => parseInt(num));
      
      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      // Ensure two digits
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      
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
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-[1480px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-8 mb-8">
          Book Your Appointment
        </h1>
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
    </div>
  );
};

// Main component with Suspense boundary
const AppointmentBooking = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <BookingFormContent />
    </Suspense>
  );
};

export default AppointmentBooking;
