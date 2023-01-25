// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS4saE4v5haqiTt6CsbgrV1dMRgJt6U3k",
  authDomain: "netme-nkvi.firebaseapp.com",
  projectId: "netme-nkvi",
  storageBucket: "netme-nkvi.appspot.com",
  messagingSenderId: "676185923968",
  appId: "1:676185923968:web:1b9ea2a28f2315afee2165",
  measurementId: "G-FDH2DJBFVN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
console.log({app});