"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordForm } from "@/lib/schema";
import { useChangePassword } from "@/lib/hooks";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordForm) => {
    changePassword(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          reset();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(
              error.response?.data.message || "Failed to update password"
            );
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-ubuntu font-semibold text-gray-900">
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        {/* Current Password */}
        <div>
          <Label
            htmlFor="oldPassword"
            className="text-sm font-roboto font-medium text-gray-700 mb-2 block"
          >
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              className="h-12 text-base text-gray-600 rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 font-roboto pr-10"
              {...register("oldPassword")}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showCurrentPassword ? (
                <Eye className="h-4 w-4 text-gray-400" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <Label
            htmlFor="newPassword"
            className="text-sm font-roboto font-medium text-gray-700 mb-2 block"
          >
            New Password
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="h-12 text-base text-gray-600 rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 font-roboto pr-10"
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showNewPassword ? (
                <Eye className="h-4 w-4 text-gray-400" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-roboto font-medium text-gray-700 mb-2 block"
          >
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="h-12 text-base text-gray-600 rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 font-roboto pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <Eye className="h-4 w-4 text-gray-400" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 text-base rounded-full bg-teal-500 hover:bg-teal-600 text-white font-roboto"
          >
            {isPending ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
