const domainFields = [
  "name",
  "tenant_id",
  "domain",
  "created_at",
  "updated_at",
] as const;

export type DomainField = (typeof domainFields)[number];

export interface Domain {
  id: number;
  tenant_id: number;
  domain: string;
  status?: string;
  created_at: string;
  updated_at: string;
}