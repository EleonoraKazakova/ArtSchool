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
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}
