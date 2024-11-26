import { createContext, useContext, useState } from "react";
import "./styles.css";
import { nextMonth, previousMonth, weeksInMonth } from "./date";
import { toFullDate } from "./aria";

type CalendarContextType = { currentMonth: Date; setCurrentMonth: Function };
const CalendarContext = createContext<CalendarContextType | null>(null);

function useCalendarContext() {
  const ctx = useContext(CalendarContext);

  if (!ctx) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider",
    );
  }

  return ctx;
}

function CalendarProvider({ children }: React.PropsWithChildren) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <CalendarContext.Provider value={{ currentMonth, setCurrentMonth }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function Calendar() {
  return (
    <CalendarProvider>
      <CalendarImplementation />
    </CalendarProvider>
  );
}

function CalendarImplementation() {
  const { currentMonth } = useCalendarContext();

  const weeks = weeksInMonth(currentMonth);

  return (
    <CalendarProvider>
      <Header />

      <table>
        <thead>
          <tr>
            {weeks[0].map((day) => (
              <Weekday day={day} />
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <Week week={week} />
          ))}
        </tbody>
      </table>
    </CalendarProvider>
  );
}

function PreviousButton() {
  const { currentMonth, setCurrentMonth } = useCalendarContext();

  const handleClick = () => setCurrentMonth(previousMonth(currentMonth));

  return <button onClick={handleClick}>{"<"}</button>;
}

function NextButton() {
  const { currentMonth, setCurrentMonth } = useCalendarContext();

  const handleClick = () => setCurrentMonth(nextMonth(currentMonth));

  return <button onClick={handleClick}>{">"}</button>;
}

function DateTitle() {
  const { currentMonth } = useCalendarContext();

  return (
    <h2 aria-hidden="true">
      {currentMonth.toLocaleString("default", { month: "long" }) +
        " " +
        currentMonth.toLocaleString("default", { year: "numeric" })}
    </h2>
  );
}

function Header() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <PreviousButton />
      <DateTitle />
      <NextButton />
    </div>
  );
}

function Weekday({ day }: { day: Date }) {
  return (
    <th key={day.toString()}>
      <span>
        {day.toLocaleString("default", { weekday: "long" }).charAt(0)}
      </span>
    </th>
  );
}

function Week({ week }: { week: Date[] }) {
  return (
    <tr>
      {week.map((day) => (
        <Day date={day} />
      ))}
    </tr>
  );
}

function Day({ date }: { date: Date }) {
  return (
    <td role="gridcell" className="day" key={date.toString()}>
      <span role="button" aria-label={toFullDate(date)} tabIndex={-1}>
        <span>{date.getDate()}</span>
      </span>
    </td>
  );
}
