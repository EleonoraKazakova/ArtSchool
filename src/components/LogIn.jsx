import InputField from "./InputField";
import form from "../data/logInForm.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../scripts/firebaseAuth";

export default function LogIn({ uidState }) {
  const navigate = useNavigate();
  const [uid, setUid] = uidState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin(event) {
    event.preventDefault();
    const returningUID = await loginUser(email, password);
    if (returningUID) {
      setUid(returningUID);
      navigate("/homepage");
    } else alert("Could not login, try again");
  }

  return (
    <div>
      <p>Please login to access to our platform.</p>
      <form onSubmit={onLogin}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Submit</button>
      </form>
    </div>
  );
}
