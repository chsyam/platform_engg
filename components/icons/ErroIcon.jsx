import * as React from "react";

function ErrorIcon({ fill = "#6C7281", ...rest }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#B50000" />
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="#FFFFFF">
        !
      </text>
    </svg>
  );
}

export default ErrorIcon;
