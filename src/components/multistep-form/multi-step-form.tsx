"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Step1BasicDetails from "./step1-basic-details";
import Step2LocationHours from "./step2-location-hours";
import Step3ServicesOffered from "./step3-services-offered";
import Step4Success from "./step4-success";

const formSchema = z.object({
  // Step 1 - Basic Details
  profileLogo: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Profile logo is required"
  }),
  coverPhoto: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Cover photo is required"
  }),
  pharmacyName: z.string().min(1, "Pharmacy name is required"),
  pharmacyEmail: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  shortBio: z.string().min(10, "Short bio must be at least 10 characters"),

  // Step 2 - Location & Hours
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  workingDays: z.array(z.string()).min(1, "Select at least one working day"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  pinLocation: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),

  // Step 3 - Services
  selectedServices: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        category: z.string(),
        parentId: z.string().optional(),
        level: z.number(),
      })
    )
    .min(1, "Select at least one service"),
});

export type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      startTime: "09:00",
      endTime: "18:00",
      workingDays: [],
      address: "",
      pinLocation: undefined,
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
        fieldsToValidate = ["startTime", "endTime", "address", "workingDays"];
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

  const onSubmit = (data: FormData) => {
    console.log("Final Form Data:", data);
    setIsSubmitted(true);
    setCurrentStep(4);
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
    <div className="min-h-screen bg-white">
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

      <div className="max-w-4xl mx-auto px-6 py-8">
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Previous
            </button>

            {currentStep === 3 ? (
              <button
                type="submit"
                className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-teal-500 rounded-[10px] text-white rounded-lg hover:bg-teal-600 font-medium"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
