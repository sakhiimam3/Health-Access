'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilterIcon, SearchIcon, SearchTwoIcon } from './icons/icons';
import { Input } from '@/components/ui/input';
import { X as XIcon } from 'lucide-react';

// Define the type for vaccination data
interface VaccinationEntry {
  vaccine: string;
  course: string;
  pricePerDose: string;
}

const VaccinationPriceList: React.FC = () => {
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      setSearchTags([...searchTags, searchInput.trim()]);
      setSearchInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSearchTags(searchTags.filter(tag => tag !== tagToRemove));
  };

  // Vaccination data matching the image
  const vaccinationData: VaccinationEntry[] = [
    {
      vaccine: "Chickenpox",
      course: "2 doses",
      pricePerDose: "£85/dose"
    },
    {
      vaccine: "Cholera",
      course: "2 doses",
      pricePerDose: "£99/dose"
    },
    {
      vaccine: "Diphtheria",
      course: "1 doses",
      pricePerDose: "£40/dose"
    },
    {
      vaccine: "Hepatitis A",
      course: "1 doses",
      pricePerDose: "£80/dose"
    },
    {
      vaccine: "Japanese Encephalitis",
      course: "2 doses",
      pricePerDose: "£118/dose"
    },
    {
      vaccine: "Polio",
      course: "1 doses",
      pricePerDose: "£40/dose"
    }
  ];

  return (
    <>
    <Card className="w-full rounded-[10px] border-[#DCDCDC]">
      <CardHeader>
        <CardTitle className='text-2xl mb-1 font-[500] font-ubantu'>Vaccination Price List</CardTitle>
        <CardDescription className='text-sm font-normal text-[#52525B] font-roboto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</CardDescription>

      </CardHeader>
      <div className='border-t-2 border-[#DCDCDC] mt-2'></div>

      <CardContent className="p-0">

        <div className="px-2 py-4">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between  my-2 w-full">
              <div className="relative w-[300px]  mt-2">
                <div className="absolute left-3  top-1/2 transform -translate-y-1/2">
                  <SearchTwoIcon width={20} height={20} color="#737373" />
                </div>
                <Input 
                  type="text" 
                  placeholder="Search vaccines" 
                  className="pl-10 h-11 w-full rounded-[25px] border-[#737373]"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
              <div className='flex items-center'>
                <Button variant="outline" className="border border-[#DCDCDC] h-11 px-4 rounded-[25px] flex items-center gap-2">
                  <FilterIcon />
                  <span>Filters</span>
                </Button>
              </div>
            </div>

            {searchTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {searchTags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-[#F3F4F6] text-[#4B5563] rounded-[4px] text-sm border border-[#E5E7EB]"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-[#EEEEEE] rounded-full p-1 transition-colors"
                    >
                      <XIcon size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#189BA3] text-white">
              <th className="p-2 text-left">Vaccines</th>
              <th className="p-2 text-left">Course</th>
              <th className="p-2 text-left">Price/dose</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccinationData.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{entry.vaccine}</td>
                <td className="p-3">{entry.course}</td>
                <td className="p-3">{entry.pricePerDose}</td>
                <td className="p-3 text-right">
                  <Button  size="sm" className="font-roboto">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
            
    </Card>
          <div className='flex justify-center w-full'>
            <span className='text-sm text-center mt-5 font-roboto text-[#B3261E]'>** Vaccine prices and availability are subject to change. Please confirm the latest prices and availability directly with your selected pharmacy when booking your appointment.</span>
          </div>
    </>
  );
};

export default VaccinationPriceList;