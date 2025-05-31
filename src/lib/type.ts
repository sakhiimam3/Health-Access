export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isApproved: boolean;
  isVerified: boolean;
  role: string;
  token?: string;
  data?: {
    user: {
      id: string;
      isVerified: boolean;
    }
  }
}

// ... rest of the types ... 