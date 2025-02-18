"use client";
import React from "react";
import Image from "next/image";
import frameImage from "../../public/images/Frame.png";
import ukMap from "../../public/images/ukmap.png";
import LayoutWrapper from "./layout/wrapper";
import ButtonTheme from "./shared/ButtonTheme";

const TrustedPartner = () => {
  return (
    <section className="">
      <LayoutWrapper>
        <div
          style={{ backgroundImage: `url(${frameImage.src})` }}
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-14 mb-12 bg-cover bg-center"
        >
          {/* Left Content */}
          <div className=" space-y-4 ">
            <h2 className="text-xl max-w-lg md:text-4xl font-bold leading-[76.8px]">
              Your Trusted Partner in Health Access Across the UK
            </h2>
            <p className="text-[#52525B] text-md">
              Explore our nationwide network of pharmacies offering<br />
              quality healthcare services. Join 5,000+ satisfied customers <br />
              benefiting from 200+ trusted locations.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xl font-bold">15K+</p>
                <p className="text-[#52525B] text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-xl font-bold">200+</p>
                <p className="text-[#52525B] text-sm">Partner Pharmacies</p>
              </div>
              <div>
                <p className="text-xl font-bold">24/7</p>
                <p className="text-[#52525B] text-sm">Booking Access</p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-bold">99%</p>
                <p className="text-[#52525B] text-sm">Customer Satisfaction</p>
              </div>
            </div>
            <div className="flex mt-4 gap-4">
              <ButtonTheme
               bgColor="bg-[#189BA3]"
               paddingX="px-4"
               textColor="text-white"
              >
                Find Pharmacies
                </ButtonTheme>
              <button className="underline">View Services</button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image src={ukMap} alt="UK Map" width={400} height={400} />
          </div>
        </div>
        <div className="border-t-2 border-gray-200 "></div>
      </LayoutWrapper>
    </section>
  );
};

export default TrustedPartner;
