import { Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import WelcomePage from "../components/WelcomePage";
import RecoverPassword from "../components/RecoverPasssword";

export default function UnLoggedRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}
