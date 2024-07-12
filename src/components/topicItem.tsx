"use client";
import {ReactNode, useCallback, useMemo, useState} from "react";
import {KeyboardArrowDown} from "@/components/icons";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props {
    id: string;
    label: string;
    href: string;
    children?: ReactNode;
}

export default function TopicItem({children, id, label, href}: Props) {
    const openable = children !== undefined;

    const [open, setOpen] = useState(!openable);
    const pathname = usePathname();

    const handleClick = () => {
        if (openable)
            setOpen(prev => !prev);
    }

    const currentTopicId = useMemo(() => {
        const splits = pathname.split('/');
        return splits[splits.length - 1];
    }, [pathname]);

    const isThisTopic = currentTopicId === id;

    return (
        <details open={open}>
            <summary className={"block list-none"}>
                <Link href={href}>
                    <button onClick={handleClick}
                            className={"px-2 py-1 flex gap-1 w-full rounded text-sm text-stone-500 transition-colors " +
                                "hover:text-stone-900 hover:bg-stone-200 " +
                                `${open ? "text-stone-900" : ""} ` +
                                `${isThisTopic ? "border border-stone-500" : ""}`}>
                        <KeyboardArrowDown className={`transition-transform ${open ? "" : "-rotate-90"} ${openable ? "" : "text-transparent"}`}/>
                        {label}
                    </button>
                </Link>
            </summary>
            <div className={"ml-2 flex flex-col gap-1"}>
                {children}
            </div>
        </details>
    );
}
