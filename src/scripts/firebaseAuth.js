import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "./firesbase";

export async function createUser(email, password) {
  const userCredantial = createUserWithEmailAndPassword(
    authentication,
    email,
    password
  );

  console.log("userCredantial:", userCredantial);
  return userCredantial.user.uid;
}
