import React from "react";
import LayoutWrapper from "./layout/wrapper";
import DifferentServices from "./different-services";
import Vs1 from "../../public/images/vs-1.png";
import Vs2 from "../../public/images/vs-2.png";
import Vs3 from "../../public/images/vs-3.png";
import Vs4 from "../../public/images/vs-4.png";
import Cs1 from "../../public/images/cs-1.png";
import Cs2 from "../../public/images/cs-2.png";
import Cs3 from "../../public/images/cs-3.png";
import Cs4 from "../../public/images/cs-4.png";

import Ph1 from "../../public/images/ph-1.png";
import Ph2 from "../../public/images/ph-2.png";
import Ph3 from "../../public/images/ph-3.png";
import Ph4 from "../../public/images/ph-4.png";
import ButtonTheme from "./shared/ButtonTheme";



const homeServices = () => {
  const servicesData = [
    {
      title: "Travel Vaccines",
      image: Vs1,
    },
    {
      title: "Weight Management",
      image: Vs2,
    },
    {
      title: "Vitamin B12 Injections",
      image: Vs3,
    },
    {
      title: "Yellow Fever Clinic",
      image: Vs4,
    },
  ];

  const cosmeticServicesData = [
    {
      title: "Skin Boosters",
      image: Cs1,
    },
    {
      title: "Dermal Fillers",
      image: Cs2,
    },
    {
      title: "Lip Fillers",
      image: Cs3,
    },
    {
      title: "Anti-Sweat Injections",
      image: Cs4,
    },
  ];

  const pharmacyServicesData = [
    {
      title: "UTI Review",
      image: Ph1,
    },
    {
      title: "Shingles Review",
      image: Ph2,
    },
    {
      title: "Sore Throat Review",
      image: Ph3,
    },
    {
      title: "Sinusitis",
      image: Ph4,
    },
  ];

  return (
    <section className="mb-12">
      <LayoutWrapper>
        <div>
          <DifferentServices
            title="Vaccination Services"
            services={servicesData}
            type="vaccination"
          />
        </div>
        <div>
          <DifferentServices
            title="Cosmetic Services"
            services={cosmeticServicesData}
          />
        </div>
        <div>
          <DifferentServices
            title="Pharmacy 1st Services"
            services={pharmacyServicesData}
          />
        </div>
        <div className="flex justify-center items-center">
          <ButtonTheme
            bgColor="bg-[#52525B] hover:bg-[#52525B] px-12"
            textColor="text-white"
            paddingX="px-14"
            paddingY="py-3"
          >
            View All Services
          </ButtonTheme>
        </div>

        <div className="border-t-2 border-gray-200 mt-10"></div>
      </LayoutWrapper>
    </section>
  );
};

export default homeServices;
