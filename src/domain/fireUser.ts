import { z } from 'zod';

export interface FireUser {
    uid: string;
    displayName: string | null;
    photoUrl: string | null;
}

export const fireUserSchema = z.object({
    uid: z.string(),
    displayName: z.string().nullable(),
    photoUrl: z.string().nullable(),
});
