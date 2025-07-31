"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Type,
  ImageIcon,
  Video,
  Columns2,
  Grid3X3,
  Grid2X2,
  Save,
  Loader2,
} from "lucide-react";
import type {
  Section,
  Column,
  SidebarItem as SidebarItemType,
} from "@/lib/cms/cms-type";
import { Sidebar } from "@/components/partnerDashbaord/cms/sidebar/sidebar";
import { SectionCard } from "@/components/partnerDashbaord/cms/content/section-card";
import { EmptyState } from "@/components/partnerDashbaord/cms/content/empty-state";
import { PreviewMode } from "@/components/partnerDashbaord/cms/content/preview-mode";
import { EditorModal } from "@/components/partnerDashbaord/cms/modals/editor-modal";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  generateId,
} from "@/lib/cms/cms-utils";
// import { usePublishSections } from "@/components/admin/cms/use-publish-sections";
import { toast } from "react-toastify";
import { useGetServiceSections, useCreateServiceSection, useUpload, useUploadVedio } from "@/lib/hooks";
import { updateServiceSection, deleteServiceSection, deleteServiceSectionColumn } from "@/lib/api/service-sections-api";

// Map frontend layout to backend layout
const mapLayout = (layout: Section['layout']) => {
  switch (layout) {
    case 'one_column':
      return 'one_column';
    case 'two_column':
      return 'two_column';
    case 'three_column':
      return 'two_by_two_column';
    case 'four_column':
      return 'three_by_three_column';
    default:
      return 'one_column';
  }
};

export const getToken = () => {
  if (typeof window === 'undefined') return '';
  const userStr = localStorage.getItem('health_access_user');
  if (!userStr) return '';
  try {
    const userObj = JSON.parse(userStr);
    return userObj.token || '';
  } catch {
    return '';
  }
};

// Add local type to allow File for content
import type { Column as BaseColumn, Section as BaseSection } from "@/lib/cms/cms-type";
type ColumnWithFile = Omit<BaseColumn, 'content'> & { content: BaseColumn['content'] | File };
type SectionWithFile = Omit<BaseSection, 'columns'> & { columns: ColumnWithFile[] };

const CmsBuilder = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  
  // API mutations
  const createSectionMutation = useCreateServiceSection(params.id as string);
  const uploadMediaMutation = useUpload();
  const uploadVideoMutation = useUploadVedio();

  // Fetch service sections
  const { data: serviceSectionsData, isLoading, refetch } = useGetServiceSections(params?.id as string || "");

  // Initialize sections state with fetched data or empty array
  const [sections, setSections] = useState<Section[]>([]);
  const [pendingSection, setPendingSection] = useState<Section | null>(null);
  const [selectedFileForUpload, setSelectedFileForUpload] = useState<File | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSavingAdminCms, setIsSavingAdminCms] = useState(false);
  const [hasUserSavedAdminCms, setHasUserSavedAdminCms] = useState(false);
  const [isDeletingColumn, setIsDeletingColumn] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<{sectionId: string, columnId: string} | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingSection, setIsSavingSection] = useState(false);
  const [savingSectionId, setSavingSectionId] = useState<string | null>(null);
  
  // Add state to track all selected files
  const [pendingUploads, setPendingUploads] = useState<Array<{
    file: File;
    sectionId: string;
    columnId: string;
    type: "image" | "video";
  }>>([]);

  // Helper function to ensure section has the correct types
  const validateSection = (section: any): Section => {
    // Validate the layout
    let layout: Section["layout"] = "one_column";
    if (section.layout === "one_column" || 
        section.layout === "two_column" || 
        section.layout === "three_column" || 
        section.layout === "four_column") {
      layout = section.layout;
    } else if (section.layout === 'two_by_two_column') {
      layout = "three_column";
    } else if (section.layout === 'three_by_three_column') {
      layout = "four_column";
    }
    
    // Validate columns
    const columns = section.columns.map((column: any) => {
      // Validate column type
      let type: "text" | "image" | "video" | "list" = "text";
      if (column.type === "text" || column.type === "image" || 
          column.type === "video" || column.type === "list") {
        type = column.type;
      }
      
      return {
        id: column.id || generateId(),
        type,
        content: column.content,
        columnOrder: column.columnOrder,
        isActive: column.isActive,
        createdAt: column.createdAt || new Date().toISOString(),
        updatedAt: column.updatedAt || new Date().toISOString()
      };
    });
    
    // Return validated section
    return {
      id: section.id,
      title: section.title,
      layout,
      isActive: section.isActive,
      columns,
      createdAt: section.createdAt,
      updatedAt: section.updatedAt
    };
  };

  // Update sections when data is fetched
  useEffect(() => {
    if (serviceSectionsData) {
      const mappedSections = serviceSectionsData?.data?.map(section => validateSection(section));
      setSections(mappedSections);
      
      // Check if user has any sections (if there are sections but user hasn't saved admin CMS yet)
      if (mappedSections.length > 0) {
        // You can add logic here to determine if these are admin sections or user sections
        // For now, we'll assume if there are sections, user might want to save admin CMS
        setHasUserSavedAdminCms(false);
      }
    }
  }, [serviceSectionsData]);

  // Reset temporary state when the component mounts
  useEffect(() => {
    console.log("Component mounted or data changed - resetting temporary state");
    
    // Clear temporary state
    setSelectedFileForUpload(null);
    setPreviewFile(null);
    setEditingColumn(null);
    setEditingSection(null);
    setPendingUploads([]);
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingSection, setEditingSection] = useState<SectionWithFile | null>(null);
  const [editingColumn, setEditingColumn] = useState<ColumnWithFile | null>(null);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const sidebarItems: SidebarItemType[] = [
    { icon: Type, label: "Text", type: "text", category: "content" },
    { icon: ImageIcon, label: "Image", type: "image", category: "content" },
    { icon: Video, label: "Video", type: "video", category: "content" },
    {
      icon: Columns2,
      label: "2 Column Block",
      type: "two_column",
      category: "layout",
    },
    {
      icon: Grid2X2,
      label: "2x2 Grid Block",
      type: "three_column",
      category: "layout",
    },
    {
      icon: Grid3X3,
      label: "3x3 Grid Block",
      type: "four_column",
      category: "layout",
    },
  ];

  // Handle media upload with progress
  const handleMediaUpload = async (file: File, type: "image" | "video") => {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);
      
      let result;
      if (type === "video") {
        // Validate video file
        if (!file.type.startsWith('video/')) {
          throw new Error("Invalid file type. Please upload a video file.");
        }
        
        // Check video file size (e.g., 100MB limit)
        if (file.size > 100 * 1024 * 1024) {
          throw new Error("Video file size must be less than 100MB");
        }
        
        result = await uploadVideoMutation.mutateAsync(formData);
        console.log("Video upload response:", result); // Debug log
      } else {
        // Validate image file
        if (!file.type.startsWith('image/')) {
          throw new Error("Invalid file type. Please upload an image file.");
        }
        
        // Check image file size (e.g., 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Image file size must be less than 5MB");
        }
        
        result = await uploadMediaMutation.mutateAsync(formData);
      }
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Get the URL from the response
      const url = result?.data?.url || result?.url;
      if (!url) {
        console.error("Upload response:", result); // Debug log
        throw new Error("Invalid upload response format - URL not found");
      }

      console.log("Uploaded URL:", url); // Debug log

      // Update the preview with the actual URL
      setPreviewFile(url);
      
      // If we have an editing column, update its content
      if (editingColumn) {
        setEditingColumn({
          ...editingColumn,
          content: url
        });
      }

      return url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle column delete
  const handleDeleteColumn = async (sectionId: string, columnId: string) => {
    try {
      setIsDeletingColumn(true);
      const serviceId = params.id as string;
      const token = getToken();

      await deleteServiceSectionColumn(serviceId, sectionId, columnId, token);
      
      // Invalidate and refetch the data
      await queryClient.invalidateQueries({ 
        queryKey: [`/v1/api/services/partner/${params.id}/sections`] 
      });
      await refetch();
      toast.success("Column deleted successfully");
    } catch (error) {
      console.error("Delete column error:", error);
      toast.error("Failed to delete column");
    } finally {
      setIsDeletingColumn(false);
      setColumnToDelete(null);
    }
  };

  // Handle section save (create or update)
  const handleSaveSection = async (section: SectionWithFile) => {
    try {
      setIsSavingSection(true);
      setSavingSectionId(section.id);
      
      const processedColumns = await Promise.all(
        section.columns.map(async (column) => {
          if ((column.type === "image" || column.type === "video") && column.content instanceof File) {
            const url = await handleMediaUpload(column.content, column.type);
            return { 
              ...column, 
              content: JSON.stringify({ src: url }) // Always stringified JSON for image/video
            } as BaseColumn;
          } else if ((column.type === "image" || column.type === "video") && typeof column.content === 'string') {
            return {
              ...column,
              content: JSON.stringify({ src: column.content })
            } as BaseColumn;
          } else if ((column.type === "image" || column.type === "video") && typeof column.content === 'object' && column.content && 'src' in column.content) {
            return {
              ...column,
              content: JSON.stringify({ src: (column.content as any).src })
            } as BaseColumn;
          } else if (column.type === 'text' || column.type === 'list') {
            // Handle text content - ensure it's a string
            let textContent = "";
            if (typeof column.content === 'string') {
              textContent = column.content;
            } else if (typeof column.content === 'object' && column.content !== null) {
              // If it's an object, try to extract text from common properties
              textContent = (column.content as any).text || (column.content as any).content || "";
            }
            return {
              ...column,
              content: textContent
            } as BaseColumn;
          }
          return column as BaseColumn;
        })
      );
      const sectionToSave = {
        ...section,
        columns: processedColumns
      };
      const isNewSection = !section.id || section.id.startsWith('temp_') || pendingSection?.id === section.id;
      if (isNewSection) {
        const mappedLayout = mapLayout(sectionToSave.layout) as "one_column" | "two_column" | "two_by_two_column" | "three_by_three_column";
        
        // Use mutateAsync with proper error handling and cache invalidation
        await createSectionMutation.mutateAsync({
          title: sectionToSave.title,
          layout: mappedLayout,
          columns: sectionToSave.columns.map(col => ({
            type: col.type,
            content: (col.type === 'image' || col.type === 'video')
              ? (typeof col.content === 'string'
                  ? col.content
                  : JSON.stringify({ src: (col.content as any).src || col.content }))
              : (typeof col.content === 'string' ? col.content : String(col.content || '')),
            columnOrder: col.columnOrder,
            isActive: col.isActive
          }))
        });
        
        // Clear pending section state
        setPendingSection(null);
        
        // Invalidate and refetch the data
        await queryClient.invalidateQueries({ 
          queryKey: [`/v1/api/services/partner/${params.id}/sections`] 
        });
        await refetch();
       
        toast.success("Section created successfully");
      } else {
        const serviceId = params.id as string;
        const sectionId = section.id;
        const token = getToken();
        const mappedLayout = mapLayout(sectionToSave.layout) as "one_column" | "two_column" | "two_by_two_column" | "three_by_three_column";
        const payload = {
          title: sectionToSave.title,
          layout: mappedLayout,
          isActive: sectionToSave.isActive,
          columns: sectionToSave.columns.map(col => ({
            type: col.type,
            content: (col.type === 'image' || col.type === 'video')
              ? (typeof col.content === 'string'
                  ? col.content
                  : JSON.stringify({ src: (col.content as any).src || col.content }))
              : (typeof col.content === 'string' ? col.content : String(col.content || '')),
            columnOrder: col.columnOrder,
            isActive: col.isActive
          }))
        };
        await updateServiceSection(serviceId, sectionId, payload, token);
        
        // Invalidate and refetch the data
        await queryClient.invalidateQueries({ 
          queryKey: [`/v1/api/services/partner/${params.id}/sections`] 
        });
        await refetch();
        toast.success("Section updated successfully");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save section");
    } finally {
      setIsSavingSection(false);
      setSavingSectionId(null);
    }
  };

  // Handle section delete
  const handleDeleteSection = async (sectionId: string) => {
    try {
      setIsDeleting(true);
      const serviceId = params.id as string;
      const token = getToken();

      await deleteServiceSection(serviceId, sectionId, token);
      
      // Invalidate and refetch the data
      await queryClient.invalidateQueries({ 
        queryKey: [`/v1/api/services/partner/${params.id}/sections`] 
      });
      await refetch();
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete section");
    } finally {
      setIsDeleting(false);
      setSectionToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSidebarClick = (item: SidebarItemType) => {
    if (!editMode) return;

    // Handle content types (text, image, video)
    if (
      item.type === "text" ||
      item.type === "image" ||
      item.type === "video"
    ) {
      let content = "";
      // Set default content for text type
      if (item.type === "text") {
        content = "";
      }
      const newSection: SectionWithFile = {
        id: `temp_${generateId()}`, // Use temp prefix to identify new sections
        title: `${item.label} Section`,
        layout: "one_column",
        isActive: true,
        columns: [
          {
            id: generateId(),
            type: item.type,
            content: content,
            columnOrder: 1,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPendingSection(newSection as any);
      setEditingSection(newSection);
      setEditingColumn(newSection.columns[0]);
      setModalType("section");
      setPreviewFile(null);
      setSelectedFileForUpload(null);
      setIsModalOpen(true);
    } 
    // Handle layout types
    else if (
      item.type === "two_column" ||
      item.type === "three_column" ||
      item.type === "four_column"
    ) {
      // Create a new section with NO columns by default
      const layoutType = item.type as "two_column" | "three_column" | "four_column";
      const newSection: SectionWithFile = {
        id: `temp_${generateId()}`, // Use temp prefix to identify new sections
        title: `${item.label} Section`,
        layout: layoutType,
        isActive: true,
        columns: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setPendingSection(newSection as any);
      setEditingSection(newSection);
      setModalType("section");
      setIsModalOpen(true);
    }
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section as SectionWithFile);
    setModalType("section");
    setIsModalOpen(true);
  };

  // File upload handler for the modal
  const handleModalFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !editingColumn || !editingSection) return;
    const updatedColumn: ColumnWithFile = {
      ...editingColumn,
      content: file
    };
    setEditingColumn(updatedColumn);
    if (editingSection) {
      const updatedColumns = editingSection.columns.map(col =>
        col.id === editingColumn.id ? updatedColumn : col
      );
      setEditingSection({
        ...editingSection,
        columns: updatedColumns
      });
    }
    setSelectedFileForUpload(file);

    // Show preview before uploading
    if (previewFile) {
      // Clean up previous object URL
      URL.revokeObjectURL(previewFile);
    }
    setPreviewFile(URL.createObjectURL(file));
  };

  // Clean up previewFile object URL when modal closes or file changes
  useEffect(() => {
    return () => {
      if (previewFile) {
        URL.revokeObjectURL(previewFile);
      }
    };
  }, [previewFile, isModalOpen]);

  // Handle saving all admin CMS sections as user's own sections
  const handleSaveAdminCms = async () => {
    if (!sections.length) return;
    
    try {
      setIsSavingAdminCms(true);
      
      // Save all current sections as new user sections sequentially
      for (const section of sections) {
        const mappedLayout = mapLayout(section.layout) as "one_column" | "two_column" | "two_by_two_column" | "three_by_three_column";
        const sectionToSave = {
          title: section.title,
          layout: mappedLayout,
          columns: section.columns.map(col => ({
            type: col.type,
            content: (col.type === 'image' || col.type === 'video')
              ? (typeof col.content === 'string'
                  ? col.content
                  : JSON.stringify({ src: (col.content as any).src || col.content }))
              : (typeof col.content === 'string' ? col.content : String(col.content || '')),
            columnOrder: col.columnOrder,
            isActive: col.isActive
          }))
        };
        
        // Use mutateAsync for better error handling
        await createSectionMutation.mutateAsync(sectionToSave);
      }
      
      // Mark that user has saved admin CMS
      setHasUserSavedAdminCms(true);
      
      // Invalidate and refetch to get the updated data
      await queryClient.invalidateQueries({ 
        queryKey: [`/v1/api/services/partner/${params.id}/sections`] 
      });
      await refetch();
      toast.success("Admin CMS data saved successfully! You can now edit these sections.");
      
    } catch (error) {
      console.error("Save admin CMS error:", error);
      toast.error("Failed to save admin CMS data");
    } finally {
      setIsSavingAdminCms(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sections...</p>
        </div>
      </div>
    );
  }

  if (previewMode) {
    return (
      <PreviewMode
        sections={sections}
        onExitPreview={() => setPreviewMode(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          sidebarItems={sidebarItems}
          editMode={editMode}
          onSidebarItemClick={handleSidebarClick}
          onPreviewClick={() => setPreviewMode(true)}
          onEditModeToggle={() => setEditMode(!editMode)}
          onPublishClick={() => {}}
        />

        <div className="flex-1 p-8">
          <div className="mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Content Management System
                </h1>
                <p className="text-gray-600">
                  {sections.length > 0 && !hasUserSavedAdminCms 
                    ? "Admin template sections loaded. Save them to make them yours, or start creating new sections."
                    : "Build your content by adding sections from the sidebar"
                  }
                </p>
              </div>
              
              {/* Save Admin CMS Button - Show when there are sections and user hasn't saved admin CMS yet */}
              {sections.length > 0 && !hasUserSavedAdminCms && (
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={handleSaveAdminCms}
                    disabled={isSavingAdminCms}
                    className="flex items-center gap-2 px-4 py-2 bg-[green] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    {isSavingAdminCms ? "Saving..." : "Save Admin CMS"}
                  </button>
                  <p className="text-xs text-gray-500 text-right max-w-48">
                    Save admin sections to your service and make them editable
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-8">
              {/* Loading Overlay for entire render area */}
              {(isSavingSection || isDeleting || isSavingAdminCms) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="text-lg font-medium">
                      {isSavingSection ? "Saving section..." : 
                       isDeleting ? "Deleting section..." : 
                       isSavingAdminCms ? "Saving admin CMS..." : "Processing..."}
                    </span>
                  </div>
                </div>
              )}
              
              {sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  editMode={editMode}
                  isDragged={draggedSection === section.id}
                  onDragStart={(e: React.DragEvent) => {
                    setDraggedSection(section.id);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(e: React.DragEvent) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                  }}
                  onDrop={(e: React.DragEvent) => {
                    e.preventDefault();
                    if (!draggedSection || draggedSection === section.id)
                      return;

                    const draggedIndex = sections.findIndex(
                      (s) => s.id === draggedSection
                    );
                    const targetIndex = sections.findIndex(
                      (s) => s.id === section.id
                    );

                    const newSections = [...sections];
                    const [draggedItem] = newSections.splice(draggedIndex, 1);
                    newSections.splice(targetIndex, 0, draggedItem);

                    setSections(newSections);
                    setDraggedSection(null);
                  }}
                  onEditSection={handleEditSection}
                  onEditColumn={(section, columnId) => {
                    const column = section.columns.find(
                      (c) => c.id === columnId
                    );
                    if (!column) return;

                    setEditingSection(section as SectionWithFile);
                    setEditingColumn(column as ColumnWithFile);
                    setModalType("column");
                    
                    // Handle preview for image/video content
                    if (column.type === "image" || column.type === "video") {
                      try {
                        const content = typeof column.content === 'string' ? JSON.parse(column.content as string) : column.content;
                        if (content && content.src) {
                          setPreviewFile(content.src);
                        }
                      } catch (e) {
                        if (typeof column.content === "string" && 
                            (column.content.startsWith("http") || column.content.startsWith("/"))) {
                          setPreviewFile(column.content);
                        }
                      }
                    } else {
                      setPreviewFile(null);
                    }
                    
                    setSelectedFileForUpload(null);
                    setIsModalOpen(true);
                  }}
                  onDeleteSection={(sectionId: string) => {
                    setSectionToDelete(sectionId);
                    setIsDeleteModalOpen(true);
                  }}
                  onDeleteColumn={(sectionId: string, columnId: string) => {
                    setColumnToDelete({ sectionId, columnId });
                    handleDeleteColumn(sectionId, columnId);
                  }}
                  isDeletingColumn={isDeletingColumn}
                  columnToDelete={columnToDelete}
                  isSavingSection={isSavingSection}
                  savingSectionId={savingSectionId}
                  isDeleting={isDeleting}
                  sectionToDelete={sectionToDelete}
                />
              ))}

              {sections.length === 0 && <EmptyState />}
            </div>
          </div>
        </div>
      </div>

      <EditorModal
        isOpen={isModalOpen}
        modalType={modalType}
        editingSection={editingSection as unknown as Section}
        editingColumn={editingColumn as unknown as Column}
        previewFile={previewFile}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSection(null);
          setEditingColumn(null);
          setPreviewFile(null);
          setSelectedFileForUpload(null);
          setPendingSection(null);
        }}
        onSaveSection={() => {
          if (editingSection) {
            handleSaveSection(editingSection);
          }
          setIsModalOpen(false);
          setEditingColumn(null);
          setEditingSection(null);
          setPreviewFile(null);
          setSelectedFileForUpload(null);
          setPendingSection(null);
        }}
        onSaveColumn={() => {
          setModalType("section");
          setEditingColumn(null);
          setPreviewFile(null);
          setSelectedFileForUpload(null);
        }}
        onSectionChange={section => setEditingSection(section as SectionWithFile)}
        onColumnChange={column => {
          setEditingColumn(column as ColumnWithFile);
          // Also update the section with the modified column
          if (editingSection) {
            const updatedColumns = editingSection.columns.map(col =>
              col.id === column.id ? column : col
            );
            setEditingSection({
              ...editingSection,
              columns: updatedColumns as ColumnWithFile[]
            });
          }
        }}
        onEditColumn={(section: Section, columnId: string) => {
          const column = (section.columns as ColumnWithFile[]).find(
            (c) => c.id === columnId
          );
          if (!column) return;
          setEditingSection(section as SectionWithFile);
          setEditingColumn(column);
          setModalType("column");
          if (column.type === "image" || column.type === "video") {
            try {
              const content = typeof column.content === 'string' ? JSON.parse(column.content as string) : column.content;
              if (content && content.src) {
                setPreviewFile(content.src);
              }
            } catch (e) {
              if (typeof column.content === "string" && 
                  (column.content.startsWith("http") || column.content.startsWith("/"))) {
                setPreviewFile(column.content);
              }
            }
          } else {
            setPreviewFile(null);
          }
          setSelectedFileForUpload(null);
          setIsModalOpen(true);
        }}
        onFileUpload={handleModalFileUpload}
      />

      <AlertDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Delete Section"
        description="Are you sure you want to delete this section? This action cannot be undone."
        cancelText="Cancel"
        actionText={isDeleting ? "Deleting..." : "Delete"}
        loading={isDeleting}
        onCancel={() => setIsDeleteModalOpen(false)}
        onAction={() => handleDeleteSection(sectionToDelete)}
      />
    </div>
  );
};

export default CmsBuilder;
