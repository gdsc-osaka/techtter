import { z } from 'zod';

const availableFileTypes = ['image/png', 'image/jpeg'];

export const postFormSchema = z.object({
    topicId: z.string(),
    content: z.string(),
    files: z.custom<FileList | File>().refine(
        (files) => {
            console.log(files);
            if (files instanceof File) {
                return (
                    availableFileTypes.includes(files.type) || files.size === 0
                );
            }
            return Array.from(files).every((file) =>
                availableFileTypes.includes(file.type)
            );
        },
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
