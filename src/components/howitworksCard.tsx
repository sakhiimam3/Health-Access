import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { isValid } from "date-fns";
import isValidUrl from "@/lib/isValidUrl";

interface HowItWorksCardProps {
  icon: string;
  title: string;
  text: string;
}

const HowItWorksCard = ({ icon, title, text }: HowItWorksCardProps) => {
  return (
    <Card className="shadow-sm h-[240px] max-h-[240px] flex flex-col justify-center rounded-[16px] hover:cursor-pointer transition-shadow hover:bg-[#189BA3] group border-dashed border-[#AFB7CA]">
      <CardContent className="p-6 h-full flex flex-col justify-center">
        <div className="flex flex-col items-start gap-5 h-full justify-center">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-white/20">
            <Image
              src={isValidUrl(icon) ? icon : "/images/notfound.jpg"}
              width={50}
              height={30}
              alt={`name-${title}`}
            />
          </div>
          <div className="space-y-1 w-full">
            <h3 className="text-sm font-semibold mb-2 group-hover:text-white line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-[#52525B] group-hover:text-white line-clamp-3 overflow-hidden text-ellipsis">
              {text}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksCard;
