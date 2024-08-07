'use client';
import { createTopicAction } from '@/app/posts/action';
import { newTopicModalAtom } from '@/app/posts/atoms';
import { topicFormSchema, TopicFormType } from '@/app/posts/schema';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function NewTopicDialog() {
    const [modal, setModal] = useAtom(newTopicModalAtom);
    const form = useForm<TopicFormType>({
        resolver: zodResolver(topicFormSchema),
        defaultValues: {
            parentId: '',
            id: '',
            name: '',
        },
    });
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        form.setValue('parentId', modal.topicId);
    }, [modal]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [modal.open, inputRef.current]);

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            setModal({ open: false, topicId: '' });
            form.reset();
        }
    }, [form.formState.isSubmitSuccessful]);

    const handleClose = () => {
        setModal({ open: false, topicId: '' });
    };

    const handleSubmit: SubmitHandler<TopicFormType> = async () => {
        if (formRef.current)
            await createTopicAction(new FormData(formRef.current));
    };

    return (
        <Dialog
            open={modal.open}
            onOpenChange={(open) => setModal((prev) => ({ ...prev, open }))}
        >
            <DialogContent>
                <DialogTitle>Topic を作成</DialogTitle>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        ref={formRef}
                    >
                        <DialogDescription>
                            <FormField
                                control={form.control}
                                name={'id'}
                                render={({ field }) => (
                                    <FormItem className={'pb-2'}>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                ref={inputRef}
                                                placeholder={'ID'}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={'name'}
                                render={({ field }) => (
                                    <FormItem className={'pb-2'}>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={'Name'}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={'parentId'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} type={'hidden'} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </DialogDescription>
                        <DialogFooter>
                            <Button
                                onClick={handleClose}
                                variant={'secondary'}
                                disabled={form.formState.isSubmitting}
                            >
                                キャンセル
                            </Button>
                            <Button
                                type={'submit'}
                                disabled={form.formState.isSubmitting}
                            >
                                作成
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
