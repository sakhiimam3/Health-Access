import { Loader2 } from 'lucide-react';
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
  isLoading?: boolean;
}

const ButtonTheme: React.FC<ButtonThemeProps> = ({ bgColor, textColor = 'text-black', children, onClick, paddingX = 'px-4', paddingY = 'py-2', margin, border, className, isLoading }) => {
  return (
    <button
      className={`${bgColor} ${className}  ${textColor}   font-ubantu  ${paddingY} ${paddingX} hover:bg-teal-700 ${margin} ${border}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? `Processing.....` : children}
    </button>
  );
};

export default ButtonTheme; 