'use client';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem,} from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import {countLines} from "@/lib/strlib";
import {Button} from "@/components/ui/button";
import {SendIcon} from "@/components/icons";
import {createPost} from "@/app/posts/action";

const formSchema = z.object({
    content: z.string(),
});

export default function PostForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
        },
    });

    // const createPost = (formData: FormData) => {
    //     console.log(formData);
    // }

    const row = countLines(form.watch().content) + 1;

    return (
        <Form {...form}>
            <form action={createPost} className={"bg-card px-4 py-1 flex items-start gap-4"}>
                <FormField
                    control={form.control}
                    name={'content'}
                    render={({ field }) => (
                        <FormItem className={"w-full"}>
                            <FormControl>
                                <textarea
                                    placeholder={"Type something..."}
                                    className={"flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm resize-none " +
                                        "bg-transparent placeholder:text-muted-foreground focus-visible:outline-none"}
                                    rows={row}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type={"submit"} size={"icon"}>
                    <SendIcon/>
                </Button>
            </form>
        </Form>
    );
}
