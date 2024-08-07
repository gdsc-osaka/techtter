import { z } from 'zod';

const availableFileTypes = ['image/png', 'image/jpg'];

export const postFormSchema = z.object({
    topicId: z.string(),
    content: z.string(),
    files: z
        .custom<FileList | File>()
        .refine(
            (files) =>
                (files instanceof File ? [files] : Array.from(files)).every((file) =>
                    availableFileTypes.includes(file.type)
                ),
            { message: 'jpg または png ファイルを選択して下さい' }
        ),
});

export type PostFormType = z.infer<typeof postFormSchema>;

export const topicFormSchema = z.object({
    parentId: z.string().optional(),
    id: z.string().min(1, { message: 'IDを入力して下さい' }),
    name: z.string().min(1, { message: 'トピック名を入力して下さい' }),
});

export type TopicFormType = z.infer<typeof topicFormSchema>;
