"use client";
import NHSCard from "@/components/blogCard";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import React, { useState } from "react";
import Blog1 from "@public/images/blogslide.png";
import Blog2 from "@public/images/blog-2.png";
import Blog3 from "@public/images/blog-3.png";

const BlogsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const blogs = [
    {
      category: "Vaccinations",
      title: "Everything You Need to Know About the Flu Vaccine",
      description:
        "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
      image: Blog1,
    },
    {
      category: "Vaccinations",
      title: "5 Reasons to Get a Flu Vaccine This Year",
      description:
        "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
      image: Blog1,
    },
    {
      category: "Vaccinations",
      title: "5 Reasons to Get a Flu Vaccine This Year",
      description:
        "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
      image: Blog1,
    },
  ];

  const serices = [
    {
      imageSrc: "/images/deatail-blog.png",
      category: "NHS Services",
      title: "Understanding NHS Services",
      description:
        "Learn how your local pharmacy can treat common conditions like flu and address medicines out of stock.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog2,
      category: "Vaccinations",
      title: "5 Reasons to Get a Flu Vaccine This Year",
      description:
        "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog3,
      category: "Health Tips",
      title: "Staying Healthy During Winter",
      description:
        "Winter brings more than cold weather—here's how to protect your health with extra tips and pharmacy services.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog1,
      category: "NHS Services",
      title: "Understanding NHS Services",
      description:
        "Learn how your local pharmacy can treat common conditions like flu and address medicines out of stock.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog2,
      category: "Vaccinations",
      title: "5 Reasons to Get a Flu Vaccine This Year",
      description:
        "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog3,
      category: "Health Tips",
      title: "Staying Healthy During Winter",
      description:
        "Winter brings more than cold weather—here's how to protect your health with extra tips and pharmacy services.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: "/images/deatail-blog.png",
      category: "NHS Services",
      title: "Understanding NHS Services",
      description:
        "Learn how your local pharmacy can treat common conditions like flu and address medicines out of stock.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog2,
      category: "Vaccinations",
      title: "5 Reasons to Get a Flu Vaccine This Year",
      description:
        "Protect yourself and your loved ones—find out why the flu vaccine is essential for everyone.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
    {
      imageSrc: Blog3,
      category: "Health Tips",
      title: "Staying Healthy During Winter",
      description:
        "Winter brings more than cold weather—here's how to protect your health with extra tips and pharmacy services.",
      author: "Admin",
      date: "01 Jan 2025",
      read_time: "5 min read",
    },
  ];

  return (
    <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          fromColor="#189BA3"
          toColor="#189BA3"
          image="/images/blogBg.png"
          textColor="text-white"
          height="h-[350px]"
          isDetail={false}
          title="Blogs"
        />

        <LayoutWrapper>
          <>
            <section>
              <div>
                <h2 className="text-3xl my-8 font-ubantu font-bold ">
                  Featured blog posts
                </h2>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-[45%]">
                  <NHSCard
                    imageSrc={
                      selectedBlog
                        ? selectedBlog.image
                        : "/images/deatail-blog.png"
                    }
                    title={
                      selectedBlog
                        ? selectedBlog.title
                        : "Understanding NHS Services"
                    }
                    description={
                      selectedBlog
                        ? selectedBlog.description
                        : "Learn how your local pharmacy can treat common conditions like UTIs and earaches without a GP visit."
                    }
                    author={selectedBlog ? selectedBlog.author : "John Doe"}
                    date={selectedBlog ? selectedBlog.date : "2021-01-01"}
                    readTime={
                      selectedBlog ? selectedBlog.read_time : "5 min read"
                    }
                  />
                </div>
                <div className="w-[45%]">
                  {blogs.map((blog, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-6 mb-8"
                      onClick={() => handleBlogClick(blog)}
                    >
                      <div className="w-full h-[180px] rounded-[10px] relative">
                        <Image
                          src={blog.image}
                          alt="blog"
                          fill
                          objectFit="cover"
                          className="rounded-[10px]"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h6 className="text-sm font-ubantu font-bold text-[#189BA3]">
                            {blog.category}
                          </h6>
                          <h2 className="text-lg font-bold mt-2 ">
                            {blog.title}
                          </h2>
                          <p className="mt-2 font-roboto text-xs text-[#1E222B]">
                            {blog.description}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full">
                            <AvatarFallback>{blog.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-[#189BA3] font-ubantu">
                              {blog.author}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{blog.date}</span>
                              <span className="mx-2 font-roboto">•</span>
                              <span className="font-roboto">
                                {blog.read_time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="py-10">
              <div >
                <h2 className="text-3xl my-8 font-ubantu font-bold ">
                  Latest blog posts
                </h2>
              </div>
              <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4">
                {serices.map((serice, index) => (
                  <NHSCard
                    key={index}
                    imageSrc={serice.imageSrc}
                    title={serice.title}
                    description={serice.description}
                    author={serice.author}
                    date={serice.date}
                    readTime={serice.read_time}
                    height="250px"
                  />
                ))}
              </div>
            </section>
          </>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default BlogsPage;
