"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Upload } from "lucide-react"

export function EditProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-ubuntu font-semibold text-gray-900">Edit Profile</h2>

      {/* Image Upload Section */}
      <div className="flex flex-col justify-between lg:flex-row gap-6 mb-8">
        {/* Profile/Logo Upload */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <div className="w-32 h-32 bg-[#E7E7E7] rounded-full flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <div className="relative w-full h-full">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1772_862)">
                    <path d="M30.5 8.4375V25.3125C30.5 26.8652 29.2402 28.125 27.6875 28.125H3.3125C1.75977 28.125 0.5 26.8652 0.5 25.3125V8.4375C0.5 6.88477 1.75977 5.625 3.3125 5.625H8.46875L9.18945 3.69727C9.59961 2.60156 10.6484 1.875 11.8203 1.875H19.1738C20.3457 1.875 21.3945 2.60156 21.8047 3.69727L22.5312 5.625H27.6875C29.2402 5.625 30.5 6.88477 30.5 8.4375ZM22.5312 16.875C22.5312 12.9961 19.3789 9.84375 15.5 9.84375C11.6211 9.84375 8.46875 12.9961 8.46875 16.875C8.46875 20.7539 11.6211 23.9062 15.5 23.9062C19.3789 23.9062 22.5312 20.7539 22.5312 16.875ZM20.6562 16.875C20.6562 19.7168 18.3418 22.0312 15.5 22.0312C12.6582 22.0312 10.3438 19.7168 10.3438 16.875C10.3438 14.0332 12.6582 11.7188 15.5 11.7188C18.3418 11.7188 20.6562 14.0332 20.6562 16.875Z" fill="#737373"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1772_862">
                      <rect width="30" height="30" fill="white" transform="translate(0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <Label className="text-sm font-medium text-gray-700 mt-3">
            Profile/Logo
          </Label>
        </div>

        {/* Cover Photo Upload */}
        <div className="w-[400px]">
          <div className="relative">
            <div className="w-full h-32 bg-[#E7E7E7] rounded-lg flex items-center justify-center overflow-hidden">
              {coverImage ? (
                <div className="relative w-full h-full">
                  <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500 mt-2 block">
                    Upload Cover Photo
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label htmlFor="pharmacyName" className="text-sm font-medium text-gray-900 mb-2 block">
            Pharmacy Name
          </Label>
          <Input 
            id="pharmacyName" 
            defaultValue="Warburtons Pharmacy" 
            className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <Label htmlFor="pharmacyEmail" className="text-sm font-medium text-gray-900 mb-2 block">
            Pharmacy Email
          </Label>
          <Input
            id="pharmacyEmail"
            type="email"
            defaultValue="contact@warburtons pharmacy.co.uk"
            className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-900 mb-2 block">
            Contact Number
          </Label>
          <Input 
            id="contactNumber" 
            defaultValue="021 123 3212" 
            className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div>
          <Label htmlFor="website" className="text-sm font-medium text-gray-900 mb-2 block">
            Website <span className="text-gray-500">(optional)</span>
          </Label>
          <Input 
            id="website" 
            defaultValue="https://warburtons pharmacy.co.uk" 
            className="h-12 text-base rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Short Bio */}
      <div>
        <Label htmlFor="shortBio" className="text-sm font-medium text-gray-900 mb-2 block">
          Short Bio
        </Label>
        <Textarea
          id="shortBio"
          defaultValue="Warburtons Pharmacy is a trusted and community-focused independent pharmacy located in Manchester, M3 2FW. Renowned for its friendly service and personalized care, Warburtons Pharmacy is dedicated to offering exceptional healthcare solutions and building strong relationships with every customer."
          className="min-h-[120px] w-full text-base rounded-[20px] border border-[#E7E7E7] shadow-sm px-3 py-2 focus:border-teal-500 focus:ring-teal-500 resize-none"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-teal-500 hover:bg-teal-600 font-roboto text-white rounded-full">Save Changes</Button>
      </div>
    </div>
  )
}
