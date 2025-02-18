import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Service {
  title: string;
  image: string;
}

interface VaccinationServicesProps {
  title: string;
  services: Service[];
  viewAllLink?: string;
  type?: string;
}

const VaccinationServices: React.FC<VaccinationServicesProps> = ({
  title,
  services,
  viewAllLink,
  type,
}) => {
  return (
    <section className="py-8 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-8 text-[#52525B]">{title}</h2>

        {true && (
          <div>
            <Link href={viewAllLink || ""} className="underline text-[#52525B]  hover:text-teal-500">
              View All
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div key={index} className="rounded-lg overflow-hidden min-h-[200px]">
            <div className="relative rounded">
              {index === 0 && type === "vaccination" ? (
                <div className="absolute inset-0 bg-gradient-to-t from-[#189BA3]/80 via-[#189BA3]/40 to-transparent z-10 rounded-[16px]" />
              ) : null}
              <Image
                src={service.image}
                alt="Medical consultation"
                width={330}
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
