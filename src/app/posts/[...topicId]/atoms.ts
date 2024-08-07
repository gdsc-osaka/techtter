import { FireUser, fireUserSchema } from '@/domain/fireUser';
import { atom } from 'jotai';
import { atomFamily, loadable } from 'jotai/utils';

export const usersFamily = atomFamily((uid: string) =>
    loadable(
        atom<Promise<FireUser | null>>(async () => {
            const res = await fetch(`/api/users/${uid}`, {});
            const json = await res.json();
            const parsed = fireUserSchema.safeParse(json.user);

            if (!parsed.success) {
                return null;
            }

            return parsed.data;
        })
    )
);
