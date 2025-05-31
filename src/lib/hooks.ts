import { OTPForm, otpSchema, VerifyotpFORM } from "@/lib/schema";
import { useApiQuery, useApiMutation } from "@/lib/useApiQuery";
import { createPartnerCreate, getServicesParams, User, userCreate, GetServicesParamsType, PartnerOnboarding } from "@/lib/type";
import { ForgotPasswordForm, LoginFormValues } from "./schema";

export const useGetUser = () => {
  const { data, isLoading, error } = useApiQuery("/api/user/123");
  return { data, isLoading, error };
};

export const useCreateUser = () => {
  const { mutate, isPending, error } = useApiMutation<User, userCreate>(
    "/api/create",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useCreatePartner = () => {
  const { mutate, isPending, error } = useApiMutation<
    User,
    createPartnerCreate
  >("/v1/api/auth/partner/register", "POST");
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
    "/v1/api/auth/partner/password/request-reset",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useVerifyOTP = () => {
  const { mutate, isPending, error } = useApiMutation<void, OTPForm>(
    "/v1/api/auth/partner/password/reset",
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
  const { mutate, isPending, error } = useApiMutation<{ url: string }, FormData>(
    "/v1/api/media/upload",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useGetPartners = () => {
  const { data, isLoading, error, refetch } = useApiQuery("/v1/api/partners");
  return { data, isLoading, error, refetch };
};

export const usePartnerOnboarding = () => {
  const { mutate, isPending, error } = useApiMutation<User, PartnerOnboarding>(
    "/v1/api/partners/onboarding",
    "POST"
  );
  return { mutate, isPending, error };
};

export const useGetServices = (params?: Partial<GetServicesParamsType>) => {
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
    "/v1/api/auth/partner/password/change",
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

