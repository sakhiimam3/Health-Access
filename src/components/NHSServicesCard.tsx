import React from "react";
import ButtonTheme from "./shared/ButtonTheme";

const NHSServicesCard: React.FC = () => {
  return (
    <div className="relative w-full h-[900px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/nhs-bg.png")',
          backgroundPosition: "center",
        }}
      />

      {/* Top Left Text Box */}
      <div className="absolute top-40 left-24 z-20 max-w-[550px] text-white p-4 rounded-md">
        <h1 className="text-5xl font-bold  text-white font-ubantu mb-2">
          NHS Services at Warburtons Pharmacy
        </h1>
      </div>

      {/* Bottom Right Text Box */}
      <div className="absolute bottom-[120px] right-[80px] z-20 max-w-[620px] p-4 rounded-md">
        <p className="text-lg  leading-6 font-roboto mb-4  text-[#E4E4E4]">
          Warburtons Pharmacy is proud to offer a variety of NHS services to
          meet your healthcare needs. From minor ailment treatments like sore
          throat consultations and UTI care to professional advice and
          medication support, we're here to help.
        </p>

        <ButtonTheme bgColor="bg-bgbtn"  className="text-white" paddingX="px-10" paddingY="py-2" >
          Book Now
        </ButtonTheme>
      </div>
    </div>
  );
};

export default NHSServicesCard;
