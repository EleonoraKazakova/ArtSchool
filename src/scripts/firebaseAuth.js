import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firesbase";

export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(
    authentication,
    email,
    password
  );

  return userCredential.user.uid;
}
