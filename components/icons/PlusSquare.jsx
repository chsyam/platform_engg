import * as React from "react";

export default function PlusSquare({fill, stroke, ...props}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
      <rect width="31" height="31" rx="5" fill={ fill || "#D9D9D9"} />
      <path d="M16 10V22" stroke={ stroke || "black" } strokeWidth="2" strokeLinecap="round" />
      <path d="M22 16L10 16" stroke={stroke ||  "black" } strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
