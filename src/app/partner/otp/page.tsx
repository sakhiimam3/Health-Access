"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // Import Shadcn OTP components
import ButtonTheme from "@/components/shared/ButtonTheme";
import { OTPForm, otpSchema } from "@/lib/schema"; // Ensure these are defined
import Image from "next/image"; // Import Image component for logo
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVerifyOTP } from "@/lib/hooks";
import { AxiosError } from "axios";

const OTPPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: verifyOTP, isPending } = useVerifyOTP();
  const email = searchParams.get("email");
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<OTPForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: OTPForm) => {
    const dataToSend = {
      email: email,
      newPassword: data.newPassword,
      otp:data.otp,
    };
    verifyOTP(dataToSend, {
      onSuccess: () => {
        toast.success("Password reset successfully", {
          onClose() {
            router.push("/partner/partner-login");
          },
        });
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      },
    });
  };
  return (
    <div className="min-h-screen bg-[#00A0AA] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-300">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-roboto">
            Enter OTP
          </h1>
          <p className="text-gray-600 font-roboto">
            Please enter the OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormField
              control={control}
              name="newPassword"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="New Password"
                  className="w-full placeholder:text-gray-400 rounded-full border border-gray-300"
                  type="password"
                />
              )}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={watch("otp")}
              onChange={(value) => setValue("otp", value)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {errors.otp && (
              <p className="mt-1 text-sm text-red-600 text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          <ButtonTheme
            bgColor="#00A0AA"
            textColor="text-white"
            isLoading={isPending}
            className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
          >
            {isPending ? "Submitting..." : "Submit"}
          </ButtonTheme>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
