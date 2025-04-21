import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCsrMZBo9NNhYf7IRarEhdVZCxK1CC73Gc",
    authDomain: "tingo-c693f.firebaseapp.com",
    projectId: "tingo-c693f",
    storageBucket: "tingo-c693f.appspot.com",
    messagingSenderId: "605911264426",
    appId: "1:605911264426:web:6bb98a799722179642f4d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
