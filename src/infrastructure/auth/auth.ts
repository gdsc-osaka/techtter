import { auth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import {logger} from "@/logger";

export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(auth, provider);
        return credential.user;
    } catch (e) {
        // logger.error(e);
        return Promise.reject(e);
    }
};
