'use client';
import { topicDrawerOpenAtom } from '@/app/posts/atoms';
import { userAtom } from '@/atoms/userAtom';
import { GoogleSignInButton } from '@/components/authButtons';
import { MenuIcon } from '@/components/icons';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/firebase';
import { useAtom, useSetAtom } from 'jotai';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Header() {
    const [user, subscribe] = useAtom(userAtom);
    const setOpenDrawer = useSetAtom(topicDrawerOpenAtom);

    useEffect(() => {
        const unsub = subscribe();

        return () => unsub();
    }, []);

    const handleSignOut = () => {
        auth.signOut();
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
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant={'secondary'} size={'sm'}>
                                        ログイン
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle className={'text-center py-2'}>
                                        ログイン
                                    </DialogTitle>
                                    <DialogDescription>
                                        <GoogleSignInButton />
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className={'w-8 h-8'}>
                                        {user.photoURL !== null && (
                                            <img
                                                src={user.photoURL}
                                                alt={'User Icon'}
                                                className={'rounded-full'}
                                            />
                                        )}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={'/settings/profile'}>
                                            プロフィール
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}
