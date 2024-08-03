import { z } from 'zod';

export const postFormSchema = z.object({
    topicId: z.string(),
    content: z.string(),
    idToken: z.string(),
});

export type PostFormType = z.infer<typeof postFormSchema>;

export const topicFormSchema = z.object({
    parentId: z.string().optional(),
    id: z.string().min(1),
    name: z.string().min(1),
});

export type TopicFormType = z.infer<typeof topicFormSchema>;
