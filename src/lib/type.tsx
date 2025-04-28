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

