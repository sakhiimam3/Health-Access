import React from "react";
import ButtonTheme from "@/components/shared/ButtonTheme";
import Image from "next/image";

interface VaccineSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonText: string;
}

const VaccineSection: React.FC<VaccineSectionProps> = ({
  title,
  description,
  imageSrc,
  buttonText,
}) => {
  return (
    <section>
      <div className="grid lg:grid-cols-2 gap-6 mt-16 mb-8">
        <h2 className="text-2xl md:text-3xl max-w-[800px] font-bold leading-tight">
          {title}
        </h2>
        <div className="mb-5">
          <p className="paragraphColor text-md font-roboto mb-5 ">
            {description}
          </p>

          <ButtonTheme
            bgColor="bg-[#189BA3]"
            className="my-6 text-white py-3 text-lg rounded-[24px]"
            children={buttonText}
            paddingX="px-12"
          />
        </div>
      </div>
      <div className="relative mt-6 rounded-[10px]">
        <Image
          src={imageSrc}
          alt={title}
          width={900}
          height={500}
          className="rounded-[10px] shadow-md w-full"
        />
        <div className="absolute top-1/2 left-[30%] w-[40%] h-0 transform -translate-y-1/2" />
      </div>
      <div className="border-t-2 border-gray-200 mt-24"></div>
    </section>
  );
};

export default VaccineSection;
