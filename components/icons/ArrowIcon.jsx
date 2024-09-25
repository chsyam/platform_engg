import * as React from "react";

function ArrowIcon({ direction = "down",stroke = "#0C2132", fillColor = "rgba(255, 255, 255, 0)", width = 29, height = 23, ...rest }) {
  let rotation = 0;

  if (direction === "up") {
    rotation = 180;
  } else if (direction === "left") {
    rotation = -90;
  } else if (direction === "right") {
    rotation = 90;
  } else if (direction === "down") {
    rotation = 0;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" transform={`rotate(${rotation})`}>
      <rect width={width} height={height} fill={fillColor} />
      <path d="M7 8L15 15L23 8" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default ArrowIcon;
