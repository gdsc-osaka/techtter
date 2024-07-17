'use client';

import AddTopicButton from '@/app/posts/_components/addTopicButton';
import { newTopicModalAtom } from '@/app/posts/atoms';
import { useSetAtom } from 'jotai';

export default function RootAddTopicButton() {
    const setOpenModal = useSetAtom(newTopicModalAtom);

    const handleAddTopic = () => {
        setOpenModal({
            open: true,
            topicId: '',
        });
    };

    return <AddTopicButton onClick={handleAddTopic} size={20} />;
}
