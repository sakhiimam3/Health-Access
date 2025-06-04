"use client"

import { Suspense, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useRouter, useSearchParams } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import ButtonTheme from "@/components/shared/ButtonTheme"
import { type OTPForm, otpSchema } from "@/lib/schema"
import { FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useVerifyOTP } from "@/lib/hooks"
import { AxiosError } from "axios"
import { Eye, EyeOff, Shield, Mail, Clock, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const OTPPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { mutate: verifyOTP, isPending } = useVerifyOTP()
  const email = searchParams.get("email")
  const [showPassword, setShowPassword] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [canResend, setCanResend] = useState(false)

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
  })

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const onSubmit = (data: OTPForm) => {
    const dataToSend = {
      email: email,
      newPassword: data.newPassword,
      otp: data.otp,
    }
    verifyOTP(dataToSend, {
      onSuccess: () => {
        toast.success("Password reset successfully", {
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

  const handleResendOTP = () => {
    // Add resend OTP logic here
    setTimeLeft(300)
    setCanResend(false)
    toast.info("OTP resent successfully")
  }

  const otpValue = watch("otp")
  const passwordValue = watch("newPassword")

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-lg relative z-10 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00A0AA] via-[#00B5C0] to-[#00CAD5] rounded-2xl p-0.5">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl h-full w-full"></div>
        </div>

        <CardContent className="relative z-10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00A0AA] to-[#00CAD5] rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2 font-roboto">Verify Your Identity</h1>
            <p className="text-gray-600 font-roboto text-sm leading-relaxed">
              We've sent a 6-digit verification code to
            </p>
            <div className="flex items-center justify-center mt-2 text-[#00A0AA] font-medium">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{email}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* New Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">New Password</label>
              <div className="relative">
                <FormField
                  control={control}
                  name="newPassword"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter your new password"
                      className="w-full pr-12 h-12 rounded-xl border-2 border-gray-200 focus:border-[#00A0AA] transition-colors placeholder:text-gray-400"
                      type={showPassword ? "text" : "password"}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* OTP Input */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 flex items-center">Verification Code</label>

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otpValue} onChange={(value) => setValue("otp", value)} className="gap-3">
                  <InputOTPGroup className="gap-3">
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="w-12 h-12 text-lg font-semibold border-2 border-gray-300 rounded-xl focus:border-[#00A0AA] hover:border-gray-400 transition-colors bg-white shadow-sm"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {errors.otp && (
                <p className="text-sm text-red-500 text-center flex items-center justify-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.otp.message}
                </p>
              )}

              {/* Timer and Resend */}
              <div className="text-center space-y-3">
                {!canResend ? (
                  <div className="flex items-center justify-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Code expires in {formatTime(timeLeft)}</span>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendOTP}
                    className="text-[#00A0AA] hover:text-[#008A94] text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Code
                  </Button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
              <ButtonTheme
                bgColor="#00A0AA"
                textColor="text-white"
                isLoading={isPending}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00A0AA] to-[#00CAD5] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={!otpValue || !passwordValue || otpValue.length !== 6}
              >
                {isPending ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Reset Password
                  </div>
                )}
              </ButtonTheme>

              {/* Back to Login */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push("/partner/partner-login")}
                className="w-full text-gray-600 hover:text-gray-800 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Security Notice</p>
                <p className="text-blue-700">
                  For your security, this code will expire in {formatTime(timeLeft)}. Don't share this code with anyone.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#00A0AA] via-[#00B5C0] to-[#00CAD5] flex items-center justify-center">
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center space-x-3">
        <RefreshCw className="w-6 h-6 text-[#00A0AA] animate-spin" />
        <span className="text-gray-700 font-medium">Loading verification page...</span>
      </div>
    </div>
  </div>
)

const OTPWrapper = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <OTPPage />
    </Suspense>
  )
}

export default OTPWrapper
