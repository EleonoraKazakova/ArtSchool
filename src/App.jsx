import "./styles/app.sass";
import LoggedRoutes from "./routs/LoggedRoutes";
import UnLoggedRoutes from "./routs/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

// -1 for not using export default here...
// -1 for typo in routes. Is ok to have typos in text but not on folders or variable names.
function App() {
  const { uid } = useUID();
  return (
    <div className="app-grid">
      <BrowserRouter>
        <NavigationBar />
        <main className="app-content ">
          {uid && <LoggedRoutes />}
          {!uid && <UnLoggedRoutes />}
        </main>
      </BrowserRouter>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
