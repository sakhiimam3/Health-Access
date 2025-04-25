"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  LoginFormValues,
  RegisterFormValues,
} from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DatePicker } from "@/components/ui/DatePicker";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      postcode: "",
      address: "",
      city: "",
      country: "",
      password: "",
    },
  });

  // Form submission handlers
  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("%c Login form submission:", "color: #00A0AA; font-weight: bold; font-size: 14px;");
    console.table(data);
    // Handle login logic here
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    console.log("%c Registration form submission:", "color: #00A0AA; font-weight: bold; font-size: 14px;");
    console.table(data);
    console.log("Date of Birth:", data.dateOfBirth);
    // Handle registration logic here
  };

  // For debugging form errors
  const onRegisterError = (errors: any) => {
    console.log("%c Registration form errors:", "color: red; font-weight: bold; font-size: 14px;");
    console.error(errors);
  };

  const onLoginError = (errors: any) => {
    console.log("%c Login form errors:", "color: red; font-weight: bold; font-size: 14px;");
    console.error(errors);
  };

  return (
    <div className="flex min-h-screen max-w-[1340px] mx-auto w-full">
      <div className="w-full md:w-full lg:w-[45%] px-6 lg:px-12 py-8 flex flex-col">
        {/* Logo Container - Fixed at top with same width as form */}
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

        {/* Form Container - Centered vertically */}
        <div className="flex items-center justify-center flex-grow">
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-center mb-1 textColor mb-2">
                {isLogin ? "Login" : "Create an Account"}
              </h1>
              <p className="text-sm text-center paragraphColor font-roboto">
                Lorem ipsum dolor sit amet adipiscing elit.
              </p>
            </div>

            {/* Login/Register Toggle */}
            <div className="flex bg-[#CEF9F7] rounded-full p-2 mb-8">
              <Button
                variant={isLogin ? "default" : "ghost"}
                className={cn(
                  "flex-1 rounded-full text-sm font-medium textColor font-ubuntu",
                  isLogin
                    ? "bg-[#00A0AA] text-white"
                    : "bg-transparent text-[#00A0AA]"
                )}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                className={cn(
                  "flex-1 rounded-full text-sm font-medium font-ubantu",
                  !isLogin
                    ? "bg-[#00A0AA] text-white"
                    : "bg-transparent text-[#00A0AA]"
                )}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>

            {/* Forms */}
            {isLogin ? (
              // Login form with validation
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit, onLoginError)}
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
                            className="rounded-full placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e);
                              console.log("Login email changing:", e.target.value);
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
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
                        <FormLabel className="block text-lg mb-2 textColor">
                          Password*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password"
                            className="rounded-full placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="text-right">
                    <Button
                      variant="link"
                      className="text-[#737373] p-0 text-sm underline font-roboto"
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
                  >
                    Login
                  </Button>
                </form>
              </Form>
            ) : (
              // Registration form with validation
              <Form {...registerForm}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Form submitted");
                    console.log("Current form values:", registerForm.getValues());
                    registerForm.handleSubmit(onRegisterSubmit, onRegisterError)();
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="First Name"
                              className="rounded-full placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Last Name"
                              className="rounded-full placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            Email*
                          </FormLabel>
                          <FormControl>
                            <input
                              id="register-email"
                              type="email"
                              placeholder="Email"
                              className="w-full px-3 py-2 rounded-full h-11 border border-[#737373] placeholder:text-[#B8B8B8]  "
                              value={field.value}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                console.log("Register email changing to:", newValue);
                                field.onChange(newValue);
                                // Force update the form
                                registerForm.setValue('email', newValue, { 
                                  shouldValidate: true,
                                  shouldDirty: true 
                                });
                              }}
                              onBlur={field.onBlur}
                              name={field.name}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500"/>
                        </FormItem>
                      );
                    }}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            Date Of Birth
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              value={field.value ? new Date(field.value) : undefined}
                              onChange={(date) => {
                                const formattedDate = date ? date.toISOString().split('T')[0] : '';
                                field.onChange(formattedDate);
                                console.log("Date selected:", formattedDate);
                              }}
                              placeholder="Select Date of Birth"
                              showYearDropdown={true}
                              yearDropdownItemNumber={100}
                              maxDate={new Date()}
                              error={!!registerForm.formState.errors.dateOfBirth}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            Postcode
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Postcode"
                              className="rounded-full placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={registerForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-lg mb-2 textColor">
                          Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              {...field}
                              style={{
                                border: "1px solid #737373",
                                borderRadius: "25px",
                                padding: "10px",
                                height: "50px",
                                width: "100%",
                                outline: "none",
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                              }}
                            >
                              <option value="" disabled>
                                Select Address
                              </option>
                              <option value="address1">Address 1</option>
                              <option value="address2">Address 2</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 6L8 10L12 6"
                                  stroke="#737373"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={registerForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            City/Town
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                style={{
                                  border: "1px solid #737373",
                                  borderRadius: "25px",
                                  padding: "10px",
                                  height: "50px",
                                  width: "100%",
                                  outline: "none",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                }}
                              >
                                <option value="" disabled>
                                  Select City
                                </option>
                                <option value="city1">City 1</option>
                                <option value="city2">City 2</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#737373"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-lg mb-2 textColor">
                            Country
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                style={{
                                  border: "1px solid #737373",
                                  borderRadius: "25px",
                                  padding: "10px",
                                  height: "50px",
                                  width: "100%",
                                  outline: "none",
                                  appearance: "none",
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                }}
                              >
                                <option value="" disabled>
                                  Select Country
                                </option>
                                <option value="country1">Country 1</option>
                                <option value="country2">Country 2</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4 6L8 10L12 6"
                                    stroke="#737373"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-lg mb-2 textColor">
                          Password*
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password"
                            className="rounded-full placeholder:text-[#B8B8B8] h-11 border-[#737373]"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
                    onClick={() => {
                      console.log("Register button clicked");
                      console.log("Current email value:", registerForm.getValues("email"));
                      registerForm.handleSubmit(onRegisterSubmit, onRegisterError)();
                    }}
                  >
                    Register
                  </Button>
                </form>
              </Form>
            )}
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
