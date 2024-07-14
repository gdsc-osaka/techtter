import { atom } from 'jotai';
import { User } from 'firebase/auth';
import { auth } from '@/firebase';

const _userAtom = atom<User | null>(null);
const alreadySubscribedAtom = atom(false);

export const userAtom = atom(
    (get) => get(_userAtom),
    (get, set) => {
        const subscribed = get(alreadySubscribedAtom);
        if (subscribed) return;

        auth.onAuthStateChanged((user) => {
            set(_userAtom, user);
        });
    }
);
