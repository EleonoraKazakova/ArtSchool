import "./App.sass";
import { useState } from "react";
import LoggedRoutes from "./routs/LoggedRoutes";
import UnLoggedRoutes from "./routs/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

function App() {
  const { uid } = useUID();
  return (
    <div className="app-grid">
      <BrowserRouter>
        <NavigationBar />
        <div className="app-content ">
          {uid && <LoggedRoutes />}
          {!uid && <UnLoggedRoutes />}
        </div>
      </BrowserRouter>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
