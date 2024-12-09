import { useEffect, useRef } from "react";
import { isSameMonth, isToday } from "../date";
import { CalendarState, useCalendarState } from "./state";
import "./styles.css";
import { toAriaLabel } from "./utils";
import { CalendarProps } from "./types";

export function Calendar(props: CalendarProps) {
  let state = useCalendarState(props);

  return (
    <>
      <div data-live-announcer="true" className="calendar-Hidden">
        <div
          id="live-assertive"
          role="log"
          aria-live="assertive"
          aria-relevant="additions"
        ></div>
        <div
          id="live-polite"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        ></div>
      </div>

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
              aria-label="Previous month" // TODO: Localize
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
              aria-label="Next month" // TODO: Localize
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
          tabIndex={-1}
          onKeyDown={state.handleKeys}
          className="calendar-Table"
        >
          <thead aria-hidden="true">
            <tr>
              {state.weeks[0].map((day, idx) => (
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
          <tbody onBlur={() => state.setFocusedDate(null)}>
            {state.weeks.map((week, idx) => (
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
            aria-label="Next month"
            tabIndex={-1}
            onClick={state.navigateNextMonth}
          ></button>
        </div>
      </div>
    </>
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
        state.setInternalFocus(day);
        state.setValue(day);
      }}
      onFocus={() => state.setFocusedDate(day)}
      data-focused={state.isFocused(day)}
      data-selected={state.isSelected(day)}
      aria-selected={state.isSelected(day)}
      data-today={isToday(day)}
    >
      <span
        ref={ref}
        role="button"
        aria-label={
          toAriaLabel(day) + (state.isSelected(day) ? " selected" : "")
        }
        tabIndex={state.dateTabIndex(day)}
        onContextMenu={(event) => event.preventDefault()}
      >
        {day.getDate()}
      </span>
    </td>
  );
}
