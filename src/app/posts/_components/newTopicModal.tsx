'use client';
import Modal from '@/components/modal';
import {useAtom} from 'jotai';
import {newTopicModalAtom} from '@/app/posts/atoms';
import {SubmitHandler, useForm} from "react-hook-form";
import {topicFormSchema, TopicFormType} from "@/app/posts/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {createTopicAction} from "@/app/posts/action";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect, useRef} from "react";

export default function NewTopicModal() {
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

    const handleSubmit: SubmitHandler<TopicFormType> = async (data) => {
        if (formRef.current)
            await createTopicAction(new FormData(formRef.current));
    };

    return (
        <Modal open={modal.open} onClose={handleClose}>
            <div>
                <p className={"pb-4"}>Topic を作成</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        ref={formRef}
                    >
                        <FormField
                            control={form.control}
                            name={'id'}
                            render={({ field }) => (
                                <FormItem className={"pb-2"}>
                                    <FormControl>
                                        <Input {...field} ref={inputRef} placeholder={"ID"} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={'name'}
                            render={({ field }) => (
                                <FormItem className={"pb-2"}>
                                    <FormControl>
                                        <Input {...field} placeholder={"Name"} />
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
                                        <Input {...field} type={"hidden"} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className={"flex justify-end gap-2 pt-2"}>
                            <Button onClick={handleClose} variant={"secondary"} disabled={form.formState.isSubmitting}>
                                キャンセル
                            </Button>
                            <Button type={'submit'} disabled={form.formState.isSubmitting}>
                                作成
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
}
