// 'use client'

// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { OtpInput } from "shadcn"; // Import Shadcn OTP input component
// import ButtonTheme from "@/components/shared/ButtonTheme";

// const OTPPage = () => {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<OTPForm>({
//     resolver: zodResolver(otpSchema),
//   });

//   const onSubmit = (data: OTPForm) => {
//     // Handle OTP submission
//     toast.success("OTP submitted successfully", {
//       onClose() {
//         router.push("/next-step"); // Redirect after successful submission
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#00A0AA] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h1>
//           <p className="text-gray-600">Please enter the OTP sent to your email</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div>
//             <OtpInput
//               {...register("otp")}
//               className="w-full"
//               placeholder="Enter OTP"
//               error={errors.otp?.message} // Display error message if exists
//             />
//           </div>

//           <ButtonTheme
//             bgColor="#00A0AA"
//             textColor="text-white"
//             className="w-full rounded-full bg-[#00A0AA] text-white py-2 h-11 mt-6"
//           >
//             Submit OTP
//           </ButtonTheme>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPPage;
