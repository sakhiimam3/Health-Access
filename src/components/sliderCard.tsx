"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";
import ButtonTheme from "./shared/ButtonTheme";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';
import pharmacy1 from "../../public/images/pharmacy-1.png";

interface PharmacyService {
  id: string;
  name: string;
}

import { X } from 'lucide-react'; // Optional: For a nicer close icon
import Modal from "./modal";





export const PharmacyCard = ({
  id,
  title,
  address,
  services,
  image,
  isSearch,
  btnText,
}: {
  id: string;
  title: string;
  address: string;
  services: PharmacyService[];
  image: StaticImageData | string;
  isSearch: boolean;
  btnText: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const colors = ["#63DBA3", "#79A6F2", "#AA23DB"];
  const router = useRouter();
  const imageSrc = typeof image === 'string' ? image : pharmacy1.src;
  return (
    <>
      <Card   className={`overflow-hidden ${isSearch ? "shadow-none" : "shadow-sm"}  hover:bg-gray-50 ${isSearch && "border-none"} `}>
        <CardHeader>
          <div className={`relative rounded-t-[16px] ${isSearch ? "h-[130px]" : "h-[250px]"} `}>
            <img
              src={imageSrc}
              alt="Medical consultation"
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              //   fill
              //   className="object-cover"
              priority
            />
          </div>{" "}
        </CardHeader>
        <CardContent    >
          <div className={`space-y-2 ${isSearch ? "min-h-[50px]" : "min-h-[100px]"} `} >
            {!isSearch && (
              <div className="flex flex-wrap gap-2 my-4">
              {services.length > 0 ? (
                services.map((service) => {
                  const randomColor =
                    colors[Math.floor(Math.random() * colors.length)];
                  return (
                    <Badge
                      key={service.id}
                      variant="secondary"
                      style={{
                        border: `1px solid ${randomColor} `,
                        color: randomColor,
                      }}
                      className={`bg-transparent hover:bg-opacity-50 `}
                    >
                      <span className={`text-${"green"} font-roboto font-normal`}>
                        {service.name || "NHS Services"}
                      </span>
                    </Badge>
                  );
                })
              ) : (
                <p></p>
              )}
            </div>
            )}
            <h3 className={`text-lg  font-semibold my-2 `}>{title}</h3>

            <div className={`flex ${isSearch ? "items-end" : "items-center"}  gap-2    text-[#52525B] font-roboto`}>
              <svg
                width="14"
                height="18"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 20H11.1131C11.892 19.3045 12.6266 18.5608 13.3125 17.7734C15.8859 14.8138 17.25 11.6937 17.25 8.75C17.25 6.56196 16.3808 4.46354 14.8336 2.91637C13.2865 1.36919 11.188 0.5 9 0.5C6.81196 0.5 4.71354 1.36919 3.16637 2.91637C1.61919 4.46354 0.75 6.56196 0.75 8.75C0.75 11.6937 2.11031 14.8138 4.6875 17.7734C5.37338 18.5608 6.10795 19.3045 6.88687 20H2.25C2.05109 20 1.86032 20.079 1.71967 20.2197C1.57902 20.3603 1.5 20.5511 1.5 20.75C1.5 20.9489 1.57902 21.1397 1.71967 21.2803C1.86032 21.421 2.05109 21.5 2.25 21.5H15.75C15.9489 21.5 16.1397 21.421 16.2803 21.2803C16.421 21.1397 16.5 20.9489 16.5 20.75C16.5 20.5511 16.421 20.3603 16.2803 20.2197C16.1397 20.079 15.9489 20 15.75 20ZM9 5.75C9.59334 5.75 10.1734 5.92595 10.6667 6.25559C11.1601 6.58524 11.5446 7.05377 11.7716 7.60195C11.9987 8.15013 12.0581 8.75333 11.9424 9.33527C11.8266 9.91721 11.5409 10.4518 11.1213 10.8713C10.7018 11.2909 10.1672 11.5766 9.58527 11.6924C9.00333 11.8081 8.40013 11.7487 7.85195 11.5216C7.30377 11.2946 6.83524 10.9101 6.50559 10.4167C6.17595 9.92336 6 9.34334 6 8.75C6 7.95435 6.31607 7.19129 6.87868 6.62868C7.44129 6.06607 8.20435 5.75 9 5.75Z"
                  fill="#52525B"
                />
              </svg>
              <p className={`text-[12px] ${isSearch ? "mt-3" : "mt-0"} truncate`}>{address}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-2 pt-0 flex  gap-4">
          {/* <ButtonTheme
            bgColor="bg-[#189BA3]"
            paddingX={isSearch ? "px-3" : "px-8"}
            textColor="text-white"
            className={`hover:bg-teal-700 ${isSearch ? "text-[12px]" : "text-sm"}`}
            onClick={() => setIsModalOpen(true)}
          >
            Book Now
          </ButtonTheme> */}
          <Button
            variant={"link"}
            onClick={() => router.push(`/pharmacy/${id}`)}
            className="underline hover:text-teal-600"
          >
            {btnText}
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

// const pharmacySlider = () => {
//   const { data, isLoading, error, refetch } = useGetPartners();

//   // Show loader while data is loading
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p>
//           <Loader2 className="w-10 h-10 animate-spin" />
//         </p>
//       </div>
//     );
//   }

//   // Ensure data is valid before rendering
//   if (!data || !data.data || data.data.length === 0) {
//     return null; // Return null if no data is available
//   }

//   return (
//     <section className="mb-12">
//       <LayoutWrapper>
//         <div className="mb-10">
//           <CenterHeader
//             title="Trusted Pharmacies, Ready to Serve You"
//             description="Explore the top-rated pharmacies on Health Access, handpicked for their exceptional service and customer satisfaction. Find the perfect match for your healthcare needs."
//           />
//         </div>
//         <div className="relative">
//           <Carousel className="w-full">
//             <CarouselContent className="gap-2">
//               {data.data.map((pharmacy: any, index: any) => (
//                 <CarouselItem
//                   key={index}
//                   className="pl-2 md:basis-1/2 lg:basis-1/3"
//                 >
//                   <PharmacyCard
//                     image={pharmacy.image || pharmacy1}
//                     title={pharmacy.businessName}
//                     address={pharmacy.location?.name}
//                     services={pharmacy.services || []}
//                     id={pharmacy.id}
//                     isSearch={false}
//                     key={pharmacy.id}
//                     btnText={"View Pharmacy"}
//                   />
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <div className="absolute bottom-[-30px] right-12 flex gap-1">
//               <CarouselPrevious className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
//               <CarouselNext className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
//             </div>
//           </Carousel>
//         </div>
//         <div className="border-t-2 border-gray-200 mt-24"></div>
//       </LayoutWrapper>
//     </section>
//   );
// };
