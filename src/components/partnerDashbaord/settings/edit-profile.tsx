"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload, X, Loader2 } from "lucide-react"
import { useGetPartnerProfile, useUpdatePartnerProfile, useUpload } from "@/lib/hooks"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { z } from "zod"

// Simplified schema with only the fields we have in the form
const editProfileSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  describeYourBusiness: z.string().min(1, "Business description is required"),
})

type EditProfileFormValues = z.infer<typeof editProfileSchema>

export function EditProfile() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const [selectedProfileFile, setSelectedProfileFile] = useState<File | null>(null)
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const { data: profile, isLoading,refetch } = useGetPartnerProfile()
  const { mutate: updateProfile, isPending } = useUpdatePartnerProfile()
  const { mutate: uploadImage } = useUpload()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      businessName: "",
      email: "",
      phoneNumber: "",
      website: "",
      describeYourBusiness: "",
    },
  })

  useEffect(() => {
    if (profile?.data) {
      const profileData = profile.data
      reset({
        businessName: profileData.businessName || "",
        email: profileData.user?.email || "",
        phoneNumber: profileData.phoneNumber || "",
        website: profileData.website || "",
        describeYourBusiness: profileData.describeYourBusiness || "",
      })
      // Set actual URLs from server data
      setProfileImageUrl(profileData.image || null)
      setCoverImageUrl(profileData.coverImage || null)
    } else {
      reset({
        businessName: "",
        email: "",
        phoneNumber: "",
        website: "",
        describeYourBusiness: "",
      })
      setProfileImageUrl(null)
      setCoverImageUrl(null)
    }
  }, [profile, reset])

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedProfileFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedCoverFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProfileImage = () => {
    setProfileImageUrl(null)
    setProfileImagePreview(null)
    setSelectedProfileFile(null)
  }

  const removeCoverImage = () => {
    setCoverImageUrl(null)
    setCoverImagePreview(null)
    setSelectedCoverFile(null)
  }

  const uploadFile = (file: File, type: "profile" | "cover"): Promise<string> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append("file", file)

      uploadImage(formData, {
        onSuccess: (response) => {
          resolve(response.data.url) 
        },
        onError: (error) => {
          toast.error(`Failed to upload ${type} image`)
          reject(error)
        },
      })
    })
  }

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      setIsUploading(true)
      let finalProfileImageUrl = profileImageUrl
      let finalCoverImageUrl = coverImageUrl

      // First, upload profile image if a new one is selected
      if (selectedProfileFile) {
        try {
          finalProfileImageUrl = await uploadFile(selectedProfileFile, "profile")
          setProfileImageUrl(finalProfileImageUrl)
          setProfileImagePreview(null)
        } catch (error) {
          console.error("Profile image upload failed:", error)
          return
        }
      }

      // Then, upload cover image if a new one is selected
      if (selectedCoverFile) {
        try {
          finalCoverImageUrl = await uploadFile(selectedCoverFile, "cover")
          setCoverImageUrl(finalCoverImageUrl)
          setCoverImagePreview(null)
        } catch (error) {
          console.error("Cover image upload failed:", error)
          return
        }
      }

      // Simplified update payload - only form fields + image URLs (never base64)
      const updatePayload = {
        businessName: data.businessName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        website: data.website || "",
        describeYourBusiness: data.describeYourBusiness,
        image: finalProfileImageUrl || "",
        coverImage: finalCoverImageUrl || "",
      }

      // Update profile with the new data
      updateProfile(updatePayload, {
        onSuccess: () => {
          toast.success("Profile updated successfully")
          refetch()
          setSelectedProfileFile(null)
          setSelectedCoverFile(null)
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.message || "Failed to update profile")
          } else {
            toast.error("Failed to update profile")
          }
          console.error("Profile update failed:", error)
        },
      })
    } catch (error) {
      console.error("Unexpected error:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500 mx-auto mb-2" />
          <p className="text-gray-600">Loading your profile data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-ubuntu font-semibold text-gray-900">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Section */}
        <div className="flex flex-col justify-between lg:flex-row gap-6 mb-8">
          {/* Profile/Logo Upload */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              {(profileImagePreview || profileImageUrl) && (
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <div className="w-32 h-32 bg-[#E7E7E7] rounded-full flex items-center justify-center overflow-hidden">
                {profileImagePreview || profileImageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={profileImagePreview || profileImageUrl || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Camera className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Label className="text-sm font-medium text-gray-700 mt-3">Profile/Logo</Label>
          </div>

          {/* Cover Photo Upload */}
          <div className="w-[400px]">
            <div className="relative">
              {(coverImagePreview || coverImageUrl) && (
                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              )}
              <div className="w-full h-32 bg-[#E7E7E7] rounded-lg flex items-center justify-center overflow-hidden">
                {coverImagePreview || coverImageUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={coverImagePreview || coverImageUrl || "/placeholder.svg"}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500 mt-2 block">Upload Cover Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label htmlFor="businessName" className="text-sm font-medium text-gray-900 mb-2 block">
              Pharmacy Name
            </Label>
            <Input
              id="businessName"
              {...register("businessName")}
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2 block">
              Pharmacy Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-900 mb-2 block">
              Contact Number
            </Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <Label htmlFor="website" className="text-sm font-medium text-gray-900 mb-2 block">
              Website <span className="text-gray-500">(optional)</span>
            </Label>
            <Input
              id="website"
              {...register("website")}
              className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
            {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <Label htmlFor="describeYourBusiness" className="text-sm font-medium text-gray-900 mb-2 block">
            Short Bio
          </Label>
          <Textarea
            id="describeYourBusiness"
            {...register("describeYourBusiness")}
            className="min-h-[120px] w-full text-base rounded-[20px] border border-[#E7E7E7] shadow-sm px-3 py-2 focus:border-teal-500 focus:ring-teal-500 resize-none"
          />
          {errors.describeYourBusiness && (
            <p className="text-red-500 text-sm mt-1">{errors.describeYourBusiness.message}</p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending || isUploading}
            className="bg-teal-500 hover:bg-teal-600 font-roboto text-white rounded-full"
          >
            {isPending || isUploading ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
