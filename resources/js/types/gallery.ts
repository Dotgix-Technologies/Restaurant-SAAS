export interface Gallery {
    id: number;
    user_id: number;
    name: string;
    url: string;
    alt: string;
}
const GalleryFields = [
    'id',
    'name',
    'url',
    'alt',
] as const;

export type GalleryField = (typeof GalleryFields)[number];