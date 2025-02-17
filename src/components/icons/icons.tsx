import React from "react";

const UserIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({
  width = 37,
  height = 37,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_224_1818"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="37"
        height="37"
      >
        <circle cx="18.5" cy="18.5" r="18.2812" fill="#737373" />
      </mask>
      <g mask="url(#mask0_224_1818)">
        <circle cx="18.5" cy="15.6875" r="9.84375" fill="white" />
        <circle cx="18.5" cy="39.5938" r="16.875" fill="white" />
      </g>
    </svg>
  );
};

export default UserIcon;
