import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = JSON.parse(atob(process.env.FIRE_CONFIG));

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
