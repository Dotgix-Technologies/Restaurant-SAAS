const kycDocumentFields = [
  "id",
  'restaurant_id',
  "type",
  "document_path",
  "status",
  "created_at",
  "updated_at",
] as const;

export type KycDocumentField = (typeof kycDocumentFields)[number];

export interface KycDocument {
  id: number;
  restaurant_id: number;
  type: string;
  document_path: string;
  status: string;
  created_at: string;
  updated_at: string;
}
export const kycDocumentTypesOptions: Record<string, { value: string; label: string }[]> = {
  "OnSite": [
    { value: "Trade_License_(DED)", label: "Trade License (DED)" },
    { value: "Food_License_(DM)", label: "Food License (DM)" },
    { value: "Kitchen_Layout_Approval", label: "Kitchen Layout Approval" },
    { value: "Health_Cards_for_Staff", label: "Health Cards for Staff" },
    { value: "Civil_Defense", label: "Civil Defense" },
    { value: "Pest/Waste_Management", label: "Pest/Waste Management" },
    { value: "Dining_Area/Signage_Permits", label: "Dining Area/Signage Permits" },

  ],
  "CloudKitchen": [
    { value: "Trade_License_(DED)", label: "Trade License (DED)" },
    { value: "Food_License_(DM)", label: "Food License (DM)" },
    { value: "Kitchen_Layout_Approval", label: "Kitchen Layout Approval" },
    { value: "HACCP", label: "HACCP" },
    { value: "Health_Cards_for_Staff", label: "Health Cards for Staff" },
    { value: "Civil_Defense", label: "Civil Defense" },
    { value: "Pest/Waste_Management", label: "Pest/Waste Management" },
    { value: "Delivery_Permit (RTA)", label: "Delivery Permit (RTA)" },
  ],
  "Hybrid": [
    { value: "Trade_License_(DED)", label: "Trade License (DED)" },
    { value: "Food_License_(DM)", label: "Food License (DM)" },
    { value: "Kitchen_Layout_Approval", label: "Kitchen Layout Approval" },
    { value: "HACCP", label: "HACCP" },
    { value: "Health_Cards_for_Staff", label: "Health Cards for Staff" },
    { value: "Civil_Defense", label: "Civil Defense" },
    { value: "Pest/Waste_Management", label: "Pest/Waste Management" },
    { value: "Delivery_Permit (RTA)", label: "Delivery Permit (RTA)" },
    { value: "Dining_Area/Signage_Permits", label: "Dining Area/Signage Permits" },

  ]
};
