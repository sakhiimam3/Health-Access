"use client"

import { useState, useEffect } from "react"
import { useLoadServiceSections } from "./use-load-service-sections"
import { usePublishSections } from "./use-publish-sections"
import type { Section } from "@/lib/cms/cms-type"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"

interface ServiceSectionsBuilderProps {
  // Make serviceId optional since we'll get it from params if not provided
  serviceId?: string
}

export const ServiceSectionsBuilder: React.FC<ServiceSectionsBuilderProps> = ({ serviceId: propServiceId }) => {
  // Get serviceId from URL params if not provided as prop
  const params = useParams()
  const serviceId = propServiceId || (params?.id as string)
  
  // State to track if serviceId is valid
  const [isValidServiceId, setIsValidServiceId] = useState(false)
  
  // Validate serviceId is a valid UUID
  useEffect(() => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!serviceId) {
      console.error("No serviceId provided");
      setIsValidServiceId(false);
      return;
    }
    
    const isValid = uuidRegex.test(serviceId);
    setIsValidServiceId(isValid);
    
    if (!isValid) {
      console.error(`Invalid serviceId format: ${serviceId}`);
    }
  }, [serviceId]);
  
  // Load existing sections
  const { isLoading, sections: initialSections, hasSections } = useLoadServiceSections({ 
    serviceId: isValidServiceId ? serviceId : undefined 
  })
  
  // State to track sections being edited
  const [sections, setSections] = useState<Section[]>([])
  
  // Initialize sections when loaded
  useEffect(() => {
    if (initialSections.length > 0) {
      setSections(initialSections)
    }
  }, [initialSections])
  
  // Publishing functionality
  const { 
    publishSections, 
    isPublishing,
    uploadProgress
  } = usePublishSections(serviceId)
  
  // Handle publish button click
  const handlePublish = async () => {
    if (!serviceId || !isValidServiceId) {
      console.error("Invalid service ID. Cannot publish sections.");
      return;
    }
    
    try {
      const result = await publishSections({
        sections
      });
      
      console.log(`Published ${result.processedSections} sections with ${result.uploadedMedia} media files`);
    } catch (error) {
      console.error("Failed to publish sections:", error);
    }
  }
  
  // Example of how you would add a new section
  const addSection = () => {
    const newSection: Section = {
      id: `temp-${Date.now()}`,
      title: "New Section",
      layout: "one_column",
      isActive: true,
      columns: [
        {
          id: `temp-column-${Date.now()}`,
          type: "text",
          content: { 
            title: "Sample Title", 
            description: "This is a sample text content that will be displayed in the text column." 
          },
          columnOrder: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setSections([...sections, newSection])
  }
  
  if (!serviceId || !isValidServiceId) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-500 font-medium">Invalid Service ID</p>
          <p className="text-sm text-muted-foreground mt-2">
            The service ID must be a valid UUID format.<br />
            Current value: {serviceId || "Not provided"}
          </p>
        </div>
      </div>
    )
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading sections...</span>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service Sections</h2>
        <div className="space-x-2">
          <Button onClick={addSection} variant="outline">
            Add Section
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing || sections.length === 0}
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {uploadProgress.current || "Publishing..."}
              </>
            ) : (
              "Publish Sections"
            )}
          </Button>
        </div>
      </div>
      
      {/* Here you would render your section editor components */}
      <div className="space-y-4">
        {sections.length === 0 ? (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No sections yet. Click "Add Section" to create your first section.</p>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.id} className="border rounded-md p-4">
              <h3 className="font-medium">{section.title}</h3>
              <p className="text-sm text-muted-foreground">
                Layout: {section.layout} | 
                Status: {section.isActive ? "Active" : "Inactive"} | 
                Columns: {section.columns?.length || 0}
              </p>
              {/* Here you would render your column editor components */}
            </div>
          ))
        )}
      </div>
    </div>
  )
} 