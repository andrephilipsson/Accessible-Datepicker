import { isSameMonth } from "../../date";
import { CalendarDay } from "../day/CalendarDay";
import { CalendarState } from "../state";

interface CalendarWeekProps {
  className?: string;
  state: CalendarState;
  week: Date[];
}

export function CalendarWeek(props: CalendarWeekProps) {
  let className = props.className || "accessible-calendar-Week";
  let state = props.state;

  if (props.week.length !== 7) {
    throw new Error("CalendarWeek requires exactly 7 days");
  }

  return (
    <tr className={className}>
      {props.week.map((day) =>
        isSameMonth(state.current, day) ? (
          <CalendarDay state={props.state} day={day} key={day.toString()} />
        ) : (
          <td key={day.toString()} />
        ),
      )}
    </tr>
  );
}
