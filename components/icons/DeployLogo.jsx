import React from "react";

export default function DeployLogo({ fill = "#0C2132",stroke = "white", width = 48, height = 47, ...rest }){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 48 47" fill="none">
            <rect width={width} height={height} rx="5" fill={fill}/>
            <path d="M32.3333 31.3125H32.35M30 26.625H34C35.5532 26.625 36.3297 26.625 36.9423 26.8628C37.759 27.18 38.408 27.7884 38.7463 28.5541C39 29.1284 39 29.8564 39 31.3125C39 32.7686 39 33.4966 38.7463 34.0709C38.408 34.8366 37.759 35.445 36.9423 35.7622C36.3297 36 35.5532 36 34 36H14C12.4469 36 11.6703 36 11.0577 35.7622C10.241 35.445 9.59205 34.8366 9.25373 34.0709C9 33.4966 9 32.7686 9 31.3125C9 29.8564 9 29.1284 9.25373 28.5541C9.59205 27.7884 10.241 27.18 11.0577 26.8628C11.6703 26.625 12.4469 26.625 14 26.625H18M24 28.1875V11M24 11L29 15.6875M24 11L19 15.6875" stroke={stroke || "white"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}