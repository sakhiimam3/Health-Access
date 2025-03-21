import React from 'react';

interface HeaderBannerProps {
  image: string;
  title?: string;
  textColor?: string;
  overlayColor?: string;
  height?: string;
}

const PagesBanner: React.FC<HeaderBannerProps> = ({
  image,
  title = "Privacy Services",
  textColor = "text-blue-400",
  overlayColor = "from-blue-500/40 to-blue-600/40",
  height = "h-24"
}) => {
  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt="Banner background" 
          className="w-full h-full object-cover"
          

        />
        {/* Overlay with gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor}`}></div>
      </div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center h-full w-full">
        <h1 className={`text-xl md:text-2xl font-bold ${textColor}`}>
          {title}
        </h1>
        
        {/* Dotted line */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center">
            <div className="w-16 md:w-24 h-px border-t-2 border-dashed border-blue-400 mr-3"></div>
            <div className="w-16 md:w-24 h-px border-t-2 border-dashed border-blue-400 ml-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesBanner;