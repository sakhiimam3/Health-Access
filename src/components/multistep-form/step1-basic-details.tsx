"use client";

import type React from "react";

import type { UseFormReturn } from "react-hook-form";
import type { FormData } from "./multi-step-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, ImageIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const GalleryIcon = () => (
  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1772_862)">
      <path d="M30.5 8.4375V25.3125C30.5 26.8652 29.2402 28.125 27.6875 28.125H3.3125C1.75977 28.125 0.5 26.8652 0.5 25.3125V8.4375C0.5 6.88477 1.75977 5.625 3.3125 5.625H8.46875L9.18945 3.69727C9.59961 2.60156 10.6484 1.875 11.8203 1.875H19.1738C20.3457 1.875 21.3945 2.60156 21.8047 3.69727L22.5312 5.625H27.6875C29.2402 5.625 30.5 6.88477 30.5 8.4375ZM22.5312 16.875C22.5312 12.9961 19.3789 9.84375 15.5 9.84375C11.6211 9.84375 8.46875 12.9961 8.46875 16.875C8.46875 20.7539 11.6211 23.9062 15.5 23.9062C19.3789 23.9062 22.5312 20.7539 22.5312 16.875ZM20.6562 16.875C20.6562 19.7168 18.3418 22.0312 15.5 22.0312C12.6582 22.0312 10.3438 19.7168 10.3438 16.875C10.3438 14.0332 12.6582 11.7188 15.5 11.7188C18.3418 11.7188 20.6562 14.0332 20.6562 16.875Z" fill="#737373"/>
    </g>
    <defs>
      <clipPath id="clip0_1772_862">
        <rect width="30" height="30" fill="white" transform="translate(0.5)"/>
      </clipPath>
    </defs>
  </svg>
);

interface Step1Props {
  form: UseFormReturn<FormData>;
}

export default function Step1BasicDetails({ form }: Step1Props) {
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = form;

  // Watch for profile and cover photo changes
  const profileLogo = watch("profileLogo");
  const coverPhoto = watch("coverPhoto");

  // Update previews when form values change
  useEffect(() => {
    if (profileLogo instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(profileLogo);
    }
  }, [profileLogo]);

  useEffect(() => {
    if (coverPhoto instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(coverPhoto);
    }
  }, [coverPhoto]);

  const handleProfileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("profileLogo", file);
      await trigger("profileLogo");
    }
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("coverPhoto", file);
      await trigger("coverPhoto");
    }
  };

  const removeProfileLogo = async () => {
    setValue("profileLogo", null);
    setProfilePreview(null);
    await trigger("profileLogo");
  };

  const removeCoverPhoto = async () => {
    setValue("coverPhoto", null);
    setCoverPreview(null);
    await trigger("coverPhoto");
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Let's start with Pharmacy Basic Details
        </h1>
        <p className="text-gray-600 text-lg">
          Help us get to know your pharmacy
        </p>
      </div>

      <div className="space-y-8">
        {/* Image Upload Section */}
        <div className="flex flex-col justify-between lg:flex-row gap-6 mb-8">
          {/* Profile/Logo Upload */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              {profilePreview && (
                <button
                  type="button"
                  onClick={removeProfileLogo}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <div className="w-32 h-32 bg-[#E7E7E7] rounded-full flex items-center justify-center overflow-hidden">
                {profilePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1772_862)">
                      <path d="M30.5 8.4375V25.3125C30.5 26.8652 29.2402 28.125 27.6875 28.125H3.3125C1.75977 28.125 0.5 26.8652 0.5 25.3125V8.4375C0.5 6.88477 1.75977 5.625 3.3125 5.625H8.46875L9.18945 3.69727C9.59961 2.60156 10.6484 1.875 11.8203 1.875H19.1738C20.3457 1.875 21.3945 2.60156 21.8047 3.69727L22.5312 5.625H27.6875C29.2402 5.625 30.5 6.88477 30.5 8.4375ZM22.5312 16.875C22.5312 12.9961 19.3789 9.84375 15.5 9.84375C11.6211 9.84375 8.46875 12.9961 8.46875 16.875C8.46875 20.7539 11.6211 23.9062 15.5 23.9062C19.3789 23.9062 22.5312 20.7539 22.5312 16.875ZM20.6562 16.875C20.6562 19.7168 18.3418 22.0312 15.5 22.0312C12.6582 22.0312 10.3438 19.7168 10.3438 16.875C10.3438 14.0332 12.6582 11.7188 15.5 11.7188C18.3418 11.7188 20.6562 14.0332 20.6562 16.875Z" fill="#737373"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1772_862">
                        <rect width="30" height="30" fill="white" transform="translate(0.5)"/>
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Label className="text-sm font-medium text-gray-700 mt-3">
              Profile/Logo
            </Label>
            {errors.profileLogo && (
              <p className="text-red-500 text-sm mt-2">
                {errors.profileLogo.message?.toString()}
              </p>
            )}
          </div>

          {/* Cover Photo Upload */}
          <div className="w-[400px]">
            <div className="relative">
              {coverPreview && (
                <button
                  type="button"
                  onClick={removeCoverPhoto}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <div className="w-full h-32 bg-[#E7E7E7] rounded-lg flex items-center justify-center overflow-hidden">
                {coverPreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col">
                    <GalleryIcon />
                    <span className="text-sm text-gray-500 mt-2 block">
                      Upload Cover Photo
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {errors.coverPhoto && (
              <p className="text-red-500 text-sm mt-2">
                {errors.coverPhoto.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pharmacy Name */}
          <div>
            <Label
              htmlFor="pharmacyName"
              className="text-sm font-medium text-gray-900 mb-2 block"
            >
              Pharmacy Name
            </Label>
            <Input
              id="pharmacyName"
              {...register("pharmacyName")}
              placeholder="Warburtons Pharmacy"
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 text-[gray]"
            />
            {errors.pharmacyName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.pharmacyName.message?.toString()}
              </p>
            )}
          </div>

          {/* Pharmacy Email */}
          <div>
            <Label
              htmlFor="pharmacyEmail"
              className="text-sm font-medium text-gray-900 mb-2 block"
            >
              Pharmacy Email
            </Label>
            <Input
              id="pharmacyEmail"
              type="email"
              {...register("pharmacyEmail")}
              placeholder="contact@warburtons-pharmacy.co.uk"
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 text-[gray]"
            />
            {errors.pharmacyEmail && (
              <p className="text-red-500 text-sm mt-2">
                {errors.pharmacyEmail.message?.toString()}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <Label
              htmlFor="contactNumber"
              className="text-sm font-medium text-gray-900 mb-2 block"
            >
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              {...register("contactNumber")}
              placeholder="021 123 3212"
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 text-[gray]"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.contactNumber.message?.toString()}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <Label
              htmlFor="website"
              className="text-sm font-medium text-gray-900 mb-2 block"
            >
              Website <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="https://warburtons-pharmacy.co.uk"
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 text-[gray]"
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-2">
                {errors.website.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <Label
            htmlFor="shortBio"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Short Bio
          </Label>
          <textarea
            id="shortBio"
            {...register("shortBio")}
            placeholder="Add bio"
            className="min-h-[120px] w-full border border-[#E7E7E7] shadow-sm px-3 py-2 focus:border-teal-500 focus:ring-teal-500 resize-none text-[gray]"
          />
          {errors.shortBio && (
            <p className="text-red-500 text-sm mt-2">
              {errors.shortBio.message?.toString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
