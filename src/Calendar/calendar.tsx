import { useEffect, useRef } from "react";
import { isSameMonth, weeksInMonth } from "./date";
import { CalendarState, useCalendarState } from "./state";
import "./styles.css";
import { toAriaLabel } from "./utils";

export function Calendar() {
  let state = useCalendarState();

  let weeks = weeksInMonth(state.current);

  return (
    <div
      aria-label={`Calendar, ${state.current.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`}
      role="application"
    >
      <div className="calendar-Hidden">
        <h2>
          {`Calendar, ${state.current.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}`}
        </h2>
      </div>
      <div className="calendar-Heading">
        <button
          onClick={state.navigatePreviousMonth}
          className="calendar-NavigationButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-label="Previous" // TODO: Localize
            focusable="false"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h2 aria-hidden="true">
          {state.current.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={state.navigateNextMonth}
          className="calendar-NavigationButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-label="Next" // TODO: Localize
            focusable="false"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <table
        role="grid"
        aria-label={state.current.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
        tabIndex={-1} // TODO: Makes react listen to key events. But does it hurt accessibility?
        onKeyDown={state.handleKeys}
        className="calendar-Table"
      >
        <thead aria-hidden="true">
          <tr>
            {weeks[0].map((day, idx) => (
              <th key={idx} className="calendar-Weekday">
                <span>
                  {day.toLocaleString(undefined, {
                    weekday: "narrow",
                  })}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, idx) => (
            <tr key={idx}>
              {week.map((day) =>
                isSameMonth(state.current, day) ? (
                  <DayCell state={state} day={day} key={day.toString()} />
                ) : (
                  <td key={day.toString()} />
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="calendar-Hidden">
        <button
          aria-label="Next"
          tabIndex={-1}
          onClick={state.focusNextWeek}
        ></button>
      </div>
    </div>
  );
}

function DayCell({ state, day }: { state: CalendarState; day: Date }) {
  let ref = useRef<HTMLSpanElement>(null);
  let isFocused = state.isFocused(day);

  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus();
    }
  }, [isFocused, ref]);

  return (
    <td
      role="gridcell"
      className="calendar-Day"
      key={day.toString()}
      onClick={() => {
        state.setFocusedDate(day);
        state.setValue(day);
      }}
      data-focused={state.isFocused(day)}
      data-selected={state.isSelected(day)}
    >
      <span
        ref={ref}
        role="button"
        aria-label={toAriaLabel(day)}
        tabIndex={state.isFocused(day) ? 0 : -1}
      >
        {day.getDate()}
      </span>
    </td>
  );
}