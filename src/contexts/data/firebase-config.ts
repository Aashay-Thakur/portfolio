import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyA-nUTh8BDYWvtHFrG0B4c8xLEmhL1PfcU',
	authDomain: 'portfolio-aashay-thakur.firebaseapp.com',
	projectId: 'portfolio-aashay-thakur',
	storageBucket: 'portfolio-aashay-thakur.appspot.com',
	messagingSenderId: '11863451816',
	appId: '1:11863451816:web:ee862cc69838cec9f07a9d',
	measurementId: 'G-SEPW2RRJ53',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const docRef = doc(db, 'users', 'Aashay-Thakur');
export const resumeRef = ref(storage, 'resume.pdf');
