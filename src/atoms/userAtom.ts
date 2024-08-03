import { atom } from 'jotai';
import { User } from 'firebase/auth';
import { auth } from '@/firebase';
import Cookies from 'js-cookie';

const _userAtom = atom<User | null>(null);
const alreadySubscribedAtom = atom(false);

export const userAtom = atom(
    (get) => get(_userAtom),
    (get, set) => {
        const subscribed = get(alreadySubscribedAtom);
        if (subscribed) return;

        auth.onAuthStateChanged(async (user) => {
            set(_userAtom, user);

            if (user === null) return;

            const idToken = await user.getIdToken();
            Cookies.set('idToken', idToken);
        });
    }
);
