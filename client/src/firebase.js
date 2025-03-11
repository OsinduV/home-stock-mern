// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "nwesest.firebaseapp.com",
//   projectId: "nwesest",
//   storageBucket: "nwesest.firebasestorage.app",
//   messagingSenderId: "796049688354",
//   appId: "1:796049688354:web:dc49955cb62ec6a040077b",
//   measurementId: "G-XFKGE5G5TR",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// --------------OSINDU----------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OSINDU_FIREBASE_API_KEY,
  authDomain: "life-home-stock.firebaseapp.com",
  projectId: "life-home-stock",
  storageBucket: "life-home-stock.firebasestorage.app",
  messagingSenderId: "32394887887",
  appId: "1:32394887887:web:2e36e265b92c2ea386edba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);