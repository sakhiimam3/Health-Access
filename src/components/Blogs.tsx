"use client";
import React from "react";
import LayoutWrapper from "./layout/wrapper";
import { CenterHeader } from "./shared/centerHeader";
import NHSCard from "./blogCard";
import blog1 from "../../public/images/blog-1.png";
import blog2 from "../../public/images/blog-2.png";
import blog3 from "../../public/images/blog-3.png";
import ButtonTheme from "./shared/ButtonTheme";
import { useRouter } from "next/navigation";
import { useGetAllBlogs } from "@/lib/hooks";
import isValidUrl from "@/lib/isValidUrl";
import NotFoundImage from "@public/images/notfound.jpg";

const Blogs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllBlogs();

  // Map API data to NHSCard props if available, else fallback to cardData
  const blogs = data?.data?.length
    ? data.data.map((blog: any) => ({
        id: blog?.slug,
        imageSrc: isValidUrl(blog.image) ? blog.image : NotFoundImage,
        title: blog.title,
        description: blog.excerpt || "",
        author: blog.author || "",
        date: blog.createdAt
          ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "",
        readTime: blog.readingTime ? `${blog.readingTime} min read` : "",
      }))
    : [];

  return (
    <section className="py-16">
      <LayoutWrapper>
        <div className="mb-10">
          <CenterHeader
            title="Blogs"
            description="Explore expert tips, health insights, and updates on pharmacy services to stay informed and empowered."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.slice(0, 3).map((card, index) => (
            
              <NHSCard
                id={card.id}
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
        <div className="flex justify-center mt-8 items-center">
          <ButtonTheme
            bgColor="bg-[#52525B] rounded-[24px] hover:bg-[#52525B] px-12"
            textColor="text-white"
            paddingX="px-14"
            paddingY="py-3"
            onClick={() => router.push("/blogs")}
          >
            View All
          </ButtonTheme>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default Blogs;
