import {Post} from "@/domain/post";
import {AccountCircleIcon} from "@/components/icons";
import Link from "next/link";

interface Props {
    post: Post
}

export default function PostItem({post}: Props) {
    const date = post.created_at.toDate();

    return (
        <li>
            <Link href={""} className={"px-3 py-3 rounded flex items-start gap-4 transition-colors " +
                "hover:bg-stone-100"}>
                <AccountCircleIcon size={36}/>
                <div className={"flex flex-col gap-1"}>
                    <h3 className={"flex items-center gap-3"}>
                        <span className={"text-sm"}>Username</span>
                        <span className={"text-xs text-stone-600 "}>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</span>
                    </h3>
                    <p className={"whitespace-pre-wrap "}>{post.content}</p>
                </div>
            </Link>
        </li>
    );
}
