import { Restaurant } from "./restarurant";

export interface User {
    id: number;
    name: string;
    email: string;
    restaurants?:Restaurant[];
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};