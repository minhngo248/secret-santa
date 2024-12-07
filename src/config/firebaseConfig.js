import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
    apiKey: env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };