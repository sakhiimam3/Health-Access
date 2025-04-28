import { useQuery, useMutation } from '@tanstack/react-query';
import api from './axios'; 

// Custom hook for GET requests
export function useApiQuery<T>(endpoint: string) {
  return useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: async () => {
      const response = await api.get<T>(endpoint); 
      return response.data;
    },
  });
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