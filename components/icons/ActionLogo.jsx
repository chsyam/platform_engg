import * as React from "react";

export function ActionLogo({ width = "14", height = "14", color = "#0C2132" }) {
  return (
    <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 15 16"
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="1.5" cy="8" r="1.5" fill={color} />
        <circle cx="7.5" cy="8" r="1.5" fill={color} />
        <circle cx="13.5" cy="8" r="1.5" fill={color} />
      </svg>
    </span>
  );
}

export default ActionLogo;
