import React from 'react';

interface HeaderBannerProps {
  image: string;
  title?: string;
  textColor?: string;
  fromColor?: string;
  toColor?: string;
  height?: string;
}

const PagesBanner: React.FC<HeaderBannerProps> = ({
  image,
  title = "Privacy Services",
  textColor = "text-white",
  fromColor = "#189BA3",
  toColor = "#189BA3",
  height = "h-32"
}) => {
  return (
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
          background: `linear-gradient(to top, ${fromColor}80, ${toColor}40, transparent)`,
        }}
      />
      {/* Centered Text */}
      <div className="absolute z-10 inset-0 flex items-center justify-center">
        <h1 className={`text-xl md:text-2xl font-bold text-white ${textColor}`}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PagesBanner;
