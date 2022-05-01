import { UIDProvider } from "./state/UIDProvider";
import "./App.sass";
import { useState } from "react";
import LoggedRoutes from "./routs/LoggedRoutes";
import UnLoggedRoutes from "./routs/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";

function App() {
  //const [uid, setUid] = useState(null);
  const { uid } = useUID();
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <BrowserRouter>
        {uid && <LoggedRoutes />}
        {!uid && <UnLoggedRoutes />}
      </BrowserRouter>
    </div>
  );
}

export default App;
