import { getApiBaseUrl } from '../utils';

// Define response types for better error handling
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Helper function to create fetch with timeout
const fetchWithTimeout = (url: string, options: RequestInit = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timeout after ${timeout}ms`)), timeout)
    )
  ]);
};

export async function getHowItWorksData(): Promise<ApiResponse<any>> {
  try {
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/v1/api/cms/how-it-works`, 
      { 
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
      },
      10000 // 10 second timeout
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch How It Works data: ${res.status} ${res.statusText}`);
      return {
        success: false,
        error: `Server responded with ${res.status}: ${res.statusText}`,
      };
    }
    
    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching How It Works data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Provide more specific error messages
    if (errorMessage.includes('timeout')) {
      return {
        success: false,
        error: 'Request timed out - server may be slow or unavailable',
      };
    }
    
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      return {
        success: false,
        error: 'Network error - please check your internet connection',
      };
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getHomeServicesData(): Promise<ApiResponse<any>> {
  try {
    const res = await fetchWithTimeout(
      `${getApiBaseUrl()}/v1/api/cms/home`, 
      { 
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
        },
      },
      10000 // 10 second timeout
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch Home Services data: ${res.status} ${res.statusText}`);
      return {
        success: false,
        error: `Server responded with ${res.status}: ${res.statusText}`,
      };
    }
    
    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching Home Services data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Provide more specific error messages
    if (errorMessage.includes('timeout')) {
      return {
        success: false,
        error: 'Request timed out - server may be slow or unavailable',
      };
    }
    
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      return {
        success: false,
        error: 'Network error - please check your internet connection',
      };
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
} 