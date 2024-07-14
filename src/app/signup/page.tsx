'use client';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons';
import { signInWithGoogle } from '@/infrastructure/auth/auth';
import { userAtom } from '@/app/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

// const formSchema = z.object({
//     email: z.string(),
//     password: z.string(),
// });

export default function SignupPage() {
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         email: '',
    //         password: '',
    //     },
    // });
    const [user, subscribe] = useAtom(userAtom);

    useEffect(() => {
        subscribe();
    }, []);

    useEffect(() => {
        if (user !== null) {
            redirect('/');
        }
    }, [user]);

    function handleSignupWithGoogle() {
        signInWithGoogle();
    }

    return (
        <main className={'h-screen flex flex-col items-center justify-center'}>
            <div
                className={
                    'w-64 flex flex-col items-center gap-4 p-8 ' +
                    'rounded-md bg-stone-100'
                }
            >
                <h1 className={'font-semibold text-lg'}>Techtter</h1>
                {/*<Form {...form}>*/}
                {/*    <form action={signupWithEmailAction}>*/}
                {/*        <FormField*/}
                {/*            control={form.control}*/}
                {/*            name={'email'}*/}
                {/*            render={({ field }) => (*/}
                {/*                <FormItem className={'w-full'}>*/}
                {/*                    <FormControl>*/}
                {/*                        <Input*/}
                {/*                            type={'email'}*/}
                {/*                            placeholder={'Email'}*/}
                {/*                            {...field}*/}
                {/*                        />*/}
                {/*                    </FormControl>*/}
                {/*                </FormItem>*/}
                {/*            )}*/}
                {/*        />*/}
                {/*        <Button type={'submit'}>*/}
                {/*            Signup*/}
                {/*        </Button>*/}
                {/*    </form>*/}
                {/*</Form>*/}
                <Button variant={'outline'} onClick={handleSignupWithGoogle}>
                    <GoogleIcon />
                    <span className={'ml-3'}>Signup with Google</span>
                </Button>
            </div>
        </main>
    );
}
