import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNE2fE3aZS-aA-_Uj1WrmqF333fRccqPI",
  authDomain: "lmsart-df84d.firebaseapp.com",
  projectId: "lmsart-df84d",
  storageBucket: "lmsart-df84d.appspot.com",
  messagingSenderId: "371336789707",
  appId: "1:371336789707:web:e9256dea146bd9eec8e54e",
};

const firebaseapp = initializeApp(firebaseConfig);
export const fireStore = getFirestore(firebaseapp);

export const cloudStorage = getStorage(firebaseapp);
export const authentication = getAuth(firebaseapp);
