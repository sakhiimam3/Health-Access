import React from "react";
import ButtonTheme from "./shared/ButtonTheme";
import Link from "next/link";
import { useUserContext } from "@/context/userStore";

interface NHSServicesCardProps {
  serviceName: string;
  pharmacyName: string;
  pharmacyDescription: string;
  serviceId: string;
  partnerId: string;
  address: string;
}

const NHSServicesCard: React.FC<NHSServicesCardProps> = ({
  serviceName,
  pharmacyName,
  pharmacyDescription,
  serviceId,
  partnerId,
  address,
}) => {
  const { user } = useUserContext();

  
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
          NHS Services at {pharmacyName}
        </h1>
        <h2 className="text-3xl font-semibold mt-2 mb-2">{serviceName}</h2>
      </div>

      {/* Bottom Right Text Box */}
      <div className="absolute bottom-[120px] right-[80px] z-20 max-w-[620px] p-4 rounded-md">
        <p className="text-lg  leading-6 font-roboto mb-4  text-[#E4E4E4]">
          {pharmacyDescription}
        </p>
        {user?.data?.role === "customer" ? (
          <Link
            href={`/booking-form?partnerId=${partnerId}&serviceId=${serviceId}&serviceName=${encodeURIComponent(serviceName)}&address=${encodeURIComponent(address)}`}
          >
            <ButtonTheme
              bgColor="bg-[#189BA3]"
              className="my-6 text-white py-3 text-lg rounded-[24px]"
              children="Book Now"
              paddingX="px-12"
            />
          </Link>
        ) : !user ? (
          <div className="relative group inline-block">
            <ButtonTheme
              bgColor="bg-[#189BA3]"
              className="my-6 text-white py-3 text-lg rounded-[24px] opacity-60 cursor-not-allowed"
              children="Book Now"
              paddingX="px-12"
              disabled={true}
            />
            <div className="absolute left-1/2 -translate-x-1/2  w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              You need to login first
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NHSServicesCard;
