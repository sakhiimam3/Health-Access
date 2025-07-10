export interface User {
  id: string;

  token?: string;
  data?: {
    
      id: string;
      isVerified: boolean;
      email: string;
      firstName: string;
      lastName: string;
      isActive: boolean;
      isApproved: boolean;
      role: string;
      image:string;
      user :{
        id: string;
        isVerified: boolean;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        isApproved: boolean;
        role: string;
        image:string
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
  firstName?: string;
  lastName?: string;
  businessName?: string;
  website: string;
  businessType?: string;
  schedulingPlatform?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  termsAccepted?: boolean;
  phoneNumber?: string;
  notificationToken?: string;
  image?: string;
  coverImage?: string;
  describeYourBusiness?: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  postcode: string;
  address: string;
  city: string;
  country: string;
  password: string;
}

export interface CreatePartnerCreate {
  email?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  website?: string;
  businessType?: string;
  schedulingPlatform?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  termsAccepted?: boolean;
  notificationToken?: string;
}

export interface GetServicesParams {
  sortOrder?: string;
  parentId?: string;
  categoryId?: string;
  typeId?: string;
  search?: string;
  
}

export interface PartnerOnboarding {
  email?: string;
  businessName?: string;
  website?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  termsAccepted?: boolean;
  describeYourBusiness?: string;
  phoneNumber?: string;
  timings?: Array<{
    dayOfWeek?: string;
    openTime?: string;
    closeTime?: string;
    isClosed?: boolean;
  }>;
  image?: string;
  coverImage?: string;
  serviceIds?: string[];
}

// ... rest of the types ... 

export interface UpdatePartnerServices {
  serviceIds: string[];
}