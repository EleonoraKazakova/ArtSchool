import { Routes, Route } from "react-router-dom";
import "./App.sass";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { useState } from "react";
import LoggedRoutes from "./routs/LoggedRoutes";
import UnLoggedRoutes from "./routs/UnLoggedRoutes";
import { BrowserRouter, Link } from "react-router-dom";

function App() {
  const [uid, setUid] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <BrowserRouter>
        {uid && <LoggedRoutes uidState={[uid, setUid]} />}
        {!uid && <UnLoggedRoutes uidState={[uid, setUid]} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
