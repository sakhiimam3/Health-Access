import React from "react";
import { MapPin, Calendar, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";
type props ={
  appointmentTime : string
}
const Step3: React.FC<props> = ({appointmentTime}) => {
  const router = useRouter();
  return (
    <div className="mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
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
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Date and Time</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Booking Confirmed
          </h3>
          <p className="text-gray-600">
            Thank you! Your appointment has been successfully booked.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Your booking reference:</strong> Booking Quality: The
            virtual GMT time (includes {appointmentTime || "N/A"} to 4: medical questionnaire -
            please complete before your appointment)
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
          Go save to check your phone or junk folder. If you still can't find
          it, reach out to us via WhatsApp or email at:
          <br />
          <strong>support@health-access.co.uk</strong> or{" "}
          <strong>+44 20 3875 0101</strong>
        </p>

        <button
          className="bg-teal-600 text-white px-8 py-3 rounded-[16px] hover:bg-teal-700 transition-colors"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step3; 