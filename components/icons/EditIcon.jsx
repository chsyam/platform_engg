import * as React from "react";

function DashboardIcon({ color="white", width="19",height="19", ...rest }) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 19" fill={color}>
    <path d="M2 16.25H3.4L12.025 7.625L10.625 6.225L2 14.85V16.25ZM16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3042 0 14.8625 0C15.4208 0 15.8917 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.82083 18.275 3.3625C18.2917 3.90417 18.1083 4.36667 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65ZM11.325 6.925L10.625 6.225L12.025 7.625L11.325 6.925Z" fill={color}/>
  </svg>
  );
}

export default DashboardIcon;
