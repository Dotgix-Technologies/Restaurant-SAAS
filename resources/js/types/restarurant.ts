import { KycDocument } from "./kyc_documents";
import { Tenant } from "./tenant";

export const restaurantFields = [
    "name",
    "email",
    "phone",
    "address",
    "DBA",
    "cuisine_type",
    "restaurant_type",
    "license_no",
    "subscription_plan",
    "status",
    "logo",
    "location",
    "tenant",
] as const;
export type RestaurantField = (typeof restaurantFields)[number];
export type RestaurantFormData = Record<RestaurantField, any>;
export interface Restaurant {
  id: number;
  owner_id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  DBA: string;
  cuisine_type: string;
  restaurant_type: string;
  distance?: number; // Optional for distance calculations
  license_no: string;
  subscription_plan: string;
  tenant_id?: number | string;
  logo: string | File;
  kyc_documents: KycDocument[];
  tenant?: Tenant | null;
  status: string;
  created_at: string;
  updated_at: string;
}
