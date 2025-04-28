'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordForm, resetPasswordSchema } from "@/lib/schema";
import { useResetPasswordPartner } from "@/lib/hooks";
import ButtonTheme from "@/components/shared/ButtonTheme";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from "next/navigation";
const ResetPassword = () => {
  const { mutate: resetPassword, isPending } = useResetPasswordPartner();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordForm) => {
    const dataToSend = {
      email: data.email,
      newPassword: data.password,
    };
    resetPassword(dataToSend, {
      onSuccess: () => {
        toast.success("Password reset successfully", {
          onClose() {
            router.push("/partner-login");
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
            Reset Password
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

          <div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full pl-4 placeholder:text-gray-400 pr-4 py-3 border border-gray-300 rounded-lg  focus:ring-blue-500 "
                placeholder="New password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2   transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full pl-4 placeholder:text-gray-400 pr-4 py-3 border border-gray-300 rounded-lg  focus:ring-blue-500 "
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <ButtonTheme
            bgColor="#00A0AA"
            textColor="text-white"
            className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </ButtonTheme>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Remember your password?{" "}
          <a
            href="/partner-login"
            className="text-[#00A0AA] hover:text-[#00A0AA] hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
