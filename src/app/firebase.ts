import { initializeApp } from 'firebase/app';

const firebaseConfig = JSON.parse(atob(process.env.FIRE_CONFIG));

export const app = initializeApp(firebaseConfig);
