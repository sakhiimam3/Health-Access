"use client"

import { useState } from "react"
import { useCreateServiceSection, useUpload, useGetServiceSections } from "@/lib/hooks"
// import { useUplaodeImage, useCreateServiceSection } from "" // Update with your actual path

interface ImageUploadItem {
  sectionIndex: number
  columnIndex?: number
  fieldType: "image" | "content" | "video"
  originalSrc: string
}

interface PublishSectionsParams {
  sections: any[]
  serviceId: string
}

export const usePublishSections = (id) => {
  const [isPublishing, setIsPublishing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{
    total: number
    completed: number
    current?: string
  }>({ total: 0, completed: 0 })

  const uploadImageMutation = useUpload()
  const createSectionMutation = useCreateServiceSection(id as string)
  const { refetch: refetchSections } = useGetServiceSections(id as string)

  const publishSections = async ({ sections, serviceId }: PublishSectionsParams) => {
    setIsPublishing(true)
    setUploadProgress({ total: 0, completed: 0 })

    try {
      // Step 1: Extract all images that need to be uploaded
      const imagesToUpload: ImageUploadItem[] = []

      sections.forEach((section, sectionIndex) => {
        // Check section-level image
        if (section.image && section.image.startsWith("blob:")) {
          imagesToUpload.push({
            sectionIndex,
            fieldType: "image",
            originalSrc: section.image,
          })
        }

        // Check section-level video
        if (section.video && section.video.startsWith("blob:")) {
          imagesToUpload.push({
            sectionIndex,
            fieldType: "video",
            originalSrc: section.video,
          })
        }

        // Check column-level images
        section.columns?.forEach((column: any, columnIndex: number) => {
          if (column.type === "image" && typeof column.content === "object") {
            if (column.content.src && column.content.src.startsWith("blob:")) {
              imagesToUpload.push({
                sectionIndex,
                columnIndex,
                fieldType: "content",
                originalSrc: column.content.src,
              })
            }
          }
        })
      })

      setUploadProgress({ total: imagesToUpload.length, completed: 0 })

      // Step 2: Upload all images concurrently (if any)
      let uploadResults: any[] = []
      if (imagesToUpload.length > 0) {
        const uploadPromises = imagesToUpload.map(async (imageItem, index) => {
          try {
            const response = await fetch(imageItem.originalSrc)
            const blob = await response.blob()
            const file = new File([blob], `image-${Date.now()}-${index}.jpg`, {
              type: blob.type || "image/jpeg",
            })

            const formData = new FormData()
            formData.append("file", file)

            setUploadProgress((prev) => ({
              ...prev,
              current: `Uploading image ${index + 1}/${imagesToUpload.length}`,
            }))

            const uploadResult = await uploadImageMutation.mutateAsync(formData)

            setUploadProgress((prev) => ({
              ...prev,
              completed: prev.completed + 1,
            }))

            return {
              ...imageItem,
              uploadedUrl: uploadResult.data?.url || "",
            }
          } catch (error) {
            console.error(`Failed to upload image ${index}:`, error)
            throw new Error(`Failed to upload image ${index + 1}`)
          }
        })

        uploadResults = await Promise.all(uploadPromises)
      }

      // Step 3: Update sections payload with uploaded URLs
      const updatedSections = sections.map((section, sectionIndex) => {
        const updatedSection = { ...section }

        // Update section-level images
        const sectionImageUpload = uploadResults.find(
          (result) =>
            result.sectionIndex === sectionIndex && result.columnIndex === undefined && result.fieldType === "image",
        )
        if (sectionImageUpload) {
          updatedSection.image = sectionImageUpload.uploadedUrl
        }

        const sectionVideoUpload = uploadResults.find(
          (result) =>
            result.sectionIndex === sectionIndex && result.columnIndex === undefined && result.fieldType === "video",
        )
        if (sectionVideoUpload) {
          updatedSection.video = sectionVideoUpload.uploadedUrl
        }

        // Update column-level images
        if (updatedSection.columns) {
          updatedSection.columns = updatedSection.columns.map((column: any, columnIndex: number) => {
            const columnImageUpload = uploadResults.find(
              (result) =>
                result.sectionIndex === sectionIndex &&
                result.columnIndex === columnIndex &&
                result.fieldType === "content",
            )

            if (columnImageUpload && column.type === "image") {
              return {
                ...column,
                content: {
                  ...column.content,
                  src: columnImageUpload.uploadedUrl,
                },
              }
            }

            return column
          })
        }

        return updatedSection
      })

      // Step 4: Create sections with updated URLs
      setUploadProgress((prev) => ({
        ...prev,
        current: "Creating sections...",
      }))

      const createSectionPromises = updatedSections.map(async (section) => {
        const payload = {
          title: section.title,
          layout: section.layout,
          serviceId: serviceId,
          columns:
            section.columns?.map((column: any) => ({
              type: column.type,
              content: typeof column.content === "string" ? column.content : JSON.stringify(column.content),
              columnOrder: column.columnOrder,
              isActive: column.isActive,
            })) || [],
        }

        return await createSectionMutation.mutate(payload)
      })

      const sectionResults = await Promise.all(createSectionPromises)

      // Check if all sections were created successfully
      const allSectionsCreated = sectionResults.every(result => result !== null && result !== undefined)

      if (!allSectionsCreated) {
        throw new Error("Some sections failed to create")
      }

      setUploadProgress({
        total: imagesToUpload.length,
        completed: imagesToUpload.length,
        current: "Complete!",
      })

      // Refetch sections after successful publish
      await refetchSections()

      return {
        success: true,
        uploadedImages: uploadResults.length,
        createdSections: sectionResults.length,
        sections: sectionResults,
      }
    } catch (error) {
      // Only log and throw if it's a real error
      if (error instanceof Error && error.message !== "Some sections failed to create") {
        console.error("Publish failed:", error)
        throw error
      }
      // If it's our custom error about section creation, handle it silently
      return {
        success: false,
        error: "Failed to create some sections"
      }
    } finally {
      setIsPublishing(false)
      setTimeout(() => {
        setUploadProgress({ total: 0, completed: 0 })
      }, 2000)
    }
  }

  return {
    publishSections,
    isPublishing,
    uploadProgress,
    isUploading: uploadImageMutation.isPending,
    isCreating: createSectionMutation.isPending,
  }
}
