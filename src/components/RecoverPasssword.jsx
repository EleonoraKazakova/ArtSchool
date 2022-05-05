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
    <div className="login-grid">
      <div className="login-content">
        <h2>Please login to access to our platform.</h2>
        <form onSubmit={onRecover} className="login-form">
          <InputField setup={form.email} state={[email, setEmail]} />

          <div className="login-button">
            <button className="button">Recover password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
