"use client";
import React from "react";
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
interface PharmacyService {
  id: string;
  name: string;
}



export const PharmacyCard = ({
  id,
  title,
  address,
  services,
  image,
}: {
  id: string;
  title: string;
  address: string;
  services: PharmacyService[];
  image: StaticImageData | string;
}) => {
  const colors = ["#63DBA3", "#79A6F2", "#AA23DB"];
  const router = useRouter();
  return (
    <Card className="overflow-hidden hover:bg-gray-50 ">
      <CardHeader>
        <div className="relative rounded-t-[16px] h-[250px] ">
          <Image
            src={image}
            alt="Medical consultation"
            //   fill
            //   className="object-cover"
            priority
          />
        </div>{" "}
      </CardHeader>
      <CardContent>
        <div className="space-y-2 min-h-[100px]">
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
          <h3 className="text-lg  font-semibold my-2">{title}</h3>

          <div className="flex items-center gap-2   text-[#52525B] font-roboto">
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
            <p className="text-sm">{address}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex  gap-4">
        <ButtonTheme
          bgColor="bg-[#189BA3]"
          paddingX="px-8"
          textColor="text-white"
          className="px-4 hover:bg-teal-700"
        >
          Book Now
        </ButtonTheme>
        <Button variant={"link"} onClick={() => router.push(`/pharmacy/?id=${id}`)} className="underline hover:text-teal-600">
          View Pharmacy
        </Button>
      </CardFooter>
    </Card>
  );
};
