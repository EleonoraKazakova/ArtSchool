import InputField from "./InputField";
import form from "../data/logInForm.json";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../scripts/firebaseAuth";
import { useUID } from "../state/UIDProvider";

export default function LogIn() {
  const navigate = useNavigate();
  const { setUID } = useUID();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin(event) {
    event.preventDefault();
    const returningUID = await loginUser(email, password);
    if (returningUID) {
      setUID(returningUID);
      navigate("/");
    } //else alert("Could not login, try again");
  }

  return (
    <div>
      <p>Please login to access to our platform.</p>
      <form onSubmit={onLogin}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Submit</button>
      </form>
      <p>Did you forget your password? Then click here.</p>
      <Link to="/recover-password">Recover password</Link>
    </div>
  );
}
