import { ProfileStatus } from "./auth.types";

export interface UserProfileInterface {
  id: string;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  email: string;
  middleName: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  country: string;
  nationality: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  picture: string | null;
  walletBalance: number;
  profileStatus: ProfileStatus;
  createdAt: string;
  updatedAt: string;
}
