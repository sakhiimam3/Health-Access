import React from 'react'
import { Card, CardContent } from './ui/card';

interface HowItWorksCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const HowItWorksCard = ({ icon, title, text }: HowItWorksCardProps) => {
  return (
    <Card className="shadow-sm  min-h-[220px] max-h-[220px]    rounded-[16px] hover:cursor-pointer transition-shadow hover:bg-[#189BA3] group border-dashed  border-[#AFB7CA]">
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-5">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-white/20">
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold mb-2 group-hover:text-white">{title}</h3>
            <p className="text-sm text-[#52525B]  group-hover:text-white">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}   

export default HowItWorksCard
