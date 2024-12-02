import { useState } from "react";
import {
  endOfMonth,
  isSameMonth,
  nextDay,
  nextMonth,
  nextWeek,
  previousDay,
  previousMonth,
  previousWeek,
  sameDayInNextMonth,
  sameDayInPreviousMonth,
  startOfMonth,
} from "./date";
import { toAriaLabel } from "./utils";

export function useCalendarState() {
  let [currentMonth, setCurrentMonth] = useState<Date>(new Date()); // The first day of the month that is currently displayed
  let [value, setValue] = useState<Date | null>(null); // The currently selected date
  let [focusedDate, setFocusedDate] = useState<Date | null>(null); // The date that currently has focus

  function announce(message: string) {
    let liveMessage = document.getElementById("live-polite") as HTMLDivElement;

    let node = document.createElement("div");
    node.textContent = message;
    liveMessage.appendChild(node);

    setTimeout(() => {
      liveMessage.removeChild(node);
    }, 4000);
  }

  function focusPreviousDay() {
    if (!focusedDate) {
      if (value) {
        setFocusedDate(value);
        return;
      }

      setFocusedDate(currentMonth);
      return;
    }

    let newDate = previousDay(focusedDate);
    if (!isSameMonth(currentMonth, newDate)) {
      setCurrentMonth((month) => previousMonth(month));
    }

    setFocusedDate(newDate);
  }

  function focusNextDay() {
    if (!focusedDate) {
      if (value) {
        setFocusedDate(value);
        return;
      }

      setFocusedDate(currentMonth);
      return;
    }

    let newDate = nextDay(focusedDate);
    if (!isSameMonth(currentMonth, newDate)) {
      setCurrentMonth((month) => nextMonth(month));
    }

    setFocusedDate(newDate);
  }

  function focusPreviousWeek() {
    if (!focusedDate) {
      if (value) {
        setFocusedDate(value);
        return;
      }

      setFocusedDate(currentMonth);
      return;
    }

    let newDate = previousWeek(focusedDate);
    if (!isSameMonth(currentMonth, newDate)) {
      setCurrentMonth((month) => previousMonth(month));
    }

    setFocusedDate(newDate);
  }

  function focusNextWeek() {
    if (!focusedDate) {
      if (value) {
        setFocusedDate(value);
        return;
      }

      setFocusedDate(currentMonth);
      return;
    }

    let newDate = nextWeek(focusedDate);
    if (!isSameMonth(currentMonth, newDate)) {
      setCurrentMonth((month) => nextMonth(month));
    }

    setFocusedDate(newDate);
  }

  function focusNextMonth() {
    setCurrentMonth(nextMonth(currentMonth));
    setFocusedDate(startOfMonth(nextMonth(currentMonth)));
  }

  function _setValue(date: Date | null) {
    setValue(date);

    if (date) announce(`Selected: ${toAriaLabel(date)}`);
  }

  return {
    value,
    setValue: _setValue,
    current: currentMonth,
    navigatePreviousMonth() {
      setCurrentMonth((month) => previousMonth(month));
    },
    navigateNextMonth() {
      setCurrentMonth((month) => nextMonth(month));
    },
    isSelected(date: Date) {
      if (!value) return false;

      return (
        date.getFullYear() === value.getFullYear() &&
        date.getMonth() === value.getMonth() &&
        date.getDate() === value.getDate()
      );
    },
    isFocused(date: Date) {
      if (!focusedDate) return false;

      return (
        date.getFullYear() === focusedDate.getFullYear() &&
        date.getMonth() === focusedDate.getMonth() &&
        date.getDate() === focusedDate.getDate()
      );
    },
    setFocusedDate,
    focusPreviousDay,
    focusNextDay,
    focusPreviousWeek,
    focusNextWeek,
    focusNextMonth,
    handleKeys(e: React.KeyboardEvent) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          e.stopPropagation();
          focusPreviousDay();
          break;
        case "ArrowRight":
          e.preventDefault();
          e.stopPropagation();
          focusNextDay();
          break;
        case "ArrowUp":
          e.preventDefault();
          e.stopPropagation();
          focusPreviousWeek();
          break;
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          focusNextWeek();
          break;
        case "PageUp":
          e.preventDefault();
          e.stopPropagation();
          setCurrentMonth((month) => previousMonth(month));
          setFocusedDate((date) =>
            sameDayInPreviousMonth(date || currentMonth),
          );
          break;
        case "PageDown":
          e.preventDefault();
          e.stopPropagation();
          setCurrentMonth((month) => nextMonth(month));
          setFocusedDate((date) => sameDayInNextMonth(date || currentMonth));
          break;
        case "Home":
          e.preventDefault();
          e.stopPropagation();
          setFocusedDate(startOfMonth(currentMonth));
          break;
        case "End":
          e.preventDefault();
          e.stopPropagation();
          setFocusedDate(endOfMonth(currentMonth));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          e.stopPropagation();
          _setValue(focusedDate);
          break;
      }
    },
  };
}

export type CalendarState = ReturnType<typeof useCalendarState>;
