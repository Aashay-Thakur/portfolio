// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyCeKXKBf9JJUHvptvNHD40cZI_pXEr4lIw',
	authDomain: 'portfolio-53925.firebaseapp.com',
	projectId: 'portfolio-53925',
	messagingSenderId: '917821587018',
	appId: '1:917821587018:web:e4765c30a50d2054b770b3',
	measurementId: 'G-D1T8QY9QW9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
