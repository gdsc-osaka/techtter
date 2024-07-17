import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className={"h-28 border border-stone-400 hover:bg-stone-100 rounded-lg flex"}>
            <div className={"min-w-1 w-1"}/>
            <div className={"flex w-full"}>
                <div className={"w-full flex flex-col gap-2 px-4 py-4"}>
                    <Skeleton className={"w-36 h-4 rounded"}/>
                    <Skeleton className={"w-full h-3.5 rounded"}/>
                    <Skeleton className={"w-full h-3.5 rounded"}/>
                    <Skeleton className={"w-full h-3.5 rounded"}/>
                </div>
                <Skeleton className={"w-28 h-28"}/>
            </div>
        </div>
    )
}
