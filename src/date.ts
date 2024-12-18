import { DEFAULT_LOCALE } from "./locale";

/**
 * Creates a Date object from a string in the format "YYYY-MM-DD".
 * If the string is not a valid date or is not in the correct format, returns `false`.
 * @param {string} date - The date string to parse.
 * @returns {boolean} `true` if the date string is valid, `false` otherwise.
 */
export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  let [year, month, day] = date.split("-").map(Number);
  let d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  )
    return false;

  return true;
}

/**
 * Checks if a given string represents a valid date.
 * A valid date string should be in the format "YYYY-MM-DD"
 * and represent an actual calendar date.
 * @param {string} date - The date string to validate.
 * @returns {boolean} `true` if the date string is valid, `false` otherwise.
 */
export function toDateString(date: Date): string {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE).format(date); // TODO: Make this locale-aware
}

/**
 * Returns a new Date object set to the current date and time.
 * @returns {Date} The current date and time.
 */
export function today(): Date {
  return new Date();
}

/**
 * Checks if a given date is today.
 * @param {Date} date - The date to check.
 * @returns {boolean} `true` if the date is today, `false` otherwise.
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, today());
}

/**
 * Checks if two dates are the same day.
 * @param {Date} a - The first date to compare.
 * @param {Date} b - The second date to compare.
 * @returns {boolean} `true` if the dates are the same day, `false` otherwise.
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

/**
 * Checks if two dates are in the same month.
 * @param {Date} a - The first date to compare.
 * @param {Date} b - The second date to compare.
 * @returns {boolean} `true` if the dates are in the same month and year, `false` otherwise.
 */
export function isSameMonth(a: Date, b: Date): boolean {
  return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

/**
 * Checks if two dates are in the same year.
 * @param {Date} a - The first date to compare.
 * @param {Date} b - The second date to compare.
 * @returns {boolean} `true` if the dates are in the same year, `false` otherwise.
 */
export function isSameYear(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear();
}

/**
 * Checks if a given year is a leap year.
 * @param {Date} date - The date to check for leap year.
 * @returns {boolean} `true` if the date is in a leap year, `false` otherwise.
 */
export function isLeapYear(date: Date): boolean {
  let year = date.getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Returns a new Date object set to the start of the week for the given date.
 * By default, considers Monday as the start of the week.
 * @param {Date} date - The date to get the start of week for.
 * @returns {Date} A new Date object set to the start of the week.
 */
export function startOfWeek(date: Date): Date {
  let d = new Date(date);
  let day = d.getDay();
  // Convert Sunday (0) to 7 to make Monday (1) the start of the week
  let adjustedDay = day === 0 ? 7 : day; // TODO: Make this locale-aware
  d.setDate(d.getDate() - (adjustedDay - 1));
  return keepTime(d, date);
}

/**
 * Returns a new Date object set to the first day of the month for the given date.
 * @param {Date} date - The date to get the start of month for.
 * @returns {Date} A new Date object set to the first day of the month.
 */
export function startOfMonth(date: Date): Date {
  return keepTime(new Date(date.getFullYear(), date.getMonth(), 1), date);
}

/**
 * Returns a new Date object set to the first day of the year for the given date.
 * @param {Date} date - The date to get the start of year for.
 * @returns {Date} A new Date object set to the first day of the year.
 */
export function startOfYear(date: Date): Date {
  return keepTime(new Date(date.getFullYear(), 0, 1), date);
}

/**
 * Returns a new Date object set to the end of the week for the given date.
 * By default, considers Sunday as the end of the week.
 * @param {Date} date - The date to get the end of week for.
 * @returns {Date} A new Date object set to the end of the week.
 */
export function endOfWeek(date: Date): Date {
  let d = new Date(date);
  let day = d.getDay();
  // Convert Sunday (0) to 7 to make Monday (1) the start of the week
  let adjustedDay = day === 0 ? 7 : day; // TODO: Make locale-aware
  d.setDate(d.getDate() + (7 - adjustedDay));
  return keepTime(d, date);
}

/**
 * Returns a new Date object set to the last day of the month for the given date.
 * @param {Date} date - The date to get the end of month for.
 * @returns {Date} A new Date object set to the last day of the month.
 */
export function endOfMonth(date: Date): Date {
  return keepTime(new Date(date.getFullYear(), date.getMonth() + 1, 0), date);
}

/**
 * Returns a new Date object set to the last day of the year for the given date.
 * @param {Date} date - The date to get the end of year for.
 * @returns {Date} A new Date object set to the last day of the year.
 */
export function endOfYear(date: Date): Date {
  return keepTime(new Date(date.getFullYear(), 11, 31), date);
}

/**
 * Returns a new Date object for the next day from the given date.
 * @param {Date} date - The date to get the next day for.
 * @returns {Date} A new Date object set to the next day.
 */
export function nextDay(date: Date): Date {
  return keepTime(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
    date,
  );
}

/**
 * Returns a new Date object set to the next day in a week from the given date.
 * @param {Date} date - The date to get the next week day for.
 * @returns {Date} A new Date object set to the next week.
 */
export function nextWeek(date: Date): Date {
  return keepTime(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + DAYS_IN_WEEK,
    ),
    date,
  );
}

/**
 * Returns a new Date object for the same day in the next month from the given date.
 * @param {Date} date - The date to get the next month for.
 * @returns {Date} A new Date object set to the same day in the next month.
 */
export function nextMonth(date: Date): Date {
  let next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  let daysInNextMonth = daysInMonth(next);
  let targetDay = Math.min(date.getDate(), daysInNextMonth);

  return keepTime(
    new Date(next.getFullYear(), next.getMonth(), targetDay),
    date,
  );
}

/**
 * Returns a new Date object for the same day in the next year from the given date.
 * If the date is February 29th of a leap year and the next year is not a leap year, returns February 28th.
 * @param {Date} date - The date to get the next year for.
 * @returns {Date} A new Date object set to the same day in the next year.
 */
export function nextYear(date: Date): Date {
  let next = new Date(date.getFullYear() + 1, date.getMonth(), 1);
  let daysInNextMonth = daysInMonth(next);
  let targetDay = Math.min(date.getDate(), daysInNextMonth);

  return keepTime(
    new Date(next.getFullYear(), date.getMonth(), targetDay),
    date,
  );
}

/**
 * Returns a new Date object for the previous day from the given date.
 * @param {Date} date - The date to get the previous day for.
 * @returns {Date} A new Date object set to the previous day.
 */
export function previousDay(date: Date): Date {
  return keepTime(
    new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
    date,
  );
}

/**
 * Returns a new Date object set to the previous day in a week from the given date.
 * @param {Date} date - The date to get the previous week day for.
 * @returns {Date} A new Date object set to the previous week.
 */
export function previousWeek(date: Date): Date {
  return keepTime(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - DAYS_IN_WEEK,
    ),
    date,
  );
}

/**
 * Returns a new Date object for the same day in the previous month from the given date.
 * If the same day doesn't exist in the previous month, returns the last day of the previous month.
 * @param {Date} date - The date to get the previous month for.
 * @returns {Date} A new Date object set to the same day in the previous month.
 */
export function previousMonth(date: Date): Date {
  let prev = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  let daysInPrevMonth = daysInMonth(prev);
  let targetDay = Math.min(date.getDate(), daysInPrevMonth);

  return keepTime(
    new Date(prev.getFullYear(), prev.getMonth(), targetDay),
    date,
  );
}

/**
 * Returns a new Date object for the same day in the previous year from the given date.
 * If the date is February 29th of a leap year and the previous year is not a leap year, returns February 28th.
 * @param {Date} date - The date to get the previous year for.
 * @returns {Date} A new Date object set to the same day in the previous year.
 */
export function previousYear(date: Date): Date {
  let prev = new Date(date.getFullYear() - 1, date.getMonth(), 1);
  let daysInPrevMonth = daysInMonth(prev);
  let targetDay = Math.min(date.getDate(), daysInPrevMonth);

  return keepTime(
    new Date(prev.getFullYear(), date.getMonth(), targetDay),
    date,
  );
}

/**
 * Returns an array containing each day of a week starting from a given date.
 * By default, considers Monday as the start of the week.
 * @param {Date} date - The date to get the days of the week for.
 * @returns {Date[]} An array of 7 Date objects representing each day of the week.
 */
export function daysInWeek(date: Date): Date[] {
  let d = new Date(date);
  let days: Date[] = [];
  let day = d.getDay();
  // Convert Sunday (0) to 7 to make Monday (1) the start of the week
  let adjustedDay = day === 0 ? 7 : day;
  d.setDate(d.getDate() - (adjustedDay - 1));

  for (let i = 0; i < 7; i++) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  return days;
}

/**
 * Returns the number of days in a given month.
 * @param {Date} date - The date to get the days in month for.
 * @returns {number} The number of days in the month (28-31).
 */
export function daysInMonth(date: Date): number {
  return endOfMonth(date).getDate();
}

/**
 * Returns a matrix (two-dimensional array) of Date objects representing weeks in a month.
 * Each sub-array represents a week and contains 7 Date objects for each day of that week.
 * The first week may include days from the previous month, and the last week may include
 * days from the next month to complete full weeks.
 * By default, considers Monday as the start of each week.
 * @param {Date} date - The date for which to get the weeks of the month.
 * @returns {Date[][]} A matrix where each row is an array of 7 Date objects representing a week.
 */
export function weeksInMonth(date: Date): Date[][] {
  let weeks: Date[][] = [];
  let monthStart = startOfMonth(date);
  let monthEnd = endOfMonth(date);
  let currentWeekStart = startOfWeek(monthStart);

  while (currentWeekStart <= monthEnd) {
    weeks.push(daysInWeek(currentWeekStart));
    let nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    currentWeekStart = nextWeekStart;
  }

  return weeks;
}

/**
 * Returns the total number of days in a given year.
 * @param {Date} date - The date to get the days in year for.
 * @returns {number} The number of days in the year (365 for normal years, 366 for leap years).
 */
export function daysInYear(date: Date): number {
  return isLeapYear(date) ? 366 : 365;
}

function keepTime(date: Date, time: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds(),
  );
}

const DAYS_IN_WEEK = 7;
