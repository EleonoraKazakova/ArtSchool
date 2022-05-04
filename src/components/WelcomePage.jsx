import { Link } from "react-router-dom";
import "../styles/welcomePage.sass";
import Welcome from "../images/welcome.jpg";

export default function WelcomePage() {
  return (
    <div className="welcompage-content">
      <h1>Welcome</h1>
      <img src={Welcome} />
    </div>
  );
}
