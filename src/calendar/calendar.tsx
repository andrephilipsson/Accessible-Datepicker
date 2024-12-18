import { useCalendarState } from "./state";
import "./styles.css";
import { CalendarProps } from "./types";
import { CalendarWeek } from "./week/CalendarWeek";
import { CalendarWeekDay } from "./week-day/CalendarWeekDay";
import { VisuallyHidden } from "../VisuallyHidden";
import { DEFAULT_LOCALE } from "../locale";
import { capitalize } from "./utils";

export function Calendar(props: CalendarProps) {
  let state = useCalendarState(props);

  return (
    <>
      <div
        aria-label={`Calendar, ${state.current.toLocaleString(DEFAULT_LOCALE, {
          month: "long",
          year: "numeric",
        })}`}
        role="application"
      >
        {/* <VisuallyHidden>
          <h2>
            {`Calendar, ${state.current.toLocaleString(DEFAULT_LOCALE, {
              month: "long",
              year: "numeric",
            })}`}
          </h2>
        </VisuallyHidden> */}
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
            {capitalize(
              state.current.toLocaleString(DEFAULT_LOCALE, {
                month: "long",
                year: "numeric",
              }),
            )}
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
          aria-label={state.current.toLocaleString(DEFAULT_LOCALE, {
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
                <CalendarWeekDay key={idx} day={day} />
              ))}
            </tr>
          </thead>
          <tbody onBlur={() => state.setFocusedDate(null)}>
            {state.weeks.map((week, idx) => (
              <CalendarWeek key={idx} state={state} week={week} />
            ))}
          </tbody>
        </table>

        {/* <div className="calendar-Hidden">
          <button
            aria-label="Next month"
            tabIndex={-1}
            onClick={state.navigateNextMonth}
          ></button>
        </div> */}
      </div>
    </>
  );
}
