import axios from "axios";

export const updateServiceSection = async (serviceId: string, sectionId: string, payload: any, token: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/services/partner/${serviceId}/sections/${sectionId}`;
  const response = await axios.put(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteServiceSection = async (serviceId: string, sectionId: string, token: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/services/partner/${serviceId}/sections/${sectionId}`;
  console.log("url", url);
  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 