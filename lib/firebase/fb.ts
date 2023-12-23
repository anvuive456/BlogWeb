// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ9vroXBOLdnod3Ms28PFA1Zwwa_-rQik",
  authDomain: "web-blog-6b1e6.firebaseapp.com",
  projectId: "web-blog-6b1e6",
  storageBucket: "web-blog-6b1e6.appspot.com",
  messagingSenderId: "602799415991",
  appId: "1:602799415991:web:f716cf130db3b6aaf76332"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export  const storage = getStorage(firebaseApp);
