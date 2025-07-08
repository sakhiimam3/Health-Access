"use client"
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import React, { useState } from "react";
import { PharmacyCard } from "@/components/sliderCard";
import Image from "next/image";
import { useGetPartners } from "@/lib/hooks";

const SearchPage = () => {
  // State for filter and limit
  const [limit, setLimit] = useState(10);
  // Add more filter states as needed

  // Fetch partners with current limit (and filters if any)
  const { data:partnersdata, isLoading, error } = useGetPartners();
  console.log(partnersdata,"partnersdata11")
  // Handle select changes
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  return (
    <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
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
                <div className="grid my-10 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {isLoading && <div>Loading...</div>}
                  {error && <div>Error loading pharmacies</div>}
                  {partnersdata?.data?.map((pharmacy: any) => (
                    <PharmacyCard
                      key={pharmacy.id}
                      id={pharmacy.id}
                      title={pharmacy.businessName}
                      address={pharmacy?.location?.name}
                      image={pharmacy.imageSrc}
                      btnText="View services"
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
