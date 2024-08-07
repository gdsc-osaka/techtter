'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { FileInfo, getFileData } from '@/lib/formUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { countLines } from '@/lib/strlib';
import { Button } from '@/components/ui/button';
import { AddIcon, SendIcon, UploadFileIcon } from '@/components/icons';
import { createPostAction } from '@/app/posts/action';
import { auth } from '@/firebase';
import { useEffect, useRef, useState } from 'react';
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
        },
    });
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [user] = useAtom(userAtom);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const lineCount = countLines(form.watch().content ?? '');

    // Form に topicId を設定
    useEffect(() => {
        const topicId = pathname.split('/').pop();
        if (topicId === undefined) return;
        form.setValue('topicId', topicId);
    }, [pathname]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.requestSubmit();
        }
    }

    const handleSubmit = () => {
        form.reset();
        setFiles([]);
    };

    const handleUploadFile = () => {
        fileInputRef.current?.click();
    };

    const unsignedIn = user === null;

    return (
        <Form {...form}>
            <form
                action={createPostAction}
                className={'bg-card px-2 py-1 flex flex-col gap-2'}
                onKeyDown={handleKeyDown}
                onSubmit={handleSubmit}
            >
                {files.length > 0 && (
                    <div
                        className={'flex items-start gap-2 px-2 pt-2 flex-wrap'}
                    >
                        {files.map(({ file, previewUrl }) => (
                            <div
                                className={'flex flex-col gap-2'}
                                key={`file-preview-${file.name}`}
                            >
                                <img
                                    alt={file.name}
                                    src={previewUrl}
                                    className={'w-24 h-24 object-fill rounded'}
                                />
                                <p className={'text-xs text-muted-foreground'}>
                                    {file.name}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div className={'flex items-start'}>
                    <DropdownMenu dir={'ltr'}>
                        <DropdownMenuTrigger>
                            <Button size={'icon'} variant={'ghost'}>
                                <AddIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleUploadFile}>
                                <UploadFileIcon className={'mr-2'} />
                                ファイルをアップロード
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <FormField
                        name={'files'}
                        render={({ field: { onChange, value, ...rest } }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...rest}
                                        type={'file'}
                                        id={'files'}
                                        accept={'image/*'}
                                        multiple
                                        className={'hidden'}
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            const fileInfos = getFileData(e);
                                            setFiles(fileInfos);
                                            if (e.target.files === null) return;
                                            onChange(e);
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
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
                                            'flex min-h-[80px] w-full rounded-md px-2 py-2 text-sm resize-none ' +
                                            'bg-transparent placeholder:text-muted-foreground focus-visible:outline-none'
                                        }
                                        rows={lineCount}
                                        {...field}
                                    />
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
                    <Button
                        type={'submit'}
                        size={'icon'}
                        disabled={
                            unsignedIn || form.getValues('content') === ''
                        }
                    >
                        <SendIcon />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
