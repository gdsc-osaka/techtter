"use client";
import {ReactNode, useState} from "react";
import {KeyboardArrowDown} from "@/components/icons";

interface Props {
    label: string;
    children?: ReactNode;
}

export default function TopicItem({children, label}: Props) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(prev => !prev);
    }

    const openable = children !== undefined;

    return (
        <details open={open}>
            <summary className={"block list-none"}>
                <button onClick={handleClick}
                        className={"px-2 py-1 flex gap-1 w-full rounded text-sm text-stone-500 transition-colors " +
                            "hover:text-stone-900 hover:bg-stone-200 " +
                            `${open ? "text-stone-900" : ""}`}>
                    <KeyboardArrowDown className={`transition-transform ${open ? "" : "-rotate-90"} ${openable ? "" : "text-transparent"}`}/>
                    {label}
                </button>
            </summary>
            <div className={"ml-2 flex flex-col gap-1"}>
                {children}
            </div>
        </details>
    );
}
