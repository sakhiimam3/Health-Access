"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { CSSProperties } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { pharmacySignUpSchema, PharmacySignUpFormValues } from "@/lib/schema";
import Wrapper from "./layout/wrapper";
import ButtonTheme from "./shared/ButtonTheme";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useCreatePartner } from "@/lib/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from 'axios';

const selectStyles = {
  input: {
    borderRadius: "24px",
    padding: "0 16px",
  },
  button: {
    borderRadius: "24px",
  },
  select: {
    borderRadius: "24px",
    padding: "0 16px",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1rem",
    paddingRight: "2.5rem",
  } as CSSProperties,
};

// Location options
const locationOptions = [
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },
  { value: "birmingham", label: "Birmingham" },
  { value: "leeds", label: "Leeds" },
  { value: "glasgow", label: "Glasgow" },
  { value: "edinburgh", label: "Edinburgh" },
  { value: "liverpool", label: "Liverpool" },
  { value: "bristol", label: "Bristol" },
];

// Postal code options
const postalCodeOptions = [
  { value: "sw1", label: "SW1" },
  { value: "w1", label: "W1" },
  { value: "nw1", label: "NW1" },
  { value: "se1", label: "SE1" },
  { value: "e1", label: "E1" },
  { value: "n1", label: "N1" },
  { value: "ec1", label: "EC1" },
  { value: "wc1", label: "WC1" },
];

const PharmacySignUpForm = () => {
  const { mutate: createPartner, isPending, error } = useCreatePartner();
  const router = useRouter();


  const form = useForm<PharmacySignUpFormValues>({
    resolver: zodResolver(pharmacySignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      businessName: "",
      website: "",
      phoneNumber: "",
      businessType: "",
      notificationToken: "",
      termsAccepted: true,
      schedulingPlatform: "calendly",
      postalCode:"",
      location: {
        name: "",
        latitude: 0,
        longitude: 0,
      },
    },

  });
  const { reset } = form;


  const onSubmit = (data: PharmacySignUpFormValues) => {
    const { location, postalCode, ...rest } = data;
    const dataTosend = {
      ...rest,
      location: {
        name: data.location.name,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      },
    };

    createPartner(dataTosend, {
      onSuccess: () => {
        toast.success("Partner created successfully", {
          onClose: () => {
            router.push("/partner/partner-login");
          },
        });
        reset();
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message || "Error creating partner";
          toast.error("Error creating partner: " + errorMessage);
        } else {
          toast.error("An unexpected error occurred.");
        }
      },
    });
  };

  const businessTypeOptions = [
    { value: "retail", label: "Retail" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "technology", label: "Technology" },
    { value: "hospitality", label: "Hospitality" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-[#189BA3] py-16" id="sign-up-section">
      <Wrapper>
        {/* Left Side - Form Illustration */}
        <div className="w-full flex  justify-between flex-col md:flex-row overflow-hidden">
          <div style={{ borderRadius: "24px" }}>
            <div className="text-white mt-8 mb-10">
              <h1 className="text-3xl md:text-4xl font-ubantu font-bold mb-6">
                Pharmacy Sign-Up Form
              </h1>
              <p className="text-white/90 text-lg">
                Fill in your details to become a verified Health Access partner
                pharmacy.
              </p>
            </div>
            <div className="flex w-full">
              <Image
                src="/images/become-partner-signup.png"
                alt="Pharmacy Sign Up"
                width={550}
                height={300}
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className="p-8 md:p-10 md:w-1/2 bg-white"
            style={{ borderRadius: "24px" }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium ml-1 font-roboto">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First name"
                            className="px-4 py-3 placeholder:text-gray-400"
                            style={selectStyles.input}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium ml-1 font-roboto">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last name"
                            className="px-4 py-3 placeholder:text-gray-400"
                            style={selectStyles.input}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-[12px]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium ml-1 font-roboto">
                        Email*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className="px-4 py-3 placeholder:text-gray-400"
                          style={selectStyles.input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-[12px]" />
                    </FormItem>
                  )}
                />

                {/* Business Name and Website URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium ml-1 font-roboto">
                          Business Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="HealthCare Pharmacy"
                            className="px-4 py-3 placeholder:text-gray-400"
                            style={selectStyles.input}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium ml-1 font-roboto">
                          Website URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="www.example.com"
                            className="px-4 py-3 placeholder:text-gray-400"
                            style={selectStyles.input}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-[12px]" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Business Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium font-roboto ml-1">
                        Business Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="phone-input-container">
                          <Controller
                            name="phoneNumber"
                            control={form.control}
                            render={({ field: { onChange, value } }) => (
                              <PhoneInput
                                country={"gb"}
                                value={value}
                                onChange={onChange}
                                containerStyle={{
                                  width: "100%",
                                }}
                                inputStyle={{
                                  border: "1px solid black",
                                  borderTopLeftRadius: "24px",
                                  borderBottomLeftRadius: "24px",
                                  padding: "0 12px 0 48px",
                                  width: "100%",
                                  height: "45px",
                                }}
                                dropdownStyle={{
                                  border: "1px solid black",
                                  borderRadius: "0 0 8px 8px",
                                }}
                                enableSearch={false}
                                disableSearchIcon
                                placeholder="+44 123 456 7890"
                              />
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-[12px]" />
                    </FormItem>
                  )}
                />

                {/* Business Type - Replaced with regular input */}
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium ml-1 font-roboto">
                        Business Type
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-12 w-full rounded-[24px] border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <option value="" disabled className="text-gray-400">
                            Select business type
                          </option>
                          {businessTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage className="text-red-500 text-[12px]" />
                    </FormItem>
                  )}
                />

                {/* Location and Postal Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium ml-1 font-roboto">
                          Location
                        </FormLabel>
                        <FormControl>
                          <select
                            className="flex h-12 w-full rounded-[24px] border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={field.value}
                            onChange={field.onChange}
                            style={selectStyles.select}
                          >
                            <option
                              value=""
                              disabled
                              className="text-gray-400"
                              style={{ color: "#9CA3AF" }}
                            >
                              Select location
                            </option>
                            {locationOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage className="text-red-500 text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium ml-1 font-roboto">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <select
                            className="flex h-12 w-full rounded-[24px] border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={field.value}
                            onChange={field.onChange}
                            style={selectStyles.select}
                          >
                            <option
                              value=""
                              disabled
                              className="text-gray-400"
                              style={{ color: "#9CA3AF" }}
                            >
                              Select postal code
                            </option>
                            {postalCodeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage className="text-red-500 text-[12px]" />
                      </FormItem>
                    )}
                  />
                </div>

                <ButtonTheme
                  bgColor="#189BA3"
                  textColor="white"
                  isLoading={isPending}
                  className="w-full py-3 rounded-[24px] px-4 bg-[#189BA3] text-white hover:bg-[#14838a] transition-colors font-[500] text-lg"
                >
                  Submit Application
                </ButtonTheme>

                {/* Login Link */}
                <div className="text-center text-sm text-gray-500 mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/partner/partner-login"
                    className="text-[#189BA3] hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default PharmacySignUpForm;
