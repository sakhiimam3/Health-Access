import React from 'react';
import Image from 'next/image';
import Breadcrumb from './ui/breadcrumb';

interface PagesBannerProps {
  title?: string;
  image?: string;
  height?: string;
  textColor?: string;
  fromColor?: string;
  toColor?: string;
  isDetail?: boolean;
}

const PagesBanner = ({
  title,
  image,
  height = "h-96",
  textColor = "black",
  fromColor,
  toColor,
  isDetail
}: PagesBannerProps) => {
  return (
    <div className={`relative ${height} w-full`}>
      {!isDetail && image && (
        <Image
          src={image}
          alt={title || "Banner"}
          fill
          className="object-cover"
        />
      )}
      <div
        className={`absolute inset-0 ${
          isDetail ? 'bg-opacity-100' : 'bg-opacity-70'
        }`}
        style={{
          background: isDetail 
            ? fromColor 
            : `linear-gradient(to right, ${fromColor || '#000000'}, ${toColor || '#000000'})`
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          {isDetail && (
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { label: "Pharmacies", href: "/pharmacy" },
                  { label: title || "", href: "#" },
                ]}
              />
            </div>
          )}
          <h1 className={`text-4xl font-bold text-${textColor}`}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default PagesBanner;
