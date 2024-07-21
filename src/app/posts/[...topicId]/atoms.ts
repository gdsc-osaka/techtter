import { atom } from 'jotai';
import { atomFamily, loadable } from 'jotai/utils';
import { FireUser, fireUserSchema } from '@/domain/fireUser';
import { userAtom } from '@/atoms/userAtom';

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
