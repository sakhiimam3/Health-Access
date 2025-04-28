import { useApiQuery,useApiMutation } from '@/lib/useApiQuery';
import { createPartnerCreate, User, userCreate } from '@/lib/type';
import { ForgotPasswordForm, LoginFormValues, ResetPasswordForm } from './schema';

export const useGetUser =() => {
    const { data, isLoading, error } = useApiQuery<User>('/api/user/123');
    return { data, isLoading, error };
}


export const useCreateUser = () => {
    const { mutate, isPending, error } = useApiMutation<User, userCreate>('/api/create', 'POST');
    return { mutate, isPending, error };
  };

  export const useCreatePartner = () => {
    const { mutate, isPending, error } = useApiMutation<User, createPartnerCreate>('/v1/api/auth/partner/register', 'POST');
    return { mutate, isPending, error };
  };

export const useLoginPartner = () => {
    const { mutate, isPending, error } = useApiMutation<User, LoginFormValues>('/v1/api/auth/partner/login', 'POST');
    return { mutate, isPending, error };
};

// export const useResetPassword = () => {
//     const { mutate, isPending, error } = useApiMutation<void, ResetPasswordForm>('/v1/api/auth/reset-password', 'POST');
//     return { mutate, isPending, error };
// };

export const useResetPasswordPartner = () => {
    const { mutate, isPending, error } = useApiMutation<void, ResetPasswordForm>('/v1/api/auth/partner/password/reset', 'POST');
    return { mutate, isPending, error };
};

export const  useRequestResetPartner = () => {
    const { mutate, isPending, error } = useApiMutation<void, ForgotPasswordForm>('/v1/api/auth/partner/password/request-reset', 'POST');
    return { mutate, isPending, error };
};

