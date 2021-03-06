import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { UIDProvider } from "./state/UIDProvider";
import React from "react";
import "./styles/index.sass";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <UIDProvider>
    <App />
  </UIDProvider>
);

reportWebVitals();
