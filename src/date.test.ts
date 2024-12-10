import { describe, expect, it } from "vitest";
import {
  daysInMonth,
  daysInWeek,
  daysInYear,
  endOfMonth,
  endOfWeek,
  endOfYear,
  isLeapYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  isToday,
  isValidDate,
  nextDay,
  nextMonth,
  nextWeek,
  nextYear,
  previousDay,
  previousMonth,
  previousYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
  toDateString,
  weeksInMonth,
} from "./date";

describe("isValidDate", () => {
  it("should return true for a valid date string in yyyy-mm-dd format", () => {
    expect(isValidDate("2023-01-01")).toBe(true);
    expect(isValidDate("2024-12-31")).toBe(true);
    expect(isValidDate("2023-06-15")).toBe(true);
  });

  it("should return false for invalid date strings", () => {
    expect(isValidDate("2023-13-01")).toBe(false); // Invalid month
    expect(isValidDate("2023-00-01")).toBe(false); // Invalid month
    expect(isValidDate("2023-01-32")).toBe(false); // Invalid day
    expect(isValidDate("2023-01-00")).toBe(false); // Invalid day
  });

  it("should return false for invalid date formats", () => {
    expect(isValidDate("2023/01/01")).toBe(false);
    expect(isValidDate("01-01-2023")).toBe(false);
    expect(isValidDate("2023-1-1")).toBe(false);
    expect(isValidDate("not a date")).toBe(false);
  });

  it("should handle leap years correctly", () => {
    expect(isValidDate("2024-02-29")).toBe(true); // Valid leap year
    expect(isValidDate("2023-02-29")).toBe(false); // Invalid in non-leap year
    expect(isValidDate("2000-02-29")).toBe(true); // Valid century leap year
    expect(isValidDate("1900-02-29")).toBe(false); // Invalid century non-leap year
  });

  it("should return false for empty or malformed input", () => {
    expect(isValidDate("")).toBe(false);
    expect(isValidDate("2023-01")).toBe(false);
    expect(isValidDate("2023-")).toBe(false);
    expect(isValidDate("-01-01")).toBe(false);
  });
});

describe("toDateString", () => {
  it("should format date in yyyy-mm-dd format", () => {
    let date = new Date(2023, 0, 1);
    expect(toDateString(date)).toBe("2023-01-01");
  });

  it("should pad single digit month/day with zero", () => {
    let date1 = new Date(2023, 0, 15); // January 15
    let date2 = new Date(2023, 11, 5); // December 5
    expect(toDateString(date1)).toBe("2023-01-15");
    expect(toDateString(date2)).toBe("2023-12-05");
  });

  it("should handle last day of year", () => {
    let date = new Date(2023, 11, 31);
    expect(toDateString(date)).toBe("2023-12-31");
  });

  it("should format February dates correctly", () => {
    let date1 = new Date(2023, 1, 28);
    let date2 = new Date(2024, 1, 29);
    expect(toDateString(date1)).toBe("2023-02-28");
    expect(toDateString(date2)).toBe("2024-02-29");
  });
});

describe("isToday", () => {
  it("returns true for the current date", () => {
    let date = new Date();
    expect(isToday(date)).toBe(true);
  });

  it("returns false for a different date", () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    expect(isToday(date)).toBe(false);
  });

  it("returns true for different times on the same day", () => {
    let date1 = new Date();
    let date2 = new Date();
    date2.setHours(23, 59, 59, 999);
    expect(isToday(date1)).toBe(true);
    expect(isToday(date2)).toBe(true);
  });
});

describe("isSameDay", () => {
  it("returns true for dates that are on the same day", () => {
    let date1 = new Date(2023, 0, 1, 10, 0, 0);
    let date2 = new Date(2023, 0, 1, 15, 30, 0);
    expect(isSameDay(date1, date2)).toBe(true);
  });

  it("returns false for dates on different days", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 0, 2);
    expect(isSameDay(date1, date2)).toBe(false);
  });

  it("returns false for dates in different months", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 1, 1);
    expect(isSameDay(date1, date2)).toBe(false);
  });

  it("returns false for dates in different years", () => {
    let date1 = new Date(2022, 0, 1);
    let date2 = new Date(2023, 0, 1);
    expect(isSameDay(date1, date2)).toBe(false);
  });
});

describe("isSameMonth", () => {
  it("returns true for dates in the same month", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 0, 15);
    expect(isSameMonth(date1, date2)).toBe(true);
  });

  it("returns false for dates in different months", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 1, 1);
    expect(isSameMonth(date1, date2)).toBe(false);
  });

  it("returns false for dates in different years", () => {
    let date1 = new Date(2022, 0, 1);
    let date2 = new Date(2023, 0, 1);
    expect(isSameMonth(date1, date2)).toBe(false);
  });
});

describe("isSameYear", () => {
  it("returns true for dates in the same year", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 11, 31);
    expect(isSameYear(date1, date2)).toBe(true);
  });

  it("returns false for dates in different years", () => {
    let date1 = new Date(2022, 0, 1);
    let date2 = new Date(2023, 0, 1);
    expect(isSameYear(date1, date2)).toBe(false);
  });

  it("returns true for dates with different times in same year", () => {
    let date1 = new Date(2023, 0, 1, 9, 0, 0);
    let date2 = new Date(2023, 0, 1, 17, 30, 0);
    expect(isSameYear(date1, date2)).toBe(true);
  });
});

describe("isLeapYear", () => {
  it("returns true for years divisible by 4", () => {
    let date = new Date(2024, 0, 1);
    expect(isLeapYear(date)).toBe(true);
  });

  it("returns false for years not divisible by 4", () => {
    let date = new Date(2023, 0, 1);
    expect(isLeapYear(date)).toBe(false);
  });

  it("returns false for century years not divisible by 400", () => {
    let date = new Date(1900, 0, 1);
    expect(isLeapYear(date)).toBe(false);
  });

  it("returns true for century years divisible by 400", () => {
    let date = new Date(2000, 0, 1);
    expect(isLeapYear(date)).toBe(true);
  });
});

describe("startOfWeek", () => {
  it("returns Monday for a random day in the week", () => {
    let date = new Date(2023, 5, 15); // Thursday
    let expected = new Date(2023, 5, 12); // Monday
    expect(startOfWeek(date)).toEqual(expected);
  });

  it("returns same date when already Monday", () => {
    let date = new Date(2023, 5, 12); // Monday
    let expected = new Date(2023, 5, 12);
    expect(startOfWeek(date)).toEqual(expected);
  });

  it("handles crossing month boundaries", () => {
    let date = new Date(2023, 6, 2); // Sunday
    let expected = new Date(2023, 5, 26); // Previous Monday
    expect(startOfWeek(date)).toEqual(expected);
  });

  it("handles crossing year boundaries", () => {
    let date = new Date(2024, 0, 1); // Monday January 1
    let expected = new Date(2024, 0, 1);
    expect(startOfWeek(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 12, 12, 30, 45, 999);
    expect(startOfWeek(date)).toEqual(expected);
  });
});

describe("startOfMonth", () => {
  it("returns the first day of the month", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 5, 1);
    expect(startOfMonth(date)).toEqual(expected);
  });

  it("handles the last day of the previous month", () => {
    let date = new Date(2023, 6, 0);
    let expected = new Date(2023, 5, 1);
    expect(startOfMonth(date)).toEqual(expected);
  });

  it("handles new year correctly", () => {
    let date = new Date(2023, 11, 31);
    let expected = new Date(2023, 11, 1);
    expect(startOfMonth(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 1, 12, 30, 45, 999);
    expect(startOfMonth(date)).toEqual(expected);
  });
});

describe("startOfYear", () => {
  it("returns the first day of the year", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 0, 1);
    expect(startOfYear(date)).toEqual(expected);
  });

  it("handles first day of year", () => {
    let date = new Date(2023, 0, 1);
    let expected = new Date(2023, 0, 1);
    expect(startOfYear(date)).toEqual(expected);
  });

  it("handles last day of year", () => {
    let date = new Date(2023, 11, 31);
    let expected = new Date(2023, 0, 1);
    expect(startOfYear(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 0, 1, 12, 30, 45, 999);
    expect(startOfYear(date)).toEqual(expected);
  });
});

describe("endOfWeek", () => {
  it("returns Sunday for a random day in the week", () => {
    let date = new Date(2023, 5, 15); // Thursday
    let expected = new Date(2023, 5, 18); // Sunday
    expect(endOfWeek(date)).toEqual(expected);
  });

  it("returns same date when already Sunday", () => {
    let date = new Date(2023, 5, 18); // Sunday
    let expected = new Date(2023, 5, 18);
    expect(endOfWeek(date)).toEqual(expected);
  });

  it("handles crossing month boundaries", () => {
    let date = new Date(2023, 5, 29); // Thursday
    let expected = new Date(2023, 6, 2); // Sunday
    expect(endOfWeek(date)).toEqual(expected);
  });

  it("handles crossing year boundaries", () => {
    let date = new Date(2023, 11, 29); // Friday
    let expected = new Date(2023, 11, 31); // Sunday
    expect(endOfWeek(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 18, 12, 30, 45, 999);
    expect(endOfWeek(date)).toEqual(expected);
  });
});

describe("endOfMonth", () => {
  it("returns the last day of the month", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 5, 30);
    expect(endOfMonth(date)).toEqual(expected);
  });

  it("handles the last day of the month", () => {
    let date = new Date(2023, 5, 30);
    let expected = new Date(2023, 5, 30);
    expect(endOfMonth(date)).toEqual(expected);
  });

  it("handles new year correctly", () => {
    let date = new Date(2023, 11, 31);
    let expected = new Date(2023, 11, 31);
    expect(endOfMonth(date)).toEqual(expected);
  });

  it("handles February in a non-leap year", () => {
    let date = new Date(2023, 1, 1);
    let expected = new Date(2023, 1, 28);
    expect(endOfMonth(date)).toEqual(expected);
  });

  it("handles February in a leap year", () => {
    let date = new Date(2024, 1, 1);
    let expected = new Date(2024, 1, 29);
    expect(endOfMonth(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 30, 12, 30, 45, 999);
    expect(endOfMonth(date)).toEqual(expected);
  });
});

describe("endOfYear", () => {
  it("returns the last day of the year", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 11, 31);
    expect(endOfYear(date)).toEqual(expected);
  });

  it("handles first day of year", () => {
    let date = new Date(2023, 0, 1);
    let expected = new Date(2023, 11, 31);
    expect(endOfYear(date)).toEqual(expected);
  });

  it("handles last day of year", () => {
    let date = new Date(2023, 11, 31);
    let expected = new Date(2023, 11, 31);
    expect(endOfYear(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 11, 31, 12, 30, 45, 999);
    expect(endOfYear(date)).toEqual(expected);
  });
});

describe("nextDay", () => {
  it("returns the next day for a regular date", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 5, 16);
    expect(nextDay(date)).toEqual(expected);
  });

  it("handles end of month correctly", () => {
    let date = new Date(2023, 5, 30);
    let expected = new Date(2023, 6, 1);
    expect(nextDay(date)).toEqual(expected);
  });

  it("handles end of year correctly", () => {
    let date = new Date(2023, 11, 31);
    let expected = new Date(2024, 0, 1);
    expect(nextDay(date)).toEqual(expected);
  });

  it("handles February 28 in a non-leap year", () => {
    let date = new Date(2023, 1, 28);
    let expected = new Date(2023, 2, 1);
    expect(nextDay(date)).toEqual(expected);
  });

  it("handles February 28 in a leap year", () => {
    let date = new Date(2024, 1, 28);
    let expected = new Date(2024, 1, 29);
    expect(nextDay(date)).toEqual(expected);
  });

  it("handles February 29 in a leap year", () => {
    let date = new Date(2024, 1, 29);
    let expected = new Date(2024, 2, 1);
    expect(nextDay(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 16, 12, 30, 45, 999);
    expect(nextDay(date)).toEqual(expected);
  });
});

describe("nextWeek", () => {
  it("returns the date 7 days in the future", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 5, 22);
    expect(nextWeek(date)).toEqual(expected);
  });

  it("handles crossing month boundary", () => {
    let date = new Date(2023, 5, 28);
    let expected = new Date(2023, 6, 5);
    expect(nextWeek(date)).toEqual(expected);
  });

  it("handles crossing year boundary", () => {
    let date = new Date(2023, 11, 28);
    let expected = new Date(2024, 0, 4);
    expect(nextWeek(date)).toEqual(expected);
  });

  it("handles February in non-leap year", () => {
    let date = new Date(2023, 1, 25);
    let expected = new Date(2023, 2, 4);
    expect(nextWeek(date)).toEqual(expected);
  });

  it("handles February in leap year", () => {
    let date = new Date(2024, 1, 25);
    let expected = new Date(2024, 2, 3);
    expect(nextWeek(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 22, 12, 30, 45, 999);
    expect(nextWeek(date)).toEqual(expected);
  });
});

describe("nextMonth", () => {
  it("returns the first day of the next month", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 6, 15);
    expect(nextMonth(date)).toEqual(expected);
  });

  it("handles end of year correctly", () => {
    let date = new Date(2023, 11, 15);
    let expected = new Date(2024, 0, 15);
    expect(nextMonth(date)).toEqual(expected);
  });

  it("handles dates with different days correctly", () => {
    let date = new Date(2023, 3, 30);
    let expected = new Date(2023, 4, 30);
    expect(nextMonth(date)).toEqual(expected);
  });

  it("handles month with fewer days", () => {
    let date = new Date(2023, 0, 31);
    let expected = new Date(2023, 1, 28);
    expect(nextMonth(date)).toEqual(expected);
  });

  it("handles February in leap year", () => {
    let date = new Date(2024, 0, 31);
    let expected = new Date(2024, 1, 29);
    expect(nextMonth(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 6, 15, 12, 30, 45, 999);
    expect(nextMonth(date)).toEqual(expected);
  });
});

describe("nextYear", () => {
  it("returns the same date in the next year", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2024, 5, 15);
    expect(nextYear(date)).toEqual(expected);
  });

  it("handles end of year correctly", () => {
    let date = new Date(2023, 11, 31);
    let expected = new Date(2024, 11, 31);
    expect(nextYear(date)).toEqual(expected);
  });

  it("handles February 29 in leap year to non-leap year", () => {
    let date = new Date(2024, 1, 29);
    let expected = new Date(2025, 1, 28);
    expect(nextYear(date)).toEqual(expected);
  });

  it("handles February 28 consistently", () => {
    let date = new Date(2023, 1, 28);
    let expected = new Date(2024, 1, 28);
    expect(nextYear(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2024, 5, 15, 12, 30, 45, 999);
    expect(nextYear(date)).toEqual(expected);
  });
});

describe("previousDay", () => {
  it("returns the previous day for a regular date", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 5, 14);
    expect(previousDay(date)).toEqual(expected);
  });

  it("handles start of month correctly", () => {
    let date = new Date(2023, 5, 1);
    let expected = new Date(2023, 4, 31);
    expect(previousDay(date)).toEqual(expected);
  });

  it("handles start of year correctly", () => {
    let date = new Date(2023, 0, 1);
    let expected = new Date(2022, 11, 31);
    expect(previousDay(date)).toEqual(expected);
  });

  it("handles March 1 to February 28 in a non-leap year", () => {
    let date = new Date(2023, 2, 1);
    let expected = new Date(2023, 1, 28);
    expect(previousDay(date)).toEqual(expected);
  });

  it("handles March 1 to February 29 in a leap year", () => {
    let date = new Date(2024, 2, 1);
    let expected = new Date(2024, 1, 29);
    expect(previousDay(date)).toEqual(expected);
  });

  it("handles February 29 to February 28 in a leap year", () => {
    let date = new Date(2024, 1, 29);
    let expected = new Date(2024, 1, 28);
    expect(previousDay(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 5, 14, 12, 30, 45, 999);
    expect(previousDay(date)).toEqual(expected);
  });
});

describe("previousMonth", () => {
  it("returns the first day of the previous month", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2023, 4, 15);
    expect(previousMonth(date)).toEqual(expected);
  });

  it("handles start of year correctly", () => {
    let date = new Date(2023, 0, 15);
    let expected = new Date(2022, 11, 15);
    expect(previousMonth(date)).toEqual(expected);
  });

  it("handles dates with different days correctly", () => {
    let date = new Date(2023, 4, 30);
    let expected = new Date(2023, 3, 30);
    expect(previousMonth(date)).toEqual(expected);
  });

  it("handles month with fewer days", () => {
    let date = new Date(2023, 2, 31);
    let expected = new Date(2023, 1, 28);
    expect(previousMonth(date)).toEqual(expected);
  });

  it("handles February in leap year", () => {
    let date = new Date(2024, 2, 31);
    let expected = new Date(2024, 1, 29);
    expect(previousMonth(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2023, 4, 15, 12, 30, 45, 999);
    expect(previousMonth(date)).toEqual(expected);
  });
});

describe("previousYear", () => {
  it("returns the same date in the previous year", () => {
    let date = new Date(2023, 5, 15);
    let expected = new Date(2022, 5, 15);
    expect(previousYear(date)).toEqual(expected);
  });

  it("handles start of year correctly", () => {
    let date = new Date(2023, 0, 1);
    let expected = new Date(2022, 0, 1);
    expect(previousYear(date)).toEqual(expected);
  });

  it("handles February 29 in leap year to non-leap year", () => {
    let date = new Date(2024, 1, 29);
    let expected = new Date(2023, 1, 28);
    expect(previousYear(date)).toEqual(expected);
  });

  it("handles February 28 consistently", () => {
    let date = new Date(2024, 1, 28);
    let expected = new Date(2023, 1, 28);
    expect(previousYear(date)).toEqual(expected);
  });

  it("does not change the time part of the date", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let expected = new Date(2022, 5, 15, 12, 30, 45, 999);
    expect(previousYear(date)).toEqual(expected);
  });
});

describe("daysInWeek", () => {
  it("returns 7 for any date", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 6, 15);
    let date3 = new Date(2023, 11, 31);
    expect(daysInWeek(date1).length).toBe(7);
    expect(daysInWeek(date2).length).toBe(7);
    expect(daysInWeek(date3).length).toBe(7);
  });

  it("returns the correct days of the week", () => {
    let date = new Date(2023, 5, 15); // Thursday
    let days = daysInWeek(date);
    expect(days[0]).toEqual(new Date(2023, 5, 12)); // Monday
    expect(days[1]).toEqual(new Date(2023, 5, 13)); // Tuesday
    expect(days[2]).toEqual(new Date(2023, 5, 14)); // Wednesday
    expect(days[3]).toEqual(new Date(2023, 5, 15)); // Thursday
    expect(days[4]).toEqual(new Date(2023, 5, 16)); // Friday
    expect(days[5]).toEqual(new Date(2023, 5, 17)); // Saturday
    expect(days[6]).toEqual(new Date(2023, 5, 18)); // Sunday
  });

  it("handles week spanning month boundary", () => {
    let date = new Date(2023, 5, 30); // Friday
    let days = daysInWeek(date);
    expect(days[0]).toEqual(new Date(2023, 5, 26)); // Monday
    expect(days[6]).toEqual(new Date(2023, 6, 2)); // Sunday
  });

  it("handles week spanning year boundary", () => {
    let date = new Date(2023, 11, 31); // Sunday
    let days = daysInWeek(date);
    expect(days[0]).toEqual(new Date(2023, 11, 25)); // Monday
    expect(days[6]).toEqual(new Date(2023, 11, 31)); // Sunday
  });

  it("preserves time component", () => {
    let date = new Date(2023, 5, 15, 12, 30, 45, 999);
    let days = daysInWeek(date);
    for (let day of days) {
      expect(day.getHours()).toBe(12);
      expect(day.getMinutes()).toBe(30);
      expect(day.getSeconds()).toBe(45);
      expect(day.getMilliseconds()).toBe(999);
    }
  });
});

describe("daysInMonth", () => {
  it("returns the correct number of days for a 31 day month", () => {
    let date = new Date(2023, 0, 1); // January
    expect(daysInMonth(date)).toBe(31);
  });

  it("returns the correct number of days for a 30 day month", () => {
    let date = new Date(2023, 3, 1); // April
    expect(daysInMonth(date)).toBe(30);
  });

  it("returns 28 days for February in a non-leap year", () => {
    let date = new Date(2023, 1, 1);
    expect(daysInMonth(date)).toBe(28);
  });

  it("returns 29 days for February in a leap year", () => {
    let date = new Date(2024, 1, 1);
    expect(daysInMonth(date)).toBe(29);
  });

  it("works for any day within the month", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 0, 15);
    let date3 = new Date(2023, 0, 31);
    expect(daysInMonth(date1)).toBe(31);
    expect(daysInMonth(date2)).toBe(31);
    expect(daysInMonth(date3)).toBe(31);
  });

  it("handles century years correctly", () => {
    let date1 = new Date(1900, 1, 1); // Not a leap year (divisible by 100 but not 400)
    let date2 = new Date(2000, 1, 1); // Leap year (divisible by 400)
    expect(daysInMonth(date1)).toBe(28);
    expect(daysInMonth(date2)).toBe(29);
  });
});

describe("weeksInMonth", () => {
  it("returns an array of weeks in the month", () => {
    let date = new Date(2023, 0, 1);
    let weeks = weeksInMonth(date);
    expect(Array.isArray(weeks)).toBe(true);
    expect(weeks.length).toBeGreaterThan(0);
    expect(Array.isArray(weeks[0])).toBe(true);
  });

  it("returns each week as an array of 7 days", () => {
    let date = new Date(2023, 0, 1);
    let weeks = weeksInMonth(date);
    for (let week of weeks) {
      expect(week.length).toBe(7);
      for (let day of week) {
        expect(day instanceof Date).toBe(true);
      }
    }
  });

  it("includes dates from previous/next months to complete weeks", () => {
    let date = new Date(2023, 0, 1);
    let weeks = weeksInMonth(date);
    let firstWeek = weeks[0];
    let lastWeek = weeks[weeks.length - 1];
    expect(firstWeek.some((d) => d.getMonth() !== 0)).toBe(true);
    expect(lastWeek.some((d) => d.getMonth() !== 0)).toBe(true);
  });

  it("preserves time component", () => {
    let date = new Date(2023, 0, 1, 12, 30, 45, 999);
    let weeks = weeksInMonth(date);
    for (let week of weeks) {
      for (let day of week) {
        expect(day.getHours()).toBe(12);
        expect(day.getMinutes()).toBe(30);
        expect(day.getSeconds()).toBe(45);
        expect(day.getMilliseconds()).toBe(999);
      }
    }
  });

  it("handles months with 4 weeks", () => {
    let date = new Date(2021, 1, 1); // February 2021
    let weeks = weeksInMonth(date);
    expect(weeks.length).toBe(4);
  });

  it("handles months with 5 weeks", () => {
    let date = new Date(2025, 1, 1); // February 2025
    let weeks = weeksInMonth(date);
    expect(weeks.length).toBe(5);
  });

  it("handles months with 6 weeks", () => {
    let date = new Date(2015, 2, 1); // March 2025
    let weeks = weeksInMonth(date);
    expect(weeks.length).toBe(6);
  });
});

describe("daysInYear", () => {
  it("returns 365 days for a non-leap year", () => {
    let date = new Date(2023, 0, 1);
    expect(daysInYear(date)).toBe(365);
  });

  it("returns 366 days for a leap year", () => {
    let date = new Date(2024, 0, 1);
    expect(daysInYear(date)).toBe(366);
  });

  it("works for any day within the year", () => {
    let date1 = new Date(2023, 0, 1);
    let date2 = new Date(2023, 6, 15);
    let date3 = new Date(2023, 11, 31);
    expect(daysInYear(date1)).toBe(365);
    expect(daysInYear(date2)).toBe(365);
    expect(daysInYear(date3)).toBe(365);
  });

  it("handles century years correctly", () => {
    let date1 = new Date(2000, 0, 1); // Leap year (divisible by 400)
    let date2 = new Date(1900, 0, 1); // Not a leap year (divisible by 100 but not 400)
    expect(daysInYear(date1)).toBe(366);
    expect(daysInYear(date2)).toBe(365);
  });

  it("handles leap years correctly", () => {
    let date1 = new Date(2024, 0, 1); // Leap year
    let date2 = new Date(2023, 0, 1); // Not a leap year
    expect(daysInYear(date1)).toBe(366);
    expect(daysInYear(date2)).toBe(365);
  });
});
