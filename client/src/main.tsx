import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "../../node_modules/primereact/resources/themes/lara-light-green/theme.css";
import "../../node_modules/primeflex/primeflex.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
