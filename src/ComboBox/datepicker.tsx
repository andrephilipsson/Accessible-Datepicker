import { useRef, useState } from "react";
import Calendar from "../calendar";
import { isValidDate, toDateString } from "../date";
import { handlePopup } from "./state";
import "./styles.css";
import { VisuallyHidden } from "../VisuallyHidden";

export default function DatePicker() {
  const [isOpen, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const enterRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [date, _setDate] = useState<Date | null>(new Date());
  const [value, setValue] = useState("");
  const { popupRef, buttonRef } = handlePopup(() => setOpen(false));

  function setDateInCalendar(date: Date | null) {
    _setDate(date);
    setValue(date ? toDateString(date) : "");
    setOpen(false);
    setErrorMessage("");
    inputRef.current?.focus();
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
        if (!isValidDate(value)) {
          setErrorMessage("Datum måste vara i formatet åååå-mm-dd.");
          return;
        }
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
      <label htmlFor="date-input" className="input-label">
        Välj ett datum
        <VisuallyHidden>
          Skriv in ett datum i formatet åååå-mm-dd eller välj ett datum i
          kalendern.
        </VisuallyHidden>
      </label>
      <div>
        <div className="input-group">
          <input
            id="date-input"
            ref={inputRef}
            type="text"
            value={value}
            placeholder={toDateString(new Date())}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? "date-error" : ""}
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
              viewBox="0 0 24 24"
              fill="currentColor"
              width={24}
              height={24}
            >
              <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

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
      </div>
      {isOpen && (
        <div
          id="calendar-popup"
          ref={popupRef}
          className="calendar-popup"
          role="dialog"
          aria-modal="true"
          aria-label="Välj ett datum i kalendern"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Calendar onChange={setDateInCalendar} defaultValue={date} />
          </div>
        </div>
      )}
    </>
  );
}
