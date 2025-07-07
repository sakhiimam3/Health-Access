"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

interface Service {
  title: string;
  image: StaticImageData | string;
}

interface VaccinationServicesProps {
  title: string;
  services: Service[];
  viewAllLink?: boolean;
  type?: string;
  link?: string;
  isNested?: boolean;
}

const VaccinationServices: React.FC<VaccinationServicesProps> = ({
  title,
  services,
  viewAllLink,
  type,
  link,
  isNested,
}) => {

  const router = useRouter();

  return (
    <section className="py-8 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-8 text-[#52525B]">{title}</h2>

        {viewAllLink && services.length > 4 && (
          <div>
            <Link
              href={`/services/?type=${type}`}
              className="underline text-[#52525B]  hover:text-teal-500"
            >
              View All
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => router.push(`${isNested ? `${link}` :  `${link}/${service?.title.replace(/\s+/g, "-")}?serviceName=${service.title.replace(/\s+/g, "-")}`}`)}
            className="rounded-lg cursor-pointer overflow-hidden min-h-[200px] group"
          >
            <div className="relative rounded">
              <div className="absolute inset-0 bg-gradient-to-t from-[#189BA3]/80 via-[#189BA3]/40 to-transparent z-10 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={service.image}
                alt="Medical consultation"
                width={350}
                height={200}
                className="rounded-[16px] object-cover h-[200px]"
                priority
              />
            </div>
            <div className="my-4">
              <h3 className="text-md  text-[#52525B] font-[700] font-ubantu ">
                {service.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VaccinationServices;
