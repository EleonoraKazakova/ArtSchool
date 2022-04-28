import { useState } from "react";
import { createUser } from "../scripts/firebaseAuth";
import { addDocumentWithId } from "../scripts/fireStore";
import InputField from "./InputField";
import signUpForm from "../data/signUpForm.json";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onCreate(event) {
    event.preventDefault();

    const newUID = await createUser(email, password);

    const newUser = { name: name };

    const payload = await addDocumentWithId("users", newUID, newUser);
    console.log("payload.error:", payload.error);
    if (payload.error) alert("Couldn't create user");
    else navigate("/homepage");
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
