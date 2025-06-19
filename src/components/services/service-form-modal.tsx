"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCreateUpdatePartnerService, useUpload, useGetServices } from "@/lib/hooks"
import { toast } from "react-toastify"
import { Loader2, X, Upload, DollarSign, FileText, CheckCircle, ZoomIn } from "lucide-react"
import { useState, useEffect } from "react"

const serviceSchema = z.object({
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  isActive: z.boolean(),
  image: z.string().optional(),
})

type ServiceFormData = z.infer<typeof serviceSchema>

interface ServiceFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  serviceId?: string
  initialData?: {
    price: number
    description: string
    isActive: boolean
    image?: string
  }
}

export const ServiceFormModal = ({ isOpen, onClose, onSuccess, serviceId, initialData }: ServiceFormModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "")
  const [mounted, setMounted] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const { data: servicesData } = useGetServices()

  useEffect(() => {
    setMounted(true)
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const { mutate: uploadImage, isPending: isUploading } = useUpload()
  const { mutate: createUpdateService, isPending: isSubmitting } = useCreateUpdatePartnerService(serviceId)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: initialData || {
      price: 0,
      description: "",
      isActive: true,
      image: "",
    },
  })

  // Add effect to update form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setImagePreview(initialData.image || "");
    }
  }, [initialData, reset]);

  const isActive = watch("isActive")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    setValue("image", "")
  }

  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (imageFile) {
        const formData = new FormData()
        formData.append("file", imageFile)

        uploadImage(formData, {
          onSuccess: (response) => {
            createUpdateService(
              {
                price: data.price,
                description: data.description,
                isActive: data.isActive,
                image: response.data.url,
              },
              {
                onSuccess: () => {
                  toast.success(serviceId ? "Service updated successfully" : "Service created successfully")
                  reset()
                  onSuccess()
                  onClose()
                },
                onError: (error) => {
                  toast.error(error.message || "Failed to save service")
                },
              },
            )
          },
          onError: (error) => {
            toast.error(error.message || "Failed to upload image")
          },
        })
      } else {
        createUpdateService(
          {
            price: data.price,
            description: data.description,
            isActive: data.isActive,
            image: data.image || "",
          },
          {
            onSuccess: () => {
              toast.success(serviceId ? "Service updated successfully" : "Service created successfully")
              reset()
              onSuccess()
              onClose()
            },
            onError: (error) => {
              toast.error(error.message || "Failed to save service")
            },
          },
        )
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  if (!isOpen || !mounted) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl animate-in fade-in duration-300">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
                {serviceId ? "Edit" : "New"}
              </span>
              <h2 className="text-base font-semibold text-gray-800 truncate">
                {serviceId ? "Edit Service Details" : "Create New Service"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Image Upload Section */}
            <div className="w-full">
              <div className="border-2 border-dashed border-gray-200 hover:border-teal-300 transition-colors rounded-lg overflow-hidden">
                <div className="relative">
                  <div
                    className={`w-full h-32 bg-gradient-to-r from-teal-50 to-slate-50 flex items-center justify-center overflow-hidden ${
                      imagePreview ? "p-0" : "p-4"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Service preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setIsImageModalOpen(true)}
                            className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                            aria-label="Preview image"
                          >
                            <ZoomIn className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10 transition-all duration-200 hover:scale-110"
                        >
                          <X className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center flex-col">
                        <div className="bg-teal-100 rounded-full p-2 mb-1">
                          <Upload className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-xs font-medium text-teal-700 block">Upload Service Image</span>
                        <span className="text-xs text-slate-500 mt-0.5 text-center px-2">
                          Drag and drop or click to browse
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload service image"
                  />
                </div>
              </div>
            </div>

            {/* Price Field */}
            <div className="space-y-1">
              <label htmlFor="price" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <DollarSign className="w-4 h-4 text-teal-600" />
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  className={`pl-8 w-full h-9 text-sm rounded-lg border shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.price ? "border-red-300 focus:ring-red-500" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
            </div>

            {/* Description Field */}
            <div className="space-y-1">
              <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-teal-600" />
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                className={`min-h-[80px] w-full text-sm rounded-lg border shadow-sm px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                  errors.description ? "border-red-300 focus:ring-red-500" : "border-gray-200"
                }`}
                placeholder="Describe your service in detail..."
              />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            {/* Status Toggle */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-full ${isActive ? "bg-teal-100" : "bg-gray-200"}`}>
                    <CheckCircle className={`w-4 h-4 ${isActive ? "text-teal-600" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <label htmlFor="active-status" className="text-xs font-medium text-gray-700">
                      Service Status
                    </label>
                    <p className="text-xs text-gray-500">
                      {isActive ? "Visible to customers" : "Hidden from customers"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    onClick={() => setValue("isActive", !isActive)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      isActive ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        isActive ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-xs font-medium text-gray-700">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className={`px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  isSubmitting || isUploading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {serviceId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}