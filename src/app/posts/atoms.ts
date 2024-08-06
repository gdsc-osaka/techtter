import { atom } from 'jotai';

interface NewTopicModalArgs {
    open: boolean;
    topicId: string;
}
export const newTopicModalAtom = atom<NewTopicModalArgs>({
    open: false,
    topicId: '',
});

export const topicDrawerOpenAtom = atom<boolean>(false);
