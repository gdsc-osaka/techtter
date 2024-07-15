import {atom} from 'jotai';
import {Post} from '@/domain/post';
import {atomFamily} from 'jotai/utils';
import {PostQueryService} from '@/infrastructure/post/postQueryService';
import {Unsubscribe} from "@/infrastructure/utils";
import {Topic} from "@/domain/topic";

/* Subscribe Queue */
const MAX_SUBSCRIBE = 3;

interface Unsub {
    id: string;
    unsubscribe: Unsubscribe;
}

const _unsubscribesAtom = atom<Unsub[]>([]);
const unsubscribeQueueAtom = atom(null, (get, set, unsub: Unsub) => {
    const unsubs = get(_unsubscribesAtom);
    const sameUnsub = unsubs.find((u) => u.id === unsub.id);

    if (sameUnsub) {
        // 既に登録されている場合は更新
        set(_unsubscribesAtom, (prev) => [...prev.filter((u) => u.id !== unsub.id), unsub]);
        // 古い方を返す
        return sameUnsub.unsubscribe;
    }

    if (unsubs.length < MAX_SUBSCRIBE) {
        // キューに空きがあれば追加
        set(_unsubscribesAtom, (prev) => [...prev, unsub]);
        return;
    }

    // キューに空きがなければ古いものを削除して追加
    set(_unsubscribesAtom, (prev) => [...prev.slice(1), unsub]);
    return unsubs[0].unsubscribe;
});

/* Post */
const _postsFamily = atomFamily((topicId: string) => atom<Post[]>([]));

const postQueryService = new PostQueryService();

export const lastPostFamily = atomFamily((topicId: string) =>
    atom<Post | undefined>((get) => {
        const posts = get(_postsFamily(topicId));
        if (posts.length === 0) return;
        return posts[posts.length - 1];
    })
);

export const postsFamily = atomFamily((topicId: string) =>
    atom(
        (get) => get(_postsFamily(topicId)),
        (get, set, topic: Pick<Topic, "left" | "right">) => {
            const lastPost = get(lastPostFamily(topicId));

            const unsub = postQueryService.findManyByTopicCallback(
                (posts) => {
                    if (posts.length === 0) return;
                    set(_postsFamily(topicId), (prev) =>
                        prev
                            .concat(...posts)
                            .sort(
                                (a, b) =>
                                    a.created_at.seconds - b.created_at.seconds
                            )
                    );
                },
                topic,
                10,
                lastPost
            );

            // キューから取得した Unsubscribe を実行
            const oldUnsub = set(unsubscribeQueueAtom, {id: topicId, unsubscribe: unsub});
            oldUnsub?.();
        }
    )
);
