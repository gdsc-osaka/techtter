'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { countLines } from '@/lib/strlib';
import { Button } from '@/components/ui/button';
import { SendIcon } from '@/components/icons';
import { createPostAction } from '@/app/posts/action';
import { auth } from '@/firebase';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { postFormSchema, PostFormType } from '@/app/posts/schema';
import { userAtom } from '@/atoms/userAtom';
import { useAtom } from 'jotai';

export default function PostForm() {
    const pathname = usePathname();
    const form = useForm<PostFormType>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            topicId: '',
            content: '',
            idToken: '',
        },
    });
    const [user] = useAtom(userAtom);

    const row = countLines(form.watch().content ?? '');

    // Form に IdToken を設定
    useEffect(() => {
        const cancel = auth.onIdTokenChanged(async (user) => {
            if (user === null) return;
            const idToken = await user.getIdToken();
            form.setValue('idToken', idToken);
        });

        return () => {
            cancel();
        };
    }, []);

    // Form に topicId を設定
    useEffect(() => {
        const topicId = pathname.split('/').pop();
        if (topicId === undefined) return;
        form.setValue('topicId', topicId);
    }, [pathname]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e === undefined) return;
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.currentTarget.requestSubmit();
            form.setValue('content', '');
        }
    };

    const unsignedIn = user === null;

    return (
        <Form {...form}>
            <form
                action={createPostAction}
                className={'bg-card px-4 py-1 flex items-start gap-4'}
                onKeyDown={handleKeyDown}
            >
                <FormField
                    control={form.control}
                    name={'content'}
                    disabled={unsignedIn}
                    render={({ field }) => (
                        <FormItem className={'w-full'}>
                            <FormControl>
                                <textarea
                                    placeholder={
                                        unsignedIn
                                            ? 'ログインが必要です...'
                                            : 'Type something...'
                                    }
                                    className={
                                        'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm resize-none ' +
                                        'bg-transparent placeholder:text-muted-foreground focus-visible:outline-none'
                                    }
                                    rows={row}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'idToken'}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input hidden {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'topicId'}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <input hidden {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type={'submit'} size={'icon'} disabled={unsignedIn || form.getValues("content") === ''}>
                    <SendIcon />
                </Button>
            </form>
        </Form>
    );
}
