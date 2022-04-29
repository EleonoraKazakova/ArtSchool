import { Link } from "react-router-dom";
import "../styles/welcomePage.sass";

export default function WelcomePage() {
  return (
    <div className="welcompage-content">
      <h1>Welcome</h1>
      <Link to="/login"> Login</Link>
      <Link to="/signup">Sign up </Link>
    </div>
  );
}
