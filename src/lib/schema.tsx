import { z } from "zod";

// Login Form Schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  notificationToken: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Registration Form Schema
export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  dateOfBirth: z.string()
    .min(1, { message: "Date of birth is required" })
    .refine((date) => {
      if (!date) return false;
      // Check if it's a valid date
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, { message: "Please enter a valid date" })
    .refine((date) => {
      if (!date) return false;
      // Check if the date is not in the future
      const parsedDate = new Date(date);
      const today = new Date();
      return parsedDate <= today;
    }, { message: "Date of birth cannot be in the future" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
 
});

export const pharmacySignUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  businessName: z.string().min(1, "Business name is required"),
  website: z.string().url("Invalid URL"),
  businessType: z.string().min(1, "Business type is required"),
  schedulingPlatform: z.string().min(1, "Scheduling platform is required"),
  location: z.object({
    name: z.string().min(1, "Location name is required"),
    latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  }),
  phoneNumber: z.string().min(1, "Pharmacy phone is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
  postalCode: z.string().optional(),
  notificationToken: z.string().optional(), // Assuming this can be optional
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

  
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type PharmacySignUpFormValues = z.infer<typeof pharmacySignUpSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
