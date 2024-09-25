import React from 'react';

const EyeLogo = ({ width = 29, height = 22, color = '#000' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 12C19.2 12 8 24.24 8 32C8 39.76 19.2 52 32 52C44.8 52 56 39.76 56 32C56 24.24 44.8 12 32 12ZM32 46C22.16 46 14 37.84 14 32C14 26.16 22.16 18 32 18C41.84 18 50 26.16 50 32C50 37.84 41.84 46 32 46ZM32 22C28.14 22 25 25.14 25 29C25 32.86 28.14 36 32 36C35.86 36 39 32.86 39 29C39 25.14 35.86 22 32 22ZM32 32C30.34 32 29 30.66 29 29C29 27.34 30.34 26 32 26C33.66 26 35 27.34 35 29C35 30.66 33.66 32 32 32Z"
      fill={color}
    />
  </svg>
);

export default EyeLogo;
