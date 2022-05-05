import { useState } from "react";
import { createUser } from "../scripts/firebaseAuth";
import { addDocumentWithId } from "../scripts/fireStore";
import InputField from "./InputField";
import form from "../data/signUpForm.json";
import { useNavigate } from "react-router-dom";
import { useUID } from "../state/UIDProvider";
import "../styles/login.sass";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUID } = useUID();

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
      setUID(newUID);
      navigate("/homepage");
    }
  }

  return (
    <div className="login-grid">
      <div className="login-content">
        <h1>Create account</h1>
        <form onSubmit={onCreate} className="login-form">
          <InputField setup={form.name} state={[name, setName]} />
          <InputField setup={form.email} state={[email, setEmail]} />
          <InputField setup={form.password} state={[password, setPassword]} />
          <div className="login-button">
            <button className="button-small">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
