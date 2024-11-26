import { useEffect, useRef } from "react";
import { isSameMonth, weeksInMonth } from "./date";
import { CalendarState, useCalendarState } from "./state";
import "./styles.css";
import { toAriaLabel } from "./utils";

export function Calendar() {
  let state = useCalendarState();

  let weeks = weeksInMonth(state.current);

  return (
    <div>
      {state.value?.toLocaleString()}
      <div className="calendar-Heading">
        <button onClick={state.navigatePreviousMonth}>Prev</button>
        <h2>
          {state.current.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={state.navigateNextMonth}>Next</button>
      </div>

      <table
        role="grid"
        aria-label={state.current.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
        tabIndex={-1} // Makes react listen to key events. But does it hurt accessibility?
        onKeyDown={state.handleKeys}
      >
        <thead aria-hidden="true">
          <tr>
            {weeks[0].map((day, idx) => (
              <th key={idx}>
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
