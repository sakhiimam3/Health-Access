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

// Custom hook for POST/PUT/DELETE requests
export function useApiMutation<TData, TVariables>(endpoint: string, method: 'POST' | 'PUT' | 'DELETE' = 'POST') {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await api({
        method,
        url: endpoint,
        data: variables,
      });
      return response.data;
    },
  });
}