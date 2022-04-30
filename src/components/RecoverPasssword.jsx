import InputField from "./InputField";
import form from "../data/recoverPasswordForm.json";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { recoverUser } from "../scripts/firebaseAuth";

export default function RecoverPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  async function onRecover(event) {
    event.preventDefault();
    await recoverUser(email);
    alert(`We sent an email to ${email}`);
  }

  return (
    <div>
      <p>Please login to access to our platform.</p>
      <form onSubmit={onRecover}>
        <InputField setup={form.email} state={[email, setEmail]} />

        <button>Recover password</button>
      </form>
    </div>
  );
}
