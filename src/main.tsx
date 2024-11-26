import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePicker from "./DatePicker.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DatePicker />
  </StrictMode>,
);
