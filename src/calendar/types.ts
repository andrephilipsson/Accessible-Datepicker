export interface CalendarProps {
  defaultValue: Date | null;
  onChange: (
    date: Date | null,
  ) => void | React.Dispatch<React.SetStateAction<Date | null>>;
}
