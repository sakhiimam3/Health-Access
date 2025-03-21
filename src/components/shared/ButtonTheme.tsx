import React from 'react';

interface ButtonThemeProps {
  bgColor: string;
  textColor?: string; 
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; 
  paddingX?: string; 
  paddingY?: string;
  margin?: string; 
  border?: string; 
}

const ButtonTheme: React.FC<ButtonThemeProps> = ({ bgColor, textColor = 'text-black', children, onClick, paddingX = 'px-4', paddingY = 'py-2', margin, border }) => {
  return (
    <button
      className={`${bgColor}  ${textColor} rounded-[25px] ${paddingY} ${paddingX} hover:bg-teal-700 ${margin} ${border}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonTheme; 