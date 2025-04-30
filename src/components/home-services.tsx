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
import Link from "next/link";



const homeServices = ({link, isNested}: {link: string, isNested: boolean}) => {
  const servicesData = [
    {
      title: "Travel Vaccines",
      image: Vs1,
      link: link,
    },
    {
      title: "Weight Management",
      image: Vs2,
      link: link,
    },
    {
      title: "Vitamin B12 Injections",
      image: Vs3,
      link: link,
    },
    {
      title: "Yellow Fever Clinic",
      image: Vs4,
      link: link,
    },
  ];

  const cosmeticServicesData = [
    {
      title: "Skin Boosters",
      image: Cs1,
      link: link,
    },
    {
      title: "Dermal Fillers",
      image: Cs2,
      link: link,
    },
    {
      title: "Lip Fillers",
      image: Cs3,
      link: link,
    },
    {
      title: "Anti-Sweat Injections",
      image: Cs4,
      link: link,
    },
  ];

  const pharmacyServicesData = [
    {
      title: "UTI Review",
      image: Ph1,
      link: link,
    },
    {
      title: "Shingles Review",
      image: Ph2,
      link: link,
    },
    {
      title: "Sore Throat Review",
      image: Ph3,
      link: link,
    },
    {
      title: "Sinusitis",
      image: Ph4,
      link: link,
    },
  ];

  function shuffleArray(arr: any) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return (
    <section className="mb-12">
      <LayoutWrapper>
        <div>
          <DifferentServices
            title="Vaccination Services"
            services={shuffleArray(servicesData)}
            type="vaccination"
            link={link}
            isNested={isNested}
            viewAllLink={true}
          />
        </div>
        <div>
          <DifferentServices
            title="Cosmetic Services"
            services={shuffleArray(cosmeticServicesData)}
            link={link}
            type="cosmetic"
            isNested={isNested}
            viewAllLink={true}
          />
        </div>
        <div>
          <DifferentServices
            title="Pharmacy 1st Services"
            services={shuffleArray(pharmacyServicesData)}
            link={link}
            type="pharmacy 1st services"
            isNested={isNested}
            viewAllLink={true}
          />
        </div>
        <div className="flex justify-center items-center">
          <Link href={link}>
          <ButtonTheme
            bgColor="bg-[#52525B] hover:bg-[#52525B] px-12"
            textColor="text-white"
            paddingX="px-14"
            paddingY="py-3"
          >
            View All Services
          </ButtonTheme>
          </Link>
        </div>

        <div className="border-t-2 border-[#DCDCDC] mt-10"></div>
      </LayoutWrapper>
    </section>
  );
};

export default homeServices;
