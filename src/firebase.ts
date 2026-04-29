import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Official EcoVerse Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_If_7vQzBJyzb8P92AAB1waDaJiuD5wY",
  authDomain: "environment-7bf4c.firebaseapp.com",
  projectId: "environment-7bf4c",
  storageBucket: "environment-7bf4c.firebasestorage.app",
  messagingSenderId: "393661757280",
  appId: "1:393661757280:web:9893a4bedf68426aa15005",
  measurementId: "G-Q8XB3YD03M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Analytics - Only initialized if supported in current environment
export let analytics: Analytics | null = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export default app;
