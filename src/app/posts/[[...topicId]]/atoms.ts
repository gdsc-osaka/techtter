import { atom } from 'jotai';
import { Post } from '@/domain/post';
import { PostQueryService } from '@/infrastructure/post/postQueryService';
import { atomFamily, loadable } from 'jotai/utils';
import { Topic } from '@/domain/topic';
import { FireUser, fireUserSchema } from '@/domain/fireUser';
import { userAtom } from '@/app/atoms';

/**
 * Topic ID を引数に取る Family
 */
export const postsFamily = atomFamily(() => atom<Post[]>([]));

const postQueryService = new PostQueryService();
export const subscribePostsFamily = atomFamily((topicId: string) =>
    atom(null, (get, set, topic: Pick<Topic, 'left' | 'right'>) => {
        postQueryService.findManyByTopicCallback((posts) => {
            set(postsFamily(topicId), posts.sort((a, b) => a.created_at.seconds - b.created_at.seconds));
        }, topic);
    })
);

export const usersFamily = atomFamily((uid: string) =>
    loadable(
        atom<Promise<FireUser | null>>(async (get) => {
            const idToken = await get(userAtom)?.getIdToken();

            if (idToken === undefined) {
                return null;
            }

            const res = await fetch(`/api/users/${uid}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            const json = await res.json();
            const parsed = fireUserSchema.safeParse(json.user);

            if (!parsed.success) {
                return null;
            }

            return parsed.data;
        })
    )
);
