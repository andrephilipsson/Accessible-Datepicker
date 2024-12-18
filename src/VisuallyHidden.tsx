import React from "react";

const styles: React.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0px",
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

export function VisuallyHidden({ children }: React.PropsWithChildren) {
  return <div style={styles}>{children}</div>;
}
