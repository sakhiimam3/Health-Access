export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  notificationToken?: string;
}



export interface userCreate {
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

export interface createPartnerCreate {
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

export interface GetServicesParamsType {
  sortOrder?: string;
  parentId?:string;
  categoryId?: string;
  typeId?: string;
  search?: string;
}

export const getServicesParams = {
  limit: 100,
  page: 1,
  isActive: true,
  includeChildren: true,
  sortBy: "name",
  sortOrder: "asc"
}

export interface PartnerOnboarding {
  email: string;
  businessName: string;
  website: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  termsAccepted: boolean;
  describeYourBusiness: string;
  phoneNumber: string;
  timings: Array<{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
  image: string;
  coverImage: string;
  serviceIds: string[];
}

