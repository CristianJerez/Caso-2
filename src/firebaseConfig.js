import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAbAhnKboDvRjRAjfr8tgKE_Of7mbzMXeo",
    authDomain: "pruebacaso1-b55b1.firebaseapp.com",
    projectId: "pruebacaso1-b55b1",
    storageBucket: "pruebacaso1-b55b1.appspot.com",
    messagingSenderId: "491868773676",
    appId: "1:491868773676:web:10c3bc1ab090c013256089",
    measurementId: "G-CPZQR6PLDM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;