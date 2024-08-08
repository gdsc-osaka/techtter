'use client';
import { ProfileFormSchema, profileFormSchema, } from '@/app/settings/profile/schema';
import { userAtom } from '@/atoms/userAtom';
import CircularProgressIndicator from '@/components/circularProgressIndicator';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfile } from 'firebase/auth';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProfileForm() {
    const [submitting, setSubmitting] = useState(false);
    const [user, subscribe] = useAtom(userAtom);
    const form = useForm<ProfileFormSchema>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user?.displayName ?? '',
        },
    });

    useEffect(() => {
        const unsub = subscribe();

        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        if (user !== null && user.displayName !== null) {
            form.setValue('name', user.displayName);
        }
    }, [user]);

    const handleSubmit = async ({ name }: ProfileFormSchema) => {
        console.log('submit');
        if (user === null) {
            return;
        }
        console.log(user);
        setSubmitting(true);
        await updateProfile(user, { displayName: name });
        setSubmitting(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                action={() => {}}
                className={'flex flex-col gap-4'}
            >
                <FormField
                    control={form.control}
                    name={'name'}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={'name'}>Name</FormLabel>
                            <FormControl>
                                <Input id={'name'} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div>
                    <Button type={'submit'} disabled={submitting}>
                        {submitting && <CircularProgressIndicator className={"mr-1"} size={20} />}
                        更新
                    </Button>
                </div>
            </form>
        </Form>
    );
}
