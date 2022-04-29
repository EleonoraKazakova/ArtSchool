import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firesbase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
