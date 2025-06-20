import { useQuery, useMutation } from '@tanstack/react-query';
import api from './axios'; 

interface QueryOptions {
  endpoint: string
  params?: Record<string, any>
}

// Custom hook for GET requests
export const useApiQuery = (options: string | QueryOptions) => {
  const endpoint = typeof options === "string" ? options : options.endpoint
  const params = typeof options === "string" ? undefined : options.params

  return useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const { data } = await api.get(endpoint, { params })
      return data
    }
  })
}

type EndpointType<D> = string | ((data: D) => string);

export const useApiMutation = <T, D>(endpoint: EndpointType<D>, method: string) => {
  const mutate = async (data: D) => {
    const url = typeof endpoint === 'function' ? endpoint(data) : endpoint;
    const response = await api({
      method,
      url,
      data,
    });
    return response.data as T;
  };

  const { mutate: mutation, mutateAsync, isPending, error } = useMutation({
    mutationFn: mutate,
  });

  return { mutate: mutation, mutateAsync, isPending, error };
};