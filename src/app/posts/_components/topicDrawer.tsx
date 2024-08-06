"use client";

import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {useAtom} from "jotai";
import {topicDrawerOpenAtom} from "@/app/posts/atoms";

export default function TopicDrawer() {
    const [open, setOpen] = useAtom(topicDrawerOpenAtom);

    return (
        <Drawer direction={"left"} open={open} onOpenChange={setOpen}>
            <DrawerContent className={"h-screen w-56"}>
                Header
            </DrawerContent>
        </Drawer>
    )
}
