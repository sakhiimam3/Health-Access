import { OTPForm, otpSchema, VerifyotpFORM } from "@/lib/schema";
import { useApiQuery, useApiMutation } from "@/lib/useApiQuery";
import { User, PartnerProfile, UpdatePartnerProfile, UserCreate, CreatePartnerCreate, GetServicesParams, PartnerOnboarding, UpdatePartnerServices } from "@/lib/type";
import { ForgotPasswordForm, LoginFormValues } from "./schema";
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

export interface CustomerRegisterPayload {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notificationToken: string;
  password: string;
}

export function useCustomerRegister() {
  return useMutation({
    mutationFn: async (payload: CustomerRegisterPayload) => {
      const { data } = await axios.post("/v1/api/auth/customer/register", payload);
      return data;
    },
  });
}

export const useGetUser = () => {
  const { data, isLoading, error } = useApiQuery("/api/user/123");
  return { data, isLoading, error };
};

export const useCreateUser = () => {
  const { mutate, isPending, error } = useApiMutation<User, UserCreate>(
    "/api/create",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useCreatePartner = () => {
  const { mutate, isPending, error } = useApiMutation<User, CreatePartnerCreate>(
    "/v1/api/auth/partner/register",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useLogin = () => {
  const { mutate, isPending, error } = useApiMutation<User, LoginFormValues>(
    "/v1/api/auth/login",
    "POST"
  );
  return { mutate, isPending, error };
};

// export const useResetPassword = () => {
//     const { mutate, isPending, error } = useApiMutation<void, ResetPasswordForm>('/v1/api/auth/reset-password', 'POST');
//     return { mutate, isPending, error };
// };

// export const useResetPasswordPartner = () => {
//     const { mutate, isPending, error } = useApiMutation<void, ResetPasswordForm>('/v1/api/auth/partner/password/reset', 'POST');
//     return { mutate, isPending, error };
// };

export const useRequestResetPartner = () => {
  const { mutate, isPending, error } = useApiMutation<void, ForgotPasswordForm>(
    "/v1/api/auth/password/request-reset",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useVerifyOTP = () => {
  const { mutate, isPending, error } = useApiMutation<void, OTPForm>(
    "/v1/api/auth/password/reset",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useUserVerifyOTP = (userId: string) => {
  const { mutate, isPending, error } = useApiMutation<void, { code: number }>(
    `/v1/api/auth/verify/${userId}`,
    "POST"
  );
  return { mutate, isPending, error };
};

export const useUpload = () => {
  const { mutate, mutateAsync, isPending, error } = useApiMutation<{ statusCode: number; message: string; data: { url: string } }, FormData>(
    "/v1/api/media/upload",
    "POST"
  );
  return { mutate, mutateAsync, isPending, error };
};

export const useUploadVedio = () => {
  const { mutate, mutateAsync, isPending, error } = useApiMutation<{ statusCode: number; message: string; data: { url: string } }, FormData>(
    "/v1/api/media/upload-video",
    "POST"
  );
  return { mutate, mutateAsync, isPending, error };
};

export const useGetPartners = () => {
  const { data, isLoading, error, refetch } = useApiQuery("/v1/api/public/partners");
  return { data, isLoading, error, refetch };
};

export const usePartnerOnboarding = () => {
  const { mutate, isPending, error } = useApiMutation<User, PartnerOnboarding>(
    "/v1/api/partners/onboarding",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useGetServices = (params?: Partial<GetServicesParams>) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/services",
    params: {
      ...params,

    }
  })
  return { data, isLoading, error, refetch }
}

export const useGetSeriveTypes = () => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/service-types",
  })
  return { data, isLoading, error, refetch }
}

export const useChangePassword = () => {
  const { mutate, isPending, error } = useApiMutation<void, { oldPassword: string; newPassword: string }>(
    "/v1/api/auth/password/change",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useCheckEmail = () => {
  const { mutate, isPending, error } = useApiMutation<void, { email: string }>(
    "/v1/api/auth/check-email",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useGetPartnerProfile = () => {
  const { data, isLoading, error, refetch } = useApiQuery("/v1/api/partners/my-profile");
  return { data, isLoading, error, refetch };
};

export const useGetMyServices = () => {
  const { data, isLoading, error, refetch } = useApiQuery("/v1/api/partners/my-selected-services");
  return { data, isLoading, error, refetch };
};

export const useUpdatePartnerProfile = () => {
  const { mutate, isPending, error } = useApiMutation<PartnerProfile, PartnerOnboarding>(
    `/v1/api/partners/`,
    "PATCH"
  );
  return { mutate, isPending, error };
};

export const useUpdatePharmacyTiming = (partnerId: string) => {
  const { mutate, isPending, error } = useApiMutation<void, {
    timings: Array<{
      dayOfWeek: string;
      openTime: string;
      closeTime: string;
      isClosed: boolean;
    }>
  }>(
    `/v1/api/partners/${partnerId}/timing`,
    "PATCH"
  );
  return { mutate, isPending, error };
};

export const useUpdatePartnerLocation = (partnerId: string) => {
  const { mutate, isPending, error } = useApiMutation<PartnerProfile, {
    location: {
      name: string;
      latitude: number;
      longitude: number;
    }
  }>(
    `/v1/api/partners/${partnerId}`,
    "PATCH"
  );
  return { mutate, isPending, error };
};

export const useGetPartnerServices = (params?: {
  page?: number;
  limit?: number;
  typeId?: string;
}) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/services/partner",
    params: {
      page: params?.page || 1,
      limit: params?.limit || 10,
      typeId: params?.typeId,
    }
  });
  return { data, isLoading, error, refetch };
};

export const useDeletePartnerService = (serviceId: string) => {
  const { mutate, isPending, error } = useApiMutation<void, void>(
    `/v1/api/services/partner/${serviceId}`,
    "DELETE"
  );
  return { mutate, isPending, error };
};

export const useCreateUpdatePartnerService = (serviceId?: string) => {
  const { mutate, isPending, error } = useApiMutation<void, {
    price: number;
    description: string;
    isActive: boolean;
    image: string;
    serviceId?: string;
  }>(
    serviceId ? `/v1/api/services/partner/${serviceId}` : "/v1/api/services/partner",
    serviceId ? "PUT" : "POST"
  );
  return { mutate, isPending, error };
};

export const useGetPartnerServiceDetails = (serviceId: string) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/services/partner/${serviceId}`,
  });
  return { data, isLoading, error, refetch };
};

// Types for service sections
interface ServiceSectionColumn {
  type: "text" | "image" | "video" | "list";
  content: string | { src: string };
  columnOrder: number;
  isActive: boolean;
}

interface ServiceSection {
  id?: string;
  layout: "one_column" | "two_column" | "three_column" | "two_by_two_column" | "three_by_three_column";
  title: string;
  isActive: boolean;
  columns: ServiceSectionColumn[];
}

interface CreateServiceSectionPayload {
  title: string;
  layout: ServiceSection['layout'];
  columns: ServiceSectionColumn[];
  isActive?: boolean;
}

interface UpdateServiceSectionPayload {
  title: string;
  layout: ServiceSection['layout'];
  isActive: boolean;
  columns: ServiceSectionColumn[];
}

// Get service sections
export const useGetServiceSections = (serviceId: string) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/services/partner/${serviceId}/sections`,
  });
  return { data, isLoading, error, refetch };
};

// Create service section
export const useCreateServiceSection = (serviceId: string) => {
  const { mutate, isPending, error } = useApiMutation<ServiceSection, CreateServiceSectionPayload>(
    `/v1/api/services/partner/${serviceId}/sections`,
    "POST"
  );
  return { mutate, isPending, error };
};

// Update service section
export const useUpdateServiceSection = (serviceId: string, sectionId: string) => {
  const { mutate, isPending, error } = useApiMutation<ServiceSection, UpdateServiceSectionPayload>(
    `/v1/api/services/partner/${serviceId}/sections/${sectionId}`,
    "PUT"
  );
  return { mutate, isPending, error };
};

// Delete service section
export const useDeleteServiceSection = (serviceId: string, sectionId: string) => {
  const { mutate, isPending, error } = useApiMutation<void, void>(
    `/v1/api/services/partner/${serviceId}/sections/${sectionId}`,
    "DELETE"
  );
  return { mutate, isPending, error };
};

export const useGetServiceContent = (serviceId: string) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/cms/service-content/${serviceId}`,
  });
  return { data, isLoading, error, refetch };
};

export const useGetAllBlogs = (params?: { page?: number; limit?: number }) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/blogs",
    params: {
      page: params?.page || 1,
      limit: params?.limit || 10,
    },
  });
  return { data, isLoading, error, refetch };
};

export const useGetFeaturedBlogs = () => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/admin/blogs/featured",
  });
  return { data, isLoading, error, refetch };
};

export const useGetPopularBlogs = (params?: { page?: number; limit?: number }) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/blogs/popular",
    params: {
      page: params?.page || 1,
      limit: params?.limit || 10,
    },
  });
  return { data, isLoading, error, refetch };
};

export const useGetBlogById = (slug: string) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/blogs/${slug}`,
  });
  return { data, isLoading, error, refetch };
};


export const useHomeServices = () => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/cms/home",
  });
  return { data, isLoading, error, refetch };
};

// Fetch available appointment slots for a partner on a specific date
export const useGetAvailableSlots = (partnerId: string, date: string, options = {}) => {
  console.log(partnerId, "data111", date);
  
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/appointments/available-slots/${partnerId}`,
    params: { date },
    ...options, 
  });
 
  return { data, isLoading, error, refetch };
};
// Fetch health questions for booking
export const useGetHealthQuestions = (category?: string) => {
  const { data, isLoading,error, refetch } = useApiQuery({
    endpoint: "/v1/api/appointments/health-questions",
    params: category ? { category } : undefined,
  });
  return { data, isLoading, error, refetch };
};

// Appointment booking mutation
export const useAppointmentMutation = () => {
  const { mutate, isPending, error } = useApiMutation<any, any>(
    "/v1/api/appointments",
    "POST"
  );
  return { mutate, isPending, error };
};

// Fetch upcoming appointments
export const useUpcomingAppointments = () => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/appointments/upcoming",
  });
  return { data, isLoading, error, refetch };
};

// Get partner services by ID
export const useGetPartnerServicesById = (partnerId: string, params?: { page?: number; limit?: number }) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/partners/${partnerId}/services`,
    params: {
      page: params?.page || 1,
      limit: params?.limit || 10,
    }
  });
  return { data, isLoading, error, refetch };
};

// Get partner services by ID (Public endpoint)
export const useGetPublicPartnerServices = (partnerId: string, params?: { page?: number; limit?: number; typeId?: string }) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/public/partners/${partnerId}`,
    params: {
      page: params?.page || 1,
      limit: params?.limit || 10,
      typeId: params?.typeId,
    }
  });
  return { data, isLoading, error, refetch };
};

// Get single partner by ID
export const useGetPartnerById = (partnerId: string) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/public/partners/${partnerId}`,
  });
  return { data, isLoading, error, refetch };
};

// Partner Appointments API hooks

// Fetch partner appointments list
export const useGetPartnerAppointments = (params?: {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  page?: number;
}) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: "/v1/api/partner/appointments",
    params: {
      status: params?.status,
      dateFrom: params?.dateFrom,
      dateTo: params?.dateTo,
      limit: params?.limit,
      page: params?.page,
    },
  });
  return { data, isLoading, error, refetch };
};

// Fetch partner appointment by ID
export const useGetPartnerAppointmentById = (id: string) => {
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: `/v1/api/partner/appointments/${id}`,
  });
  return { data, isLoading, error, refetch };
};

// Update partner appointment status
export const useUpdatePartnerAppointmentStatus = (id: string) => {
  const { mutate, isPending, error } = useApiMutation<any, { status: string }>(
    `/v1/api/partner/appointments/${id}/status`,
    "PUT"
  );
  return { mutate, isPending, error };
};


