'use client';
import { Button } from '@/components/ui/button';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '@/atoms/userAtom';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import Modal from '@/components/modal';
import { GoogleSignInButton } from '@/components/authButtons';
import Logo from '@/components/logo';
import { MenuIcon } from '@/components/icons';
import { topicDrawerOpenAtom } from '@/app/posts/atoms';

export default function Header() {
    const [user, subscribe] = useAtom(userAtom);
    const [openModal, setOpenModal] = useState(false);
    const setOpenDrawer = useSetAtom(topicDrawerOpenAtom);

    useEffect(() => {
        const unsub = subscribe();

        return () => unsub();
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

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    };

    return (
        <>
            <header
                className={
                    'flex justify-between items-center px-2 md:px-4 py-1 border-b border-stone-300 min-h-12'
                }
            >
                <div className={'flex gap-1'}>
                    <Button
                        size={'icon'}
                        variant={'ghost'}
                        className={'md:hidden'}
                        onClick={handleOpenDrawer}
                    >
                        <MenuIcon />
                    </Button>
                    <div className={'flex items-center gap-2'}>
                        <Logo size={24} />
                        <span className={'text-stone-700'}>Techtter β</span>
                    </div>
                </div>
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
