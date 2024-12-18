import { DEFAULT_LOCALE } from "../locale";

export function toAriaLabel(date: Date): string {
  // undefined uses the browser's default locale
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    dateStyle: "full",
  }).format(date);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
