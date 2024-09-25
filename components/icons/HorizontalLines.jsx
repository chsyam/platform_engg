import * as React from "react";

function HorizontalLines({ isDown, fill = "#0c2312", ...rest }) {
  return (
     <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="1" width="27" height="3" rx="1" fill={fill}/>
            <rect y="8" width="27" height="3" rx="1" fill={fill}/>
            <rect y="15" width="27" height="3" rx="1" fill={fill}/>
            <rect y="22" width="27" height="3" rx="1" fill={fill}/>
        </svg>
  );
}

export default HorizontalLines;