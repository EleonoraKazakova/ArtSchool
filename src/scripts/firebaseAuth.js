import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authentication } from "./firesbase";

export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    authentication,
    email,
    password
  );

  return userCredential.user.uid;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(
    authentication,
    email,
    password
  );

  return userCredential.user.uid;
}

export async function recoverUser(email) {
  await sendPasswordResetEmail(authentication, email);
}

export async function currentUser() {
  const currentUser = authentication.currentUser;
  console.log("currentUser:", currentUser);
  return currentUser;
}
