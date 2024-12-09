import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Don't trigger the callback if clicking the toggle button
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [callback]);

  return { popupRef, buttonRef };
};
