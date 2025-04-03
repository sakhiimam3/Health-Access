// VitaminInfo.tsx
import React from "react";
import Image from "next/image";
import { CheckIcon } from "./icons/icons";

interface VitaminInfoProps {
  title: string;
  description: string;
  imageSrc: string;
  description2?: string;
  isReverse?: boolean;
}

const VitaminInfo: React.FC<VitaminInfoProps> = ({
  title,
  description,
  imageSrc,
  description2,
  isReverse,
}) => {
  const listItems = [
    "Extreme Tiredness",
    "Breathlessness",
    "Palpitations",
    "Loss Of Appetite",
    "Lack Of Energy",
    "Feeling Faint",
    "Pale Skin",
    "Weight Loss",
  ];
  return (
    <div
      className={`flex flex-col  ${
        isReverse ? "md:flex-row-reverse" : ""
      } h-[500px] border-2 border-[borderColor] md:flex-row w-full bg-white rounded-lg overflow-hidden`}
    >
      {/* Left section with text content */}
      {!isReverse ? (
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold headingText mb-4 font-ubantu">
            {title}
          </h1>
          <p className="text-sm leading-relaxed paragraphColor">
            {description}
          </p>
          <p className="text-sm leading-relaxed paragraphColor mt-4">
            {description2}
          </p>
        </div>
      ) : (
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl max-w-[500px] font-bold headingText mb-4 font-ubantu">
            {title}
          </h1>
          <p className="text-sm font-roboto paragraphColor">{description}</p>

          <ul className="grid grid-cols-2 gap-2 my-4">
            {listItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-[#5D5D5D] font-roboto"
              >
                <span className="text-teal-500 mr-2">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Right section with image */}
      <div className="w-full md:w-1/2   relative h-64 md:h-auto">
        <Image
          src={imageSrc}
          alt={title}
          fill
          objectFit="cover"
          className={`w-full h-full ${isReverse ? "rounded-[10px]" : ""}`}
        />
      </div>
    </div>
  );
};

export default VitaminInfo;
