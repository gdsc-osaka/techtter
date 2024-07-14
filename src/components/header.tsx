'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { userAtom } from '@/app/atoms';
import { useEffect } from 'react';
import { auth } from '@/firebase';

export default function Header() {
    const [user, subscribe] = useAtom(userAtom);

    useEffect(() => {
        subscribe();
    }, []);

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <header
            className={
                'flex justify-between items-center px-4 py-1 border-b border-stone-300 min-h-12'
            }
        >
            <div>Techtter</div>
            <div className={'flex gap-2'}>
                {user === null && (
                    <>
                        <Button variant={'secondary'} size={'sm'}>
                            ログイン
                        </Button>
                        <Link href={'/signup'}>
                            <Button variant={'outline'} size={'sm'}>
                                登録
                            </Button>
                        </Link>
                    </>
                )}
                {user !== null && (
                    <>
                        <button className={'w-8 h-8'}>
                            {user.photoURL !== null && (
                                <img
                                    src={user.photoURL}
                                    alt={'User Icon'}
                                    className={'rounded-full'}
                                />
                            )}
                        </button>
                        <Button
                            variant={'secondary'}
                            size={'sm'}
                            onClick={handleSignOut}
                        >
                            ログアウト
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
}
