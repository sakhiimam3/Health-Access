"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Step1BasicDetails from "./step1-basic-details";
import Step2LocationHours from "./step2-location-hours";
import Step3ServicesOffered from "./step3-services-offered";
import Step4Success from "./step4-success";
import { useUpload, usePartnerOnboarding } from "@/lib/hooks";
import { toast } from "react-toastify";
import { useUserContext } from "@/context/userStore";

const formSchema = z.object({
  // Step 1 - Basic Details
  profileLogo: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Profile logo is required",
  }),
  coverPhoto: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Cover photo is required",
  }),
  pharmacyName: z.string().min(1, "Pharmacy name is required"),
  pharmacyEmail: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  shortBio: z.string().min(10, "Short bio must be at least 10 characters"),

  // Step 2 - Location & Hours
  timings: z
    .array(
      z.object({
        dayOfWeek: z.string(),
        openTime: z.string(),
        closeTime: z.string(),
        isClosed: z.boolean().default(false),
      })
    )
    .min(1, "At least one working day is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  pinLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .default({ lat: 37.7749, lng: -122.4194 }),

  // Step 3 - Services
  selectedServices: z.array(z.string()).min(1, "Select at least one service"),
});

export type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setUserData } = useUserContext();

  const { mutate: uploadFile } = useUpload();
  const { mutate: submitOnboarding } = usePartnerOnboarding();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileLogo: null,
      coverPhoto: null,
      pharmacyName: "",
      pharmacyEmail: "",
      contactNumber: "",
      website: "",
      shortBio: "",
      timings: [],
      address: "123 Main Street, San Francisco, CA 94105",
      pinLocation: { lat: 37.7749, lng: -122.4194 },
      selectedServices: [],
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = [
          "profileLogo",
          "coverPhoto",
          "pharmacyName",
          "pharmacyEmail",
          "contactNumber",
          "shortBio",
        ];
        break;
      case 2:
        fieldsToValidate = ["timings", "address"];
        break;
      case 3:
        fieldsToValidate = ["selectedServices"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Upload image helper function
  const uploadImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file || !(file instanceof File)) {
        console.error("Invalid file object:", file);
        reject(new Error("Invalid file object"));
        return;
      }

      const formData = new FormData();
      formData.append("file", file, file.name);

      uploadFile(formData, {
        onSuccess: (response: { data: { url: string } }) => {
          console.log("Upload successful:", response);
          resolve(response.data.url);
        },
        onError: (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
      });
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      let profileImageUrl = "";
      let coverImageUrl = "";

      if (data.profileLogo) {
        profileImageUrl = await uploadImage(data.profileLogo);
      }

      if (data.coverPhoto) {
        coverImageUrl = await uploadImage(data.coverPhoto);
      }

      const payload = {
        email: data.pharmacyEmail,
        businessName: data.pharmacyName,
        website: data.website || "",
        location: {
          name: data.address,
          latitude: data.pinLocation?.lat || 0,
          longitude: data.pinLocation?.lng || 0,
        },
        termsAccepted: true,
        describeYourBusiness: data.shortBio,
        phoneNumber: data.contactNumber,
        timings: data.timings.map((timing) => ({
          dayOfWeek: timing.dayOfWeek,
          openTime: convertTo12HourFormat(timing.openTime),
          closeTime: convertTo12HourFormat(timing.closeTime),
          isClosed: timing.isClosed,
        })),
        image: profileImageUrl,
        coverImage: coverImageUrl,
        serviceIds: data.selectedServices,
      };

      submitOnboarding(payload, {
        onSuccess: () => {
          setIsSubmitting(false);
          setCurrentStep(4);

          // Update user context with onboarding completed
          if (user) {
            const updatedUser = {
              ...user,
              data: {
                ...user.data,
                onboardingCompleted: true,
              },
            };
            setUserData(updatedUser);
          }

          toast.success("Pharmacy details submitted successfully!");
        },
        onError: (error) => {
          setIsSubmitting(false);
          console.error("Onboarding submission failed:", error);
          toast.error("Failed to submit pharmacy details. Please try again.");
        },
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error during submission:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicDetails form={form} />;
      case 2:
        return <Step2LocationHours form={form} />;
      case 3:
        return <Step3ServicesOffered form={form} />;
      case 4:
        return <Step4Success />;
      default:
        return <Step1BasicDetails form={form} />;
    }
  };

  if (currentStep === 4) {
    return <Step4Success />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-ubantu font-semibold text-gray-900">
            HEALTHACCESS
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep}/3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-teal-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col min-h-[calc(100vh-220px)]"
        >
          <div className="flex-1">{renderStep()}</div>

          {/* Navigation Buttons - Fixed at Bottom */}
          <div className="sticky bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-200 mt-8">
            <div className="max-w-4xl mx-auto px-6 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>

              {currentStep === 3 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <>Submitting...</> : "Submit"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-teal-500 rounded-[10px] text-white rounded-lg hover:bg-teal-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function convertTo12HourFormat(time24: string): string {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}
