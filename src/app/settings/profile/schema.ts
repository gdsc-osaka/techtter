import { z } from 'zod';

export const profileFormSchema = z.object({
    name: z.string().min(1, { message: '名前を入力してください' }),
});

export type ProfileFormSchema = z.infer<typeof profileFormSchema>;
