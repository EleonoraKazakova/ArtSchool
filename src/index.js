import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UIDProvider } from "./state/UIDProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UIDProvider>
      <App />
    </UIDProvider>
  </React.StrictMode>
);

reportWebVitals();
