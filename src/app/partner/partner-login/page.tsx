"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginPartner } from "@/lib/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userStore";
export default function AuthPage() {
  const { mutate: loginPartner, isPending, error } = useLoginPartner();
  const router = useRouter();
  const {setUserData}=useUserContext();
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler
  const onLoginSubmit = (data: LoginFormValues) => {
    const dataToSend = {
      email: data.email,
      password: data.password,
      notificationToken: "",
    };
    loginPartner(dataToSend, {
      onSuccess: (data) => {
        setUserData(data?.data);
        toast.success("Login successfully",{
          onClose(){
            router.push("/");
          }
        });
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message || "Error creating partner";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  return (
    <div className="flex min-h-screen max-w-[1340px] mx-auto w-full">
      <div className="w-full md:w-full lg:w-[45%] px-6 lg:px-12 py-8 flex flex-col">
        {/* Logo Container */}
        <div className="flex justify-center">
          <div className="w-full ">
            <div className="mb-8 flex justify-center md:justify-start">
              <Image
                src="/images/logo.png"
                alt="Health Access"
                width={250}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex items-center justify-center flex-grow">
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-center mb-1 textColor mb-2">
                {" "}
                Partner Login
              </h1>
              <p className="text-sm capitalize text-center paragraphColor font-roboto">
                Please enter your credentials to login.
              </p>
            </div>

            {/* Login form with validation */}
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-lg mb-2 textColor">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Email"
                          className="rounded-full pl-4 placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block  text-lg mb-2 textColor">
                        Password*
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                          className="rounded-full pl-4 placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => router.push("/partner/forgot-password")}
                    className="text-[#737373] hover:text-[#00A0AA] p-0 text-sm underline font-roboto"
                  >
                    Forgot Password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-full  hover:bg-[#00B0B0] bg-[#00A0AA] text-white py-2 mt-6"
                >
                 {isPending ? "Processing..." : "Login"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col w-[60%] ">
        <div className="flex-grow m-12 rounded-[29px] overflow-hidden relative">
          <Image
            src="/images/login.png"
            alt="Pharmacy"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#52525B]/100 to-transparent"></div>

          {/* Text Overlay */}
          <div className="absolute bottom-16 left-5 right-0 px-4 text-start text-white px-8 z-10">
            <h2 className="text-3xl font-semibold text-white mb-2">
              Your health, your priority
            </h2>
            <p className="text-md text-white font-roboto">
              Book trusted pharmacy services today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
