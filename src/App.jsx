import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
