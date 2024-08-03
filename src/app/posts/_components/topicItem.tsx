'use client';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { KeyboardArrowDownIcon } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { newTopicModalAtom } from '@/app/posts/atoms';
import { useSetAtom } from 'jotai';
import AddTopicButton from "@/app/posts/_components/addTopicButton";

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
    const setOpenModal = useSetAtom(newTopicModalAtom);

    useEffect(() => {
        const segments = pathname.split('/');
        if (segments.includes(id)) setOpen(true);
    }, [pathname]);

    const currentTopicId = useMemo(() => {
        const splits = pathname.split('/');
        return splits[splits.length - 1];
    }, [pathname]);

    const handleOpen = () => {
        if (openable && currentTopicId === id) {
            setOpen((prev) => !prev);
        }
    };

    const handleAddTopic = () => {
        setOpenModal({
            open: true,
            topicId: id,
        });
    };

    const isThisTopic = currentTopicId === id;

    return (
        <details open={open}>
            <summary
                className={
                    'list-none px-2 py-1 flex justify-between items-center ' +
                    'transition-colors rounded hover:bg-stone-200 ' +
                    `${isThisTopic ? 'border border-stone-500' : ''}`
                }
                onClick={handleOpen}
            >
                <Link
                    href={href}
                    className={
                        'flex gap-1 w-full text-sm text-stone-500 hover:text-stone-900 ' +
                        `${open ? 'text-stone-900' : ''} `
                    }
                >
                    <KeyboardArrowDownIcon
                        className={`transition-transform ${open ? '' : '-rotate-90'} ${openable ? '' : 'text-transparent'}`}
                    />
                    {label}
                </Link>
                <AddTopicButton onClick={handleAddTopic} size={16} />
            </summary>
            <div className={'ml-2 flex flex-col'}>{children}</div>
        </details>
    );
}
