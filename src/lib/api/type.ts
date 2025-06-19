export interface CreateServiceSectionPayload {
    title: string;
    layout: 'one_column' | 'two_column' | 'two_by_two_column' | 'three_by_three_column';
    serviceId: string;
    isActive?: boolean;
    columns: Array<{
      type: 'text' | 'image' | 'video' | 'list';
      content: string | { src: string }; // Allow both string and object content
      columnOrder: number;
      isActive: boolean;
    }>;
  }
  
  export interface UpdateServiceSectionPayload {
    title: string;
    layout: 'one_column' | 'two_column' | 'two_by_two_column' | 'three_column' | 'three_by_three_column';
    isActive: boolean;
    columns: Array<{
      type: 'text' | 'image' | 'video' | 'list';
      content: string; // Stringified JSON
      columnOrder: number;
      isActive: boolean;
    }>;
  }
  
  export interface ServiceSection {
    id: string;
    title: string;
    layout: 'one_column' | 'two_column' | 'two_by_two_column' | 'three_by_three_column';
    content: string; // Assuming section-level content is still part of the backend type but we won't send it in payload
    image: string; // Assuming section-level image is still part of the backend type
    video: string; // Assuming section-level video is still part of the backend type
    serviceId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    columns: Array<{
      id?: string; // Assuming id might be returned for existing columns
      type: 'text' | 'image' | 'video' | 'list';
      content: string | { src: string }; // Allow both string and object content
      columnOrder: number;
      isActive: boolean;
      createdAt?: string;
      updatedAt?: string;
    }>;
  }
  