import * as React from "react";

function CorrectIcon({ stroke = "#6C7281", ...rest }) {
  return (
    <div className="correct-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" stroke={stroke} strokeWidth="1.5" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </svg>
    </div>
  );
}

export default CorrectIcon;
