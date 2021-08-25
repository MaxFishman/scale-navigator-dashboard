import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiTTX24mBjypGdel2ARBx0UUvFQEaRDf4",
  authDomain: "scale-navigator-ensemble.firebaseapp.com",
  databaseURL: "https://scale-navigator-ensemble-default-rtdb.firebaseio.com",
  projectId: "scale-navigator-ensemble",
  storageBucket: "scale-navigator-ensemble.appspot.com",
  messagingSenderId: "156837833740",
  appId: "1:156837833740:web:ce00fcf2297f899f8b9229",
  measurementId: "G-5G2C3541ZY",
};

const app = firebase.initializeApp(firebaseConfig);
let db = app.firestore();

export { app, db };
