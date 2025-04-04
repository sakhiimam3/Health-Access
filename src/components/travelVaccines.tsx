import React from "react";
import { CombIcon, VaccineIcon } from "./icons/icons";
interface TravelVaccinesProps {
  title: string;
  vaccines?: {
    name: string;
    description: string;
  }[];
  mensHealthVaccines?: {
    title: string;
    points: string[];
  }[];
}

const TravelVaccines: React.FC<TravelVaccinesProps> = ({ vaccines, title, mensHealthVaccines }) => {
  return (
    <div className="py-12">

      <h2 className="text-center font-ubantu font-[500] text-3xl  mb-8">{title}</h2>
      {title === "Common Travel Vaccines" ? (
        <div className="grid md:grid-cols-3 gap-8">
          {vaccines.map((vaccine, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start flex-col gap-3">
                <span className="text-2xl">
                <VaccineIcon /> 
                </span>
                <h3 className="text-xl font-[500] font-ubantu">{vaccine.name}</h3>
              </div>
              <p className="mt-2 text-sm paraGraphColor font-roboto">{vaccine.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">       
          {mensHealthVaccines.map((mensHealthVaccine, index) => (
            <div key={index} className="p-6">
              <span className="text-2xl block mb-6">
                <CombIcon />
              </span>
              <h3 className="text-xl font-[500] font-ubantu">{mensHealthVaccine.title}</h3>
            
              <ul className="list-disc list-inside py-2">
                {mensHealthVaccine.points.map((point, index) => (
                  <li key={index} className="text-[13px] text-[#52525B] my-2 paraGraphColor font-roboto">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}  
      <div className='border-t-2 border-[#DCDCDC] mt-10'></div>
    </div>
  );
};

export default TravelVaccines;
