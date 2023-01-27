// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const AUTH_ERROR_MAP = {
  "auth/invalid-email": "The email address is not valid",
  "auth/user-disabled":
    "The user corresponding to the given email has been disabled",
  "auth/user-not-found": "There is no user corresponding to the given email",
  "auth/wrong-password": "The password is invalid for the given email",
  "auth/email-already-in-use":
    "There already exists an account with the given email address.",
  "auth/weak-password": "The password is not strong enough.",
  "auth/account-exists-with-different-credential":
    "There already exists an account with the email address asserted by the credential",
};
export const firebaseAuth = getAuth(app);
firebaseAuth.useDeviceLanguage();
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("repo");

export const firestore = getFirestore(app);
export const channelColRef = collection(firestore, "channels");
export const userProfileColRef = collection(firestore, "userProfiles");

export const storage = getStorage(app);
export const getStorageRef = (filename = "") =>
  ref(storage, `images/${filename}`);
