export function toFullDate(date: Date): string {
  // undefined uses the browser's default locale
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
  }).format(date);
}
