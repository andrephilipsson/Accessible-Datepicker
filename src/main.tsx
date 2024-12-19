import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DatePicker from "./ComboBox/datepicker";
import { AriaLiveProvider } from "./live/aria-live";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1 style={{ fontSize: "22px" }}>Tillgänglig datumväljare</h1>

    <p style={{ marginTop: "12px", marginBottom: "48px" }}>
      Se koden{" "}
      <a href="https://github.com/andrephilipsson/Accessible-Datepicker">
        på GitHub
      </a>
    </p>

    <AriaLiveProvider>
      <DatePicker />
    </AriaLiveProvider>
  </StrictMode>,
);
