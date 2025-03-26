"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
// import Image from "next/image";
import pharmacy1 from "../../../public/images/pharmacy-1.png";
import pharmacy2 from "../../../public/images/pharmacy-2.png";
import pharmacy3 from "../../../public/images/pharmacy-3.png";
import pharmacy4 from "../../../public/images/pharmacy-1.png";
import pharmacy5 from "../../../public/images/pharmacy-2.png";
import consultant from "../../../public/images/consultant.png";
import warbunsdeatil from "../../../public/images/warbunsdeatil.png";
import { useSearchParams } from "next/navigation";
import ButtonTheme from "@/components/shared/ButtonTheme";
import Image from "next/image";
import HomeServices from "@/components/home-services";
import VaccinationPriceList from "@/components/vaccinationTable";
import NHSServicesCard from "@/components/NHSServicesCard";
import { ClockIcon, EmailIcon, LocationIcon, SupportIcon } from "@/components/icons/icons";
import ContactUs from "@/components/contactus";

const PharmacyDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const pharmacies = [
    {
      id: "123",
      imageSrc: pharmacy1,
      title: "CarePlus Pharmacy",
      description: "45 High Street, Birmingham, B4 7SL",
      address: "Pharmacy Address",
      services: [],
    },
    {
      id: "1234",
      imageSrc: pharmacy2,
      title: "Warburtons Pharmacy ",
      address: "78 Deansgate, Manchester, M3 2FW",
      services: [],
    },
    {
      id: "1235",
      imageSrc: pharmacy3,
      title: "Warburtons Pharmacy",
      address: "78 Deansgate, Manchester, M3 2FW",
      services: [
        { id: "1", name: "Travel Vaccine" },
        { id: "2", name: "Antimalarial Vaccine" },
        { id: "3", name: "NHS Services" },
      ],
    },
    {
      id: "1236",
      imageSrc: pharmacy4,
      title: "CityCare Pharmacy",
      address: "101 Queen Street, Glasgow, G1 3DN",
      phone: "12345 678910",
      services: [
        { id: "1", name: "Travel Vaccine" },
        { id: "2", name: "Antimalarial Vaccine" },
        { id: "3", name: "NHS Services" },
      ],
    },
    {
      id: "1237",
      imageSrc: pharmacy5,
      title: "New Pharmacy",
      address: "123 New Street, London, E1 6AN",
      phone: "11122 334455",
      services: [
        { id: "1", name: "Travel Vaccine" },
        { id: "2", name: "Antimalarial Vaccine" },
        { id: "3", name: "NHS Services" },
      ],
    },
  ];
  const pharmacy = pharmacies.find((pharmacy) => pharmacy.id === id);
  const contactData = [
    {
      icon: EmailIcon,
      title: 'Email',
      content: 'contact@warburtonpharmacy.co.uk'
    },
    {
      icon: SupportIcon,
      title: 'Support',
      content: '+44 1234 567890'
    },
    {
      icon: LocationIcon,
      title: 'Address',
      content: '78 Deansgate, Manchester, M3 2FW, UK'
    },
    {
      icon: ClockIcon,
      title: 'Opening Hours',
      content: 'Start new chat'
    }
  ];

  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={pharmacy?.title}
          image="/images/pharmacy-detail.png"
          height="h-[200px]"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
          isDetail={true}
        />
        <LayoutWrapper>
          <section>
            <div className="grid lg:grid-cols-2 gap-6 my-16">
              <h2 className="text-2xl md:text-3xl max-w-[800px] font-bold leading-tight">
                Your Trusted Local Pharmacy for NHS and Private Services{" "}
              </h2>
              <div className="relative after:absolute after:w-4 after:h-0.5 after:-bottom-8 after:left-0 after:bg-[pink] before:absolute before:w-4 before:h-0.5 before:-top-8 before:left-0 before:bg-[#189BA3] mb-5">
                <p className="text-[#52525B] text-md font-roboto ">
                  Warburtons Pharmacy is a trusted and community-focused
                  independent pharmacy located in{" "}
                  <span className="text-[#189BA3] hover:underline cursor-pointer">
                    Manchester, M3 2FW
                  </span>
                  . Renowned for its friendly service and personalized care,
                  Warburtons Pharmacy is dedicated to offering exceptional
                  healthcare solutions and building strong relationships with
                  every customer.
                </p>
                <ButtonTheme
                  bgColor="bg-[#189BA3]"
                  className="my-6 text-white py-4 px-16  text-xl font-ubantu rounded-[100px]"
                  children="Book Now"
                />
              </div>
            </div>
          </section>
          <section>
            <div className="h-[600px] w-[92%] rounded-lg  relative">
              <Image
                src={warbunsdeatil}
                alt={"pharmacy-detail"}
                fill
                className="object-cover rounded-[10px]"
              />
              <div className="absolute top-[50px] right-[-100px] h-[250px] w-[240px] z-10">
                <Image
                  src={consultant}
                  alt={"pharmacy-small-detail"}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="border-t-1 border-[#DCDCDC] mt-10"></div>
          </section>
          <section>
            <div className="text-3xl  text-center font-bold my-14">
              Our Services
            </div>

            <HomeServices />
          </section>
          <section>
            <VaccinationPriceList />
          </section>
        </LayoutWrapper>
        <section className="mt-14">
          <NHSServicesCard />
        </section>
        <LayoutWrapper>
        <section >
          <ContactUs />
        </section>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default PharmacyDetails;
