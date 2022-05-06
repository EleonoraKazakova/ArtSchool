import InputField from "../InputField";
import form from "../../data/logInForm.json";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../scripts/firebaseAuth";
import { useUID } from "../../state/UIDProvider";
import "../../styles/login.sass";

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
    <div className="login-grid">
      <div className="login-content">
        <h2 className="login-title">Please login to access to our platform.</h2>
        <form onSubmit={onLogin} className="login-form">
          <InputField setup={form.email} state={[email, setEmail]} />
          <InputField setup={form.password} state={[password, setPassword]} />
          <div className="login-button">
            <button className="button-small">Submit</button>
          </div>
        </form>
        <div className="login-block">
          <p className="login-title">
            Haven't you regestered yet? Then click here.
          </p>
          <button className="button-small">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
        <div className="login-block">
          <p className="login-title">
            Did you forget your password? Then click here.
          </p>
          <button className="button">
            <Link to="/recover-password">Recover password</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
