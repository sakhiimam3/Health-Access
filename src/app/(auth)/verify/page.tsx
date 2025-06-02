"use client"

import { Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import ButtonTheme from "@/components/shared/ButtonTheme"
import { type VerifyotpFORM, VerifyotpSchema } from "@/lib/schema"
import { useUserVerifyOTP } from "@/lib/hooks"
import { AxiosError } from "axios"
import { Shield, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const OTPPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("id")
  const { mutate: verifyOTP, isPending } = useUserVerifyOTP(userId || "")

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<VerifyotpFORM>({
    resolver: zodResolver(VerifyotpSchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = (data: VerifyotpFORM) => {
    if (!userId) {
      toast.error("User ID is missing")
      return
    }

    const dataToSend = {
      code: Number(data.code),
    }

    verifyOTP(dataToSend, {
      onSuccess: () => {
        toast.success("User Verified successfully", {
          onClose() {
            router.push("/login")
          },
        })
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message)
        }
      },
    })
  }
// console.log("bb")
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00A0AA]/10 via-white to-[#00A0AA]/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00A0AA]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00A0AA]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg p-10 border border-white/20">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="absolute top-6 left-6 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        {/* Header Section */}
        <div className="text-center mb-10 pt-8">
          {/* Logo with enhanced styling */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#00A0AA]/20 rounded-full blur-2xl scale-110"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg border border-[#00A0AA]/20 inline-block">
              <Shield className="h-12 w-12 text-[#00A0AA]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3 font-roboto">Verify Your Account</h1>
          <p className="text-gray-600 font-roboto text-lg mb-2">Enter the 6-digit code sent to your email</p>
          <div className="flex items-center justify-center gap-2 text-sm text-[#00A0AA]">
            <Mail className="h-4 w-4" />
            <span>Check your inbox and spam folder</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Enhanced OTP Input */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00A0AA]/20 rounded-2xl blur-xl scale-110 opacity-50"></div>

              <InputOTP
                maxLength={6}
                value={watch("code")}
                onChange={(value) => setValue("code", value)}
                className="relative"
              >
                <InputOTPGroup className="gap-3">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="
                        w-14 h-14 
                        text-xl font-bold 
                        border-2 border-gray-200 
                        rounded-xl 
                        bg-white/50 
                        backdrop-blur-sm
                        transition-all 
                        duration-300 
                        ease-in-out
                        hover:border-[#00A0AA]/50
                        focus:border-[#00A0AA] 
                        focus:ring-4 
                        focus:ring-[#00A0AA]/20
                        focus:bg-white
                        focus:scale-105
                        data-[active=true]:border-[#00A0AA]
                        data-[active=true]:bg-white
                        data-[active=true]:shadow-lg
                        data-[active=true]:shadow-[#00A0AA]/20
                        text-gray-800
                        placeholder:text-gray-400
                      "
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Error Message */}
          {errors.code && (
            <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-sm font-medium">{errors.code.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="space-y-4">
            <ButtonTheme
              bgColor="#00A0AA"
              textColor="text-white"
              isLoading={isPending}
              className="
                w-full 
                rounded-2xl 
                bg-gradient-to-r 
                from-[#00A0AA] 
                to-[#00A0AA]/90 
                text-white 
                py-4 
                h-14 
                text-lg 
                font-semibold
                shadow-lg 
                shadow-[#00A0AA]/30
                hover:shadow-xl 
                hover:shadow-[#00A0AA]/40
                hover:scale-[1.02]
                transition-all 
                duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5" />
                  Verify Account
                </div>
              )}
            </ButtonTheme>

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">{"Didn't receive the code?"}</p>
              <Button
                type="button"
                variant="ghost"
                className="text-[#00A0AA] hover:text-[#00A0AA]/80 font-medium text-sm hover:bg-[#00A0AA]/10"
                onClick={() => {
                  // Add resend logic here
                  toast.info("Resending code...")
                }}
              >
                Resend Code
              </Button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-xs text-gray-500">This code will expire in 10 minutes for security purposes</p>
        </div>
      </div>
    </div>
  )
}

const OTPWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-[#00A0AA]/30 border-t-[#00A0AA] rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading...</span>
          </div>
        </div>
      }
    >
      <OTPPage />
    </Suspense>
  )
}

export default OTPWrapper
