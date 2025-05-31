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

type EndpointType = string | ((...args: any[]) => string);

export const useApiMutation = <T, D>(endpoint: EndpointType, method: string) => {
  const mutate = async (data: D, ...args: any[]) => {
    const url = typeof endpoint === 'function' ? endpoint(...args) : endpoint;
    const response = await api({
      method,
      url,
      data,
    });
    return response.data as T;
  };

  const { mutate: mutation, isPending, error } = useMutation({
    mutationFn: mutate,
  });

  return { mutate: mutation, isPending, error };
};