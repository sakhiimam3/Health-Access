import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import React from "react";
import pharmacy1 from "@public/images/pharmacy-1.png";
import pharmacy2 from "@public/images/pharmacy-2.png";
import pharmacy3 from "@public/images/pharmacy-3.png";
import pharmacy4 from "@public/images/pharmacy-1.png";
import pharmacy5 from "@public/images/pharmacy-2.png";
import { PharmacyCard } from "@/components/sliderCard";
import Image from "next/image";

const SearchPage = () => {
  const pharmacies = [
    {
      id: "123",
      imageSrc: pharmacy1,
      title: "CarePlus Pharmacy",
      description: "45 High Street, Birmingham, B4 7SL",
      address: "Pharmacy Address",
      btnText: "View services",
    },
    {
      id: "1234",
      imageSrc: pharmacy2,
      title: "Warburtons Pharmacy ",
      address: "78 Deansgate, Manchester, M3 2FW",
      btnText: "View services",
    },
    {
      id: "1235",
      imageSrc: pharmacy3,
      title: "Warburtons Pharmacy",
      address: "78 Deansgate, Manchester, M3 2FW",
      btnText: "View services",
    },
    {
      id: "1236",
      imageSrc: pharmacy4,
      title: "CityCare Pharmacy",
      address: "101 Queen Street, Glasgow, G1 3DN",
      phone: "12345 678910",
      btnText: "View services",
    },
    {
      id: "1237",
      imageSrc: pharmacy5,
      title: "New Pharmacy",
      address: "123 New Street, London, E1 6AN",
      phone: "11122 334455",
      btnText: "View services",
    },
    {
        id: "1238",
        imageSrc: pharmacy4,
        title: "CityCare Pharmacy",
        address: "101 Queen Street, Glasgow, G1 3DN",
        phone: "12345 678910",
        btnText: "View services",
      },
      {
        id: "1236",
        imageSrc: pharmacy4,
        title: "CityCare Pharmacy",
        address: "101 Queen Street, Glasgow, G1 3DN",
        phone: "12345 678910",
        btnText: "View services",
      },
      {
        id: "1237",
        imageSrc: pharmacy5,
        title: "New Pharmacy",
        address: "123 New Street, London, E1 6AN",
        phone: "11122 334455",
        btnText: "View services",
      },
      {
          id: "1238",
          imageSrc: pharmacy4,
          title: "CityCare Pharmacy",
          address: "101 Queen Street, Glasgow, G1 3DN",
          phone: "12345 678910",
          btnText: "View services",
        },
  ];
  return (
    <PagesWrapper isSearchPage={true}  bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <LayoutWrapper>
        <section className="mt-60 mb-10">
          <div className="w-full flex gap-10">
            <div className="w-[60%]">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-plusJakartaSans font-medium ">
                    Showing 1 – 10 of 18 results
                  </p>
                </div>
                <div className="w-[20%] py-3 px-4 border border-gray-[#737373] rounded-[30px]">
                  <select className="w-full text-[#737373] outline-none border-none">
                    <option value="" disabled selected>
                      Filter
                    </option>
                    <option value="1">1 per page</option>
                    <option value="2">5 per page</option>
                    <option value="3">10 per page</option>
                  </select>
                </div>
              </div>
              <div>
                <div  className="grid  my-10  md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {pharmacies.map((pharmacy) => (
                    <PharmacyCard
                      key={pharmacy.id}
                      id={pharmacy.id}
                      title={pharmacy.title}
                      address={pharmacy.address}
                      image={pharmacy.imageSrc}
                      btnText={pharmacy.btnText}
                      isSearch={true}
                      services={[]}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[40%]">
      <div className="relative w-full h-full">
        <Image
          src="/images/search-map.png"
          alt="Map"
          className="w-full h-full object-cover rounded-[10px]"
          fill
          priority
          objectFit="cover"
        />
      </div>
    </div>
          </div>
        </section>
      </LayoutWrapper>
    </PagesWrapper>
  );
};

export default SearchPage;
