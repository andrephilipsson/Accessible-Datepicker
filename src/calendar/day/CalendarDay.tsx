import { useEffect, useRef, useState } from "react";
import { CalendarState } from "../state";
import { isToday } from "../../date";
import { toAriaLabel } from "../utils";

interface CalendarDayProps {
  className?: string;
  state: CalendarState;
  day: Date;
}

export function CalendarDay(props: CalendarDayProps) {
  let className = props.className || "accessible-calendar-Day";
  let { state, day } = props;

  let ref = useRef<HTMLSpanElement>(null);
  let isFocused = state.isFocused(day);
  let [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.focus();
    }
  }, [isFocused, ref]);

  return (
    <td
      role="gridcell"
      className={className}
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
      data-hovered={hovered}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") {
          setHovered(true);
        }
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <span
        ref={ref}
        role="button"
        aria-label={
          (isToday(day) ? "Today, " : "") +
          toAriaLabel(day) +
          (state.isSelected(day) ? " selected" : "")
        }
        tabIndex={state.dateTabIndex(day)}
        onContextMenu={(event) => event.preventDefault()}
      >
        {day.getDate()}
      </span>
    </td>
  );
}
