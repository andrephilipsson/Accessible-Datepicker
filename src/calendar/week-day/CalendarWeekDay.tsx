import { DEFAULT_LOCALE } from "../../locale";

interface CalendarWeekDayProps {
  className?: string;
  day: Date;
}

export function CalendarWeekDay(props: CalendarWeekDayProps) {
  let className = props.className || "accessible-calendar-WeekDay";
  return (
    <th className={className}>
      <span>
        {props.day.toLocaleString(DEFAULT_LOCALE, {
          weekday: "short",
        })}
      </span>
    </th>
  );
}
