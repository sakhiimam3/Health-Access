interface ServiceSection {
  id?: string
  layout: "one_column" | "two_column" | "three_column"
  title: string
  isActive: boolean
  columns: {
    type: "text" | "image" | "video"
    content: string
    columnOrder: number
    isActive: boolean
  }[]
}

export const getServiceSections = async (serviceId: string, sectionId: string) => {
  const response = await fetch(`/v1/api/services/partner/${serviceId}/sections${sectionId ? `/${sectionId}` : ''}`);
  return response.json();
};

export const createServiceSection = async (serviceId: string, section: ServiceSection) => {
  const response = await fetch(`/v1/api/services/partner/${serviceId}/sections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(section),
  });
  if (!response.ok) {
    throw new Error('Failed to create service section');
  }
  return response.json();
};

export const updateServiceSection = async (serviceId: string, sectionId: string, section: ServiceSection) => {
  const response = await fetch(`/v1/api/services/partner/${serviceId}/sections/${sectionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(section),
  });
  if (!response.ok) {
    throw new Error('Failed to update service section');
  }
  return response.json();
};

export const deleteServiceSection = async (serviceId: string, sectionId: string) => {
  const response = await fetch(`/v1/api/services/partner/${serviceId}/sections/${sectionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete service section');
  }
  return response.json();
}; 