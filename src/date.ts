export function isValidDate(date: string): boolean {
  return !isNaN(Date.parse(date));
}

export function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function startOfWeek(date: Date): Date {
  let d = new Date(date);
  let day = d.getDay();
  // Convert Sunday (0) to 7 to make Monday (1) the start of the week
  let adjustedDay = day === 0 ? 7 : day;
  d.setDate(d.getDate() - (adjustedDay - 1));
  return d;
}

export function endOfWeek(date: Date): Date {
  let d = new Date(date);
  let day = d.getDay();
  // Convert Sunday (0) to 7 to make Monday (1) the start of the week
  let adjustedDay = day === 0 ? 7 : day;
  d.setDate(d.getDate() + (7 - adjustedDay));
  return d;
}

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

export function isSameMonth(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

export function nextMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function previousMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function previousDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
}

export function nextDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function previousWeek(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
}

export function nextWeek(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
}

export function sameDayInPreviousMonth(date: Date): Date {
  let prevMonth = previousMonth(date);
  let daysInPrevMonth = endOfMonth(prevMonth).getDate();
  let targetDay = Math.min(date.getDate(), daysInPrevMonth);
  return new Date(prevMonth.getFullYear(), prevMonth.getMonth(), targetDay);
}

export function sameDayInNextMonth(date: Date): Date {
  let nextMon = nextMonth(date);
  let daysInNextMonth = endOfMonth(nextMon).getDate();
  let targetDay = Math.min(date.getDate(), daysInNextMonth);
  return new Date(nextMon.getFullYear(), nextMon.getMonth(), targetDay);
}

export function isToday(date: Date): boolean {
  let today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function today(): Date {
  return new Date();
}
