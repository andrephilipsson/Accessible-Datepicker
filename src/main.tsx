import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Calendar } from "./DatePicker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Calendar />
  </StrictMode>,
);
