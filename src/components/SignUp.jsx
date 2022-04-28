import { useState } from "react";
import { createUser } from "../scripts/firebaseAuth";
import { addDocumentWithId } from "../scripts/fireStore";
import InputField from "./InputField";
import signUpForm from "../data/signUpForm.json";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onCreate(event) {
    event.preventDefault();
    const newUID = await createUser(email, password);
    const newUser = { name: name };
    await addDocumentWithId("users", newUID, newUser);
  }

  return (
    <div>
      <h1>Create accaunt</h1>
      <form onSubmit={onCreate}>
        <InputField setup={signUpForm.name} state={[name, setName]} />
        <InputField setup={signUpForm.email} state={[email, setEmail]} />
        <InputField
          setup={signUpForm.password}
          state={[password, setPassword]}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
