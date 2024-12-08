// skicka med onSelect = date som props till Calendar
import { useState } from "react";
import { Calendar } from "../Calendar";
import { useOutsideClick } from './state';

export default function DatePicker() {
    const [isOpen, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const today = thisDay();
    const [date, setDate] = useState(today);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const popupRef = useOutsideClick(() => setOpen(false));

    function handleKeyPress(e: React.KeyboardEvent) {
        if (e.key === 'Enter' && dateRegex.test(date)) {
            e.preventDefault();
            e.stopPropagation();
            //onDateSelect(date);
            setOpen(true);
        }
    }

    function toggleCalendar() {
        setOpen((prev) => !prev);
    }

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        setDate(event.currentTarget.value);

        if (!dateRegex.test(date)) {
            setErrorMessage("Date must be in the format yyyy-mm-dd.")
        }
    }

    function thisDay(): string {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    }

    return (
        <>
            <input
                type="text"
                value={date}
                placeholder={today}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-invalid={!!errorMessage}
                style={{ width: "250px", padding: "6px", fontSize: "16px" }}
            />
            <button
                type="button"
                onClick={toggleCalendar}
                aria-label="Toggle calendar"
                style={{
                    background: "none",
                    border: "none",
                    padding: "0",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    role="image"
                >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7v-5z" />
                </svg>
            </button >
            {isOpen && (
                <div
                    ref={popupRef}
                    className="calendar-popup"
                    role="dialog"
                    aria-label="Select a date"
                    style={{
                        border: "1px solid #ccc",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Calendar />
                    {/* <Calendar onChange={onDateSelect} /> */}
                </div>)}
        </>
    )
}