"use client";

import React, { Suspense } from "react";
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
import { OTPForm, VerifyotpFORM, VerifyotpSchema } from "@/lib/schema"; // Ensure these are defined
import Image from "next/image"; // Import Image component for logo
import { useUserVerifyOTP } from "@/lib/hooks";
import { AxiosError } from "axios";

const OTPPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const { mutate: verifyOTP, isPending } = useUserVerifyOTP(userId || "");

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<VerifyotpFORM>({
    resolver: zodResolver(VerifyotpSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: VerifyotpFORM) => {
    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    const dataToSend = {
      code: Number(data.code)
    };

    verifyOTP(dataToSend, {
      onSuccess: () => {
        toast.success("User Verified successfully", {
          onClose() {
            router.push("/login");
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
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={watch("code")}
              onChange={(value) => setValue("code", value)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          {errors.code && (
            <p className="text-sm text-red-600 text-center">
              {errors.code.message}
            </p>
          )}
          <ButtonTheme
            bgColor="#00A0AA"
            textColor="text-white"
            isLoading={isPending}
            className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
          >
            {isPending ? "Verifying..." : "Verify"}
          </ButtonTheme>
        </form>
      </div>
    </div>
  );
};
const OTPWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPPage />
    </Suspense>
  );
};
export default OTPWrapper;
