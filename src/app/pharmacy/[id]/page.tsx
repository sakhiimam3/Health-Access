"use client"
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import Image from "next/image";
import pharmacy1 from "../../../../public/images/pharmacy-1.png";
import pharmacy2 from "../../../../public/images/pharmacy-2.png";
import pharmacy3 from "../../../../public/images/pharmacy-3.png";
import pharmacy4 from "../../../../public/images/pharmacy-1.png";
import pharmacy5 from "../../../../public/images/pharmacy-2.png";
import { useParams } from "next/navigation";

const PharmacyDetails = () => {
  const { id } = useParams();
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
  console.log(pharmacy);
    
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={pharmacy?.title}
          image="/images/pharmacy-detail.png"
          height="h-85"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
          isDetail={true}
        />
        <LayoutWrapper>
          <h1>Pharmacy Details</h1>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default PharmacyDetails;
