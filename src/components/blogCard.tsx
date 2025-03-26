"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image, { StaticImageData } from "next/image"

import { FC } from 'react';
import { useRouter } from "next/navigation";

interface NHSCardProps {
  imageSrc: string | StaticImageData;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
}

const NHSCard: FC<NHSCardProps> = ({
  imageSrc = "/images/blog1.png",
  title = "Default Title", 
  description = "Default description for the NHS services.", 
  author = "Admin", 
  date = "01 Jan 2025", 
  readTime = "5 min read",
}) => {
  const router = useRouter();
  return (
    <Card onClick={() => router.push(`/blogs?id=w3dasw33laaalasdf`)} className=" cursor-pointer overflow-hidden border-none shadow-none">
      <div className="relative h-[250px] rounded-t-[16px] w-full">
        <Image
          src={imageSrc}
          alt="Medical consultation"
          fill
          className="object-cover rounded-t-[16px]"
          priority
        />
      </div>
      <CardContent className="p-6 px-0 ">
        <div className="space-y-4">
          <div>
            <h6 className="text-sm font-medium  text-teal-600">NHS Services</h6>
            <h2 className="text-lg font-bold mt-2 ">{title}</h2>
            <p className="mt-2 font-roboto text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center">
            <Avatar className="h-10 w-10 bg-gray-100">
              <AvatarFallback>{author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-teal-600 font-ubantu">{author}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{date}</span>
                <span className="mx-2 font-roboto">•</span>
                <span className="font-roboto">{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



export default NHSCard;
