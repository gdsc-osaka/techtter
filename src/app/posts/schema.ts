import { z } from 'zod';

export const postFormSchema = z.object({
    topicId: z.string(),
    content: z.string(),
    idToken: z.string(),
});

export type PostFormType = z.infer<typeof postFormSchema>;
