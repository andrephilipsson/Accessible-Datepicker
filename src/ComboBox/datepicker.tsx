import { useRef, useState } from "react";
import { Calendar } from "../calendar";
import { isValidDate, toDateString } from "../date";
import { handlePopup } from "./state";
import "./styles.css";

export default function DatePicker() {
  const [isOpen, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const enterRef = useRef(false);
  const [date, _setDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState("");
  const { popupRef, buttonRef } = handlePopup(() => setOpen(false));

  function setDateInCalendar(date: Date | null) {
    _setDate(date);
    setValue(date ? toDateString(date) : "");
    setOpen(false);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        setOpen(!errorMessage ? true : false);
        break;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setValue("");
        _setDate(null);
        break;
      case "Enter":
        enterRef.current = true;
        break;
    }
  }

  function toggleCalendar() {
    setOpen((prev) => !prev);
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const input = event.currentTarget.value;
    setValue(input);

    if (!isValidDate(input)) {
      if (enterRef.current)
        setErrorMessage("Datum måste vara i formatet åååå-mm-dd.");
      return;
    }

    _setDate(new Date(input));
    setErrorMessage("");
  }

  return (
    <>
      <h1>Välj ett datum</h1>
      <p id="date-input">Skriv in ett datum i formatet åååå-mm-dd eller välj ett datum i kalendern.</p>
      <input
        id="date-input"
        type="text"
        value={value}
        placeholder={toDateString(new Date())}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? "date-error" : "date-input"}
        className={errorMessage ? "input-error" : "input-normal"}
      />
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleCalendar}
        className="toggle-button"
        aria-label={isOpen ? "Stäng kalender" : "Öppna kalender"}
        aria-controls="calendar-popup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="22"
          focusable="false"
          role="img"
          aria-hidden="true"
        >
          <path
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7v-5z" />
        </svg>
      </button>

      {errorMessage && (
        <div
          id="date-error"
          className="error"
          aria-live="polite"
          role="alert"
          aria-label={errorMessage}
        >
          {errorMessage}
        </div>
      )}
      {isOpen && (
        <div
          id="calendar-popup"
          ref={popupRef}
          className="calendar-popup"
          role="dialog"
          aria-modal="true"
          aria-label="Välj ett datum i kalendern"
        >
          <Calendar onChange={setDateInCalendar} defaultValue={date} />
        </div>
      )}
    </>
  );
}
