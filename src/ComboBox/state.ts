import { useEffect, useRef } from "react";

export const handlePopup = (callback: () => void) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
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

    const handleKeys = (e: KeyboardEvent) => {
      if (popupRef.current) {
        const focusableElems = Array.from(
          popupRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ) as HTMLElement[];
        const first = focusableElems[0];
        const last = focusableElems[focusableElems.length - 1];

        switch (e.key) {
          case "Tab":
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
            break;
          case "Escape":
            callback();
            buttonRef.current?.focus();
            break;
        }
      }
    };

    popupRef.current?.addEventListener("keydown", handleKeys);
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      popupRef.current?.removeEventListener("keydown", handleKeys);
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [callback]);

  return { popupRef, buttonRef };
};
