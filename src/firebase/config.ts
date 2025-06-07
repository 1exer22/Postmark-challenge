import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration - uses environment variables in production
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyBPMS0fXXdsUF7NxGxkv_9bH7yeUcW-MyI",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "webrtisan-b012d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "webrtisan-b012d",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "webrtisan-b012d.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "567567436169",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:567567436169:web:70d034b604f3354189f958",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-91T6B53MJB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
