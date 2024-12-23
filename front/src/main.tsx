import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/_main.scss";
import { AppRouter } from "./router/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
