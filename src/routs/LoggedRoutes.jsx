import { Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import WelcomePage from "../components/WelcomePage";

export default function LoggedRoutes({ uidState }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp uidState={uidState} />} />
        <Route path="/homepage" element={<HomePage uidState={uidState} />} />
        <Route path="/login" element={<LogIn uidState={uidState} />} />
      </Routes>
    </div>
  );
}
