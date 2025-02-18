import React from 'react';

interface ButtonThemeProps {
  bgColor: string;
  textColor?: string; // Optional text color
  children: React.ReactNode;
  
  onClick?: () => void; // Optional click handler
  paddingX?: string; // Optional horizontal padding
  paddingY?: string; // Optional vertical padding
  margin?: string; // Optional margin
  border?: string; // Optional border
}

const ButtonTheme: React.FC<ButtonThemeProps> = ({ bgColor, textColor = 'text-black', children, onClick, paddingX = 'px-4', paddingY = 'py-2', margin, border }) => {
  return (
    <button
      className={`${bgColor} ${textColor} rounded-[25px] ${paddingY} ${paddingX} hover:bg-teal-700 ${margin} ${border}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonTheme; 