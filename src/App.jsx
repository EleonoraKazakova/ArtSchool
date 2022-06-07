import "./styles/app.sass";
import LoggedRoutes from "./routes/LoggedRoutes";
import UnLoggedRoutes from "./routes/UnLoggedRoutes";
import { BrowserRouter } from "react-router-dom";
import { useUID } from "./state/UIDProvider";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";

export function App() {
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
