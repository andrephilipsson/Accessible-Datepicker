import { useState } from "react";
import {
  isSameMonth,
  nextDay,
  nextMonth,
  nextWeek,
  previousDay,
  previousMonth,
  previousWeek,
} from "./date";

export function useCalendarState() {
  let [currentMonth, setCurrentMonth] = useState<Date>(new Date()); // The first day of the month that is currently displayed
  let [value, setValue] = useState<Date | null>(null); // The currently selected date
  let [focusedDate, setFocusedDate] = useState<Date | null>(null); // The date that currently has focus

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

  return {
    value,
    setValue,
    current: currentMonth,
    navigatePreviousMonth() {
      setCurrentMonth((month) => previousMonth(month));
    },
    navigateNextMonth() {
      setCurrentMonth((month) => nextMonth(month));
    },
    isFocused(date: Date) {
      if (!focusedDate) return false;

      return (
        date.getFullYear() === focusedDate.getFullYear() &&
        date.getMonth() === focusedDate.getMonth() &&
        date.getDate() === focusedDate.getDate()
      );
    },
    setFocusedDate(date: Date) {
      setFocusedDate(date);
    },
    focusPreviousDay,
    focusNextDay,
    focusPreviousWeek,
    focusNextWeek,
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
        case "Enter":
        case " ":
          e.preventDefault();
          e.stopPropagation();
          setValue(focusedDate);
          break;
      }
    },
  };
}

export type CalendarState = ReturnType<typeof useCalendarState>;
