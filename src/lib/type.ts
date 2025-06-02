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

export interface PartnerProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    isVerified: boolean;
    isApproved: boolean;
  };
  image: string;
  coverImage: string;
  isActive: boolean;
  businessName: string;
  website: string;
  location: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  termsAccepted: boolean;
  onboardingCompleted: boolean;
  describeYourBusiness: string;
  phoneNumber: string;
  timings: Array<{
    id: string;
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
}

export interface UpdatePartnerProfile {
  email: string;
  firstName: string;
  lastName: string;
  businessName: string;
  website: string;
  businessType: string;
  schedulingPlatform: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  termsAccepted: boolean;
  phoneNumber: string;
  notificationToken?: string;
  image: string;
  coverImage: string;
  describeYourBusiness: string;
}

// ... rest of the types ... 