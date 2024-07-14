'use client';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { KeyboardArrowDownIcon } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    id: string;
    label: string;
    href: string;
    children?: ReactNode;
}

export default function TopicItem({ children, id, label, href }: Props) {
    const openable = children !== undefined;

    const [open, setOpen] = useState(!openable);
    const pathname = usePathname();

    useEffect(() => {
        const segments = pathname.split('/');
        if (segments.includes(id)) setOpen(true);
    }, [pathname]);

    const currentTopicId = useMemo(() => {
        const splits = pathname.split('/');
        return splits[splits.length - 1];
    }, [pathname]);

    const handleClick = () => {
        if (openable && currentTopicId === id) {
            setOpen((prev) => !prev);
        }
    };


    const isThisTopic = currentTopicId === id;

    return (
        <details open={open}>
            <summary className={'block list-none mb-1'}>
                <Link
                    href={href}
                    onClick={handleClick}
                    className={
                        'px-2 py-1 flex gap-1 w-full rounded text-sm text-stone-500 transition-colors ' +
                        'hover:text-stone-900 hover:bg-stone-200 ' +
                        `${open ? 'text-stone-900' : ''} ` +
                        `${isThisTopic ? 'border border-stone-500' : ''}`
                    }
                >
                    <KeyboardArrowDownIcon
                        className={`transition-transform ${open ? '' : '-rotate-90'} ${openable ? '' : 'text-transparent'}`}
                    />
                    {label}
                </Link>
            </summary>
            <div className={'ml-2 flex flex-col'}>{children}</div>
        </details>
    );
}
