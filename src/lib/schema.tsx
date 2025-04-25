import { z } from "zod";

// Login Form Schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  businessPhone: z.string().min(10, "Please enter a valid phone number"),
  businessType: z.string().min(1, "Please select a business type"),
  location: z.string().min(1, "Please select a location"),
  postalCode: z.string().min(1, "Please enter a valid postal code"),
});

export type PharmacySignUpFormValues = z.infer<typeof pharmacySignUpSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;
