import { createContext, useContext } from "react";
import { VisuallyHidden } from "../VisuallyHidden";

interface AriaLiveContextType {
  announce: (message: string, options: AnnounceOptions) => void;
}

function stub(): never {
  throw new Error("You forgot to wrap your component in <AriaLiveProvider>");
}

const AriaLiveContext = createContext<AriaLiveContextType>({
  announce: stub,
});

export function useAriaLive() {
  return useContext(AriaLiveContext);
}

interface AnnounceOptions {
  live?: "assertive" | "polite";
  timeout?: number;
}

export function AriaLiveProvider({ children }: React.PropsWithChildren) {
  function announce(message: string, options: AnnounceOptions) {
    let live = options.live || "polite";
    let timeout = options.timeout || 7000;

    let liveMessage = document.getElementById(
      `aria-live-${live}`,
    ) as HTMLDivElement;

    let node = document.createElement("div");
    node.textContent = message;
    liveMessage.appendChild(node);

    setTimeout(() => {
      liveMessage.removeChild(node);
    }, timeout);
  }

  return (
    <AriaLiveContext.Provider
      value={{
        announce,
      }}
    >
      <VisuallyHidden>
        <div
          id="aria-live-polite"
          aria-live="polite"
          aria-atomic="true"
          aria-relevant="additions"
          role="log"
        ></div>
        <div
          id="aria-live-assertive"
          aria-live="assertive"
          aria-atomic="true"
          aria-relevant="additions"
          role="log"
        ></div>
      </VisuallyHidden>
      {children}
    </AriaLiveContext.Provider>
  );
}
