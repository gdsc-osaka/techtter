import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = JSON.parse(window.atob(process.env.FIRE_CONFIG));

export const app = initializeApp({
    apiKey: 'AIzaSyBwsX46Y5LFUSgYcVuGp3KgjCfTLcD2AL8',
    authDomain: 'techtter-prod.firebaseapp.com',
    projectId: 'techtter-prod',
    storageBucket: 'techtter-prod.appspot.com',
    messagingSenderId: '362303499774',
    appId: '1:362303499774:web:14c77f563cb7c9832664af',
    measurementId: 'G-0S4WDV90D0',
});
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.languageCode = 'ja';
