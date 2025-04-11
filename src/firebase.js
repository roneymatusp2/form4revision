// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDhjV7Oe1ae1qa1RJpVh31bhvHkHwr3v4k",
  authDomain: "igcse-mathematics-resources.firebaseapp.com",
  projectId: "igcse-mathematics-resources",
  storageBucket: "igcse-mathematics-resources.firebasestorage.app",
  messagingSenderId: "647369914626",
  appId: "1:647369914626:web:dc652d71341e3545a5ea1b",
  measurementId: "G-YEFKRKWQ7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };