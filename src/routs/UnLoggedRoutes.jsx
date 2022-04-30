import { Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import WelcomePage from "../components/WelcomePage";

export default function UnLoggedRoutes({ uidState }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp uidState={uidState} />} />
        <Route path="/login" element={<LogIn uidState={uidState} />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}
