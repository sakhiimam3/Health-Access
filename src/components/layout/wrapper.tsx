import React from 'react';
import Header from './header';

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-[1380px] mx-auto px-4">
      {children}
    </div>
  );
};

export default LayoutWrapper;