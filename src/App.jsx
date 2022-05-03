import "./App.sass";
import { useState } from "react";
import LoggedRoutes from "./routs/LoggedRoutes";
import UnLoggedRoutes from "./routs/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";
import NavigationBar from "./components/NavigationBar";

function App() {
  const { uid } = useUID();
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        {uid && <LoggedRoutes />}
        {!uid && <UnLoggedRoutes />}
      </BrowserRouter>
    </div>
  );
}

export default App;
