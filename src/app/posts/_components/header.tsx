'use client';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import Modal from '@/components/modal';
import { GoogleSignInButton } from '@/components/authButtons';

export default function Header() {
    const [user, subscribe] = useAtom(userAtom);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        subscribe();
    }, []);

    useEffect(() => {
        if (user !== null) setOpenModal(false);
    }, [user]);

    const handleSignOut = () => {
        auth.signOut();
    };

    const handleSignIn = () => {
        setOpenModal(true);
    };

    return (
        <>
            <header
                className={
                    'flex justify-between items-center px-4 py-1 border-b border-stone-300 min-h-12'
                }
            >
                <div>Techtter</div>
                <div className={'flex gap-2'}>
                    {user === null && (
                        <>
                            <Button
                                variant={'secondary'}
                                size={'sm'}
                                onClick={handleSignIn}
                            >
                                ログイン
                            </Button>
                            {/*<Link href={'/signup'}>*/}
                            {/*    <Button variant={'outline'} size={'sm'}>*/}
                            {/*        登録*/}
                            {/*    </Button>*/}
                            {/*</Link>*/}
                        </>
                    )}
                    {user !== null && (
                        <>
                            <Button
                                variant={'secondary'}
                                size={'sm'}
                                onClick={handleSignOut}
                            >
                                ログアウト
                            </Button>
                            <button className={'w-8 h-8'}>
                                {user.photoURL !== null && (
                                    <img
                                        src={user.photoURL}
                                        alt={'User Icon'}
                                        className={'rounded-full'}
                                    />
                                )}
                            </button>
                        </>
                    )}
                </div>
            </header>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div
                    className={
                        'flex flex-col justify-center items-center gap-6'
                    }
                >
                    <p className={'text-lg font-bold'}>ログイン</p>
                    <GoogleSignInButton />
                </div>
            </Modal>
        </>
    );
}
