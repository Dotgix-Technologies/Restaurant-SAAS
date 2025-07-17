import { Domain } from "./domains";

const tenantFields = [
'id',
'user_id',
'restaurant_id',
'domain',
'status'
] as const;

export type TenantField = (typeof tenantFields)[number];
export type TenantFormData = Record<TenantField, string>;
export interface Tenant {
  id: number;
  user_id: number;
  restaurant_id: number;
  domain?: Domain ;
  status?: string;
  created_at: string;
  updated_at: string;
}
