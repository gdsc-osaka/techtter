'use client';

import MobileTopicSideMenu from '@/app/posts/_components/mobileTopicSideMenu';
import Divider from '@/components/divider';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { useAtom } from 'jotai';
import { topicDrawerOpenAtom } from '@/app/posts/atoms';

export default function TopicDrawer() {
    const [open, setOpen] = useAtom(topicDrawerOpenAtom);

    return (
        <Drawer direction={'left'} open={open} onOpenChange={setOpen}>
            <DrawerContent className={'h-screen w-56 items-start'}>
                <DrawerHeader className={'w-full text-left'}>
                    Topics
                    <Divider />
                </DrawerHeader>
                <MobileTopicSideMenu />
            </DrawerContent>
        </Drawer>
    );
}
