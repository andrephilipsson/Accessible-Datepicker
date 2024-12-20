import { useState } from "react";
import {
  endOfMonth,
  isSameDay,
  isSameMonth,
  nextDay,
  nextMonth,
  nextWeek,
  previousDay,
  previousMonth,
  previousWeek,
  startOfMonth,
  weeksInMonth,
} from "../date";
import { toAriaLabel } from "./utils";
import { CalendarProps } from "./types";
import { useAriaLive } from "../live/aria-live";
import { DEFAULT_LOCALE } from "../locale";

export function useCalendarState(props: CalendarProps) {
  let { announce } = useAriaLive();
  let initialMonth = props.defaultValue || new Date();
  let [currentMonth, setCurrentMonth] = useState<Date>(initialMonth); // The first day of the month that is currently displayed
  let [value, setValue] = useState<Date | null>(props.defaultValue ?? null); // The currently selected date
  let [focusedDate, _setFocusedDate] = useState<Date | null>(
    props.defaultValue,
  ); // The date that currently has focus
  let [internalFocus, setInternalFocus] = useState<Date>(initialMonth);
  let weeks = weeksInMonth(currentMonth);

  function setFocusedDate(
    date: Date | null | ((prev: Date | null) => Date | null),
  ) {
    if (typeof date === "function") {
      _setFocusedDate((prev) => {
        let newDate = date(prev);
        if (newDate) setInternalFocus(newDate);
        return newDate;
      });
      return;
    }
    _setFocusedDate(date);
    if (date) setInternalFocus(date);
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

  function _setValue(date: Date | null) {
    setValue(date);

    if (props.onChange) props.onChange(date);

    if (date)
      announce(`Selected: ${toAriaLabel(date)}`, {
        live: "polite",
        timeout: 4000,
      });
  }

  return {
    value,
    setValue: _setValue,
    current: currentMonth,
    setInternalFocus,
    navigatePreviousMonth() {
      setCurrentMonth((month) => previousMonth(month));
      setInternalFocus((date) => previousMonth(date));

      announce(
        new Intl.DateTimeFormat(DEFAULT_LOCALE, {
          month: "long",
          year: "numeric",
        }).format(previousMonth(currentMonth)),
        {
          live: "assertive",
        },
      );
    },
    navigateNextMonth() {
      setCurrentMonth((month) => nextMonth(month));
      setInternalFocus((date) => nextMonth(date));

      announce(
        new Intl.DateTimeFormat(DEFAULT_LOCALE, {
          month: "long",
          year: "numeric",
        }).format(nextMonth(currentMonth)),
        { live: "assertive" },
      );
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
    dateTabIndex(date: Date) {
      return isSameDay(date, internalFocus) ? 0 : -1;
    },
    isInternalFocus(date: Date) {
      return isSameDay(date, internalFocus);
    },
    setFocusedDate,
    focusPreviousDay,
    focusNextDay,
    focusPreviousWeek,
    focusNextWeek,
    weeks,
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
          setFocusedDate((date) => previousMonth(date || currentMonth));
          break;
        case "PageDown":
          e.preventDefault();
          e.stopPropagation();
          setCurrentMonth((month) => nextMonth(month));
          setFocusedDate((date) => nextMonth(date || currentMonth));
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
        case "Escape":
          e.preventDefault();
          e.stopPropagation();
          props.onChange(value);
          break;
      }
    },
  };
}

export type CalendarState = ReturnType<typeof useCalendarState>;
