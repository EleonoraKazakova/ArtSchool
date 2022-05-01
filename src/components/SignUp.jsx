import { useState } from "react";
import { createUser } from "../scripts/firebaseAuth";
import { addDocumentWithId } from "../scripts/fireStore";
import InputField from "./InputField";
import form from "../data/signUpForm.json";
import { useNavigate } from "react-router-dom";
import { useUID } from "../state/UIDProvider";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUid } = useUID();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onCreate(event) {
    event.preventDefault();

    const newUID = await createUser(email, password);

    const newUser = { name: name, type: "student" };

    const payload = await addDocumentWithId("users", newUID, newUser);
    console.log("payload.error:", payload.error);

    if (payload.error) alert("Couldn't create user");
    else {
      setUid(newUID);
      navigate("/homepage");
    }
  }

  return (
    <div>
      <h1>Create account</h1>
      <form onSubmit={onCreate}>
        <InputField setup={form.name} state={[name, setName]} />
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Submit</button>
      </form>
    </div>
  );
}
