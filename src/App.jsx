import "./styles/app.sass";
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
