import React from 'react'
import LayoutWrapper from './layout/wrapper'
import { CenterHeader } from './shared/centerHeader'
import NHSCard from './blogCard'
import blog1 from "../../public/images/blog-1.png"
import blog2 from "../../public/images/blog-2.png"
import blog3 from "../../public/images/blog-3.png"
import ButtonTheme from './shared/ButtonTheme'
const cardData = [
  {
    imageSrc: blog1,
    title: "Understanding NHS Services",
    description: "Learn how your local pharmacy can treat common conditions like UTIs and earaches without a GP visit.",
    author: "Admin",
    date: "01 Jan 2025",
    readTime: "5 min read",
  },
  {
    imageSrc: blog2,
    title: "5 Reasons to Get a Flu Vaccine This Year",
    description: "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
    author: "Admin",
    date: "02 Jan 2025",
    readTime: "4 min read",
  },
  {
    imageSrc: blog3,
    title: "Staying Healthy During Winter",
    description: "Winter brings more than cold weather—here's how to protect your health with simple steps and pharmacy services.",
    author: "Admin",
    date: "03 Jan 2025",
    readTime: "3 min read",
  },
];

const Blogs = () => {
  return (
    <section className='py-16'>
      <LayoutWrapper>
        <div className='mb-10'>
        <CenterHeader title="Blogs" description="Explore expert tips, health insights, and updates on pharmacy services to stay informed and empowered." />

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <NHSCard 
              key={index}
              imageSrc={card.imageSrc || ""}
              title={card.title}
              description={card.description}
              author={card.author}
              date={card.date}
              readTime={card.readTime}
            />
          ))}
        </div>
        <div className='flex justify-center mt-8 items-center'>
            <ButtonTheme
             bgColor="bg-[#52525B] hover:bg-[#52525B] px-12"
             textColor="text-white"
             paddingX='px-14'
             paddingY='py-3'
             >
                View All 
            </ButtonTheme>
        </div>
      </LayoutWrapper>
    </section>
  )
}

export default Blogs
