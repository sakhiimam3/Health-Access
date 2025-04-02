import React from 'react';
import Breadcrumb from './breadcrum';

interface HeaderBannerProps {
  image?: string;
  title?: string;
  textColor?: string;
  fromColor?: string;
  toColor?: string;
  height?: string;
  isDetail?: boolean;
}

const PagesBanner: React.FC<HeaderBannerProps> = ({
  image,
  title,
  textColor,
  fromColor,
  toColor,
  height,
  isDetail,
}) => {
  return (
    <>
      {isDetail ? (
        <div className={`relative w-full ${height} overflow-hidden`}>
          <div className={`h-full w-full flex flex-col text-white items-center justify-center bg-[${fromColor}]`}>
            <Breadcrumb  />
            <h1 className={`text-white max-w-lg text-center text-3xl mt-4 font-ubantu  font-bold ${textColor}`}>{title}</h1>
          </div>
        </div>
      ) : (
        <div className={`relative w-full ${height} overflow-hidden`}>
          {/* Background Image */}
          <img 
            src={image} 
            alt="Banner background" 
            className="w-full h-full object-cover"
          />
          {/* Overlay with dynamic color */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to top, ${fromColor}95, ${toColor}60, transparent)`,
            }}
          />
          {/* Centered Text */}
          <div className="absolute z-10 inset-0 flex items-center justify-center">
            <h1 className={`text-xl md:text-2xl lg:text-3xl font-bold text-white ${textColor}`}>
              {title}
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default PagesBanner;