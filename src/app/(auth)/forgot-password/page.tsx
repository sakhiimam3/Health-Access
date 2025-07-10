"use client";

import React  from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordForm,
  forgotPasswordSchema,
} from "@/lib/schema";
import { useRequestResetPartner } from "@/lib/hooks";
import ButtonTheme from "@/components/shared/ButtonTheme";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const { mutate: requestReset, isPending } = useRequestResetPartner();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  // console.log(errors);
  const onSubmit = (data: ForgotPasswordForm) => {
    console.log(data);
    const dataToSend = {
      email: data.email,
    };
    requestReset(dataToSend, {
      onSuccess: () => {
        toast.success("Email sent successfully", {
          onClose() {
            router.push(`/otp?email=${data.email}`);
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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">
            Enter your Email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="relative">
              <Input
                type="email"
                {...register("email")}
                className="w-full pl-4 placeholder:text-gray-400 pr-4 py-3 border border-gray-300 rounded-lg  focus:ring-blue-500 "
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <ButtonTheme
            bgColor="#00A0AA"
            textColor="text-white"
            className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
          >
            {isPending ? "Sending..." : "Send"}
          </ButtonTheme>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Remember your password?{" "}
          <a
            href="/partner/partner-login"
            className="text-[#00A0AA] hover:text-[#00A0AA] hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
