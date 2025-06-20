"use client"

import { useState, useEffect } from "react"
import { getServiceSections } from "@/lib/api"
import type { Section } from "@/types/cmstype"
import type { ServiceSection } from "@/lib/api"

// Helper function to map backend layout to frontend layout
const mapBackendLayoutToFrontend = (layout: ServiceSection['layout']): Section['layout'] => {
  switch (layout) {
    case 'one_column':
      return 'one_column';
    case 'two_column':
      return 'two_column';
    case 'two_by_two_column': // Backend '2x2 grid'
      return 'three_column';
    case 'three_by_three_column': // Backend '3x3 grid'
      return 'four_column';
    default:
      console.error(`Unknown backend layout: ${layout}`);
      return 'one_column';
  }
};

interface UseLoadServiceSectionsParams {
  serviceId?: string
}

export const useLoadServiceSections = ({ serviceId }: UseLoadServiceSectionsParams) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    const loadSections = async () => {
      if (!serviceId) {
        setSections([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await getServiceSections({ serviceId })
        
        if (!response || !response.items || response.items.length === 0) {
          setSections([])
          return
        }

        // Transform backend service sections to frontend sections format
        const frontendSections: Section[] = response.items.map(backendSection => {
          // Parse column content from string to object
          const columns = backendSection.columns?.map(column => {
            let parsedContent;
            
            if (column.type === "image" || column.type === "video") {
              // For image and video, the content is just a URL string
              try {
                // Try to parse in case it's a JSON string
                const parsed = JSON.parse(column.content);
                // If it parsed successfully and has src, use that
                if (parsed && typeof parsed === 'object' && parsed.src) {
                  parsedContent = { src: parsed.src };
                } else {
                  // Otherwise use the content directly as src
                  parsedContent = { src: column.content };
                }
              } catch (e) {
                // If parsing failed, it's likely a direct URL string
                parsedContent = { src: column.content };
              }
            } else if (column.type === "text") {
              // For text columns, ensure we have proper text content structure
              try {
                const parsed = JSON.parse(column.content);
                if (parsed && typeof parsed === 'object') {
                  // Use the parsed object with fallbacks for title and description
                  parsedContent = {
                    title: parsed.title || "",
                    description: parsed.description || parsed.text || ""
                  };
                } else {
                  // If parsed but not an object, use as description
                  parsedContent = { 
                    title: "",
                    description: String(parsed) 
                  };
                }
              } catch (e) {
                // If parsing failed, use raw content as description
                parsedContent = { 
                  title: "",
                  description: column.content 
                };
              }
            } else {
              // For other types (list), parse the JSON content
              try {
                parsedContent = JSON.parse(column.content);
              } catch (e) {
                console.error(`Failed to parse column content for column ${column.columnOrder}:`, e);
                parsedContent = { items: [] };
              }
            }

            return {
              id: column.id || `temp-${column.columnOrder}`,
              type: column.type,
              content: parsedContent,
              columnOrder: column.columnOrder,
              isActive: column.isActive,
              createdAt: column.createdAt || new Date().toISOString(),
              updatedAt: column.updatedAt || new Date().toISOString()
            }
          }) || []

          return {
            id: backendSection.id,
            title: backendSection.title,
            layout: mapBackendLayoutToFrontend(backendSection.layout),
            isActive: backendSection.isActive,
            columns: columns,
            createdAt: backendSection.createdAt,
            updatedAt: backendSection.updatedAt
          }
        })

        setSections(frontendSections)
      } catch (err) {
        console.error("Failed to load service sections:", err)
        setError(err instanceof Error ? err : new Error('Failed to load service sections'))
        setSections([])
      } finally {
        setIsLoading(false)
      }
    }

    loadSections()
  }, [serviceId])

  return {
    isLoading,
    error,
    sections,
    hasSections: sections.length > 0
  }
} 