import { Routes, Route } from "react-router-dom";
import LogIn from "../components/LogIn";
import WelcomePage from "../components/WelcomePage";

export default function UnLoggedRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}
