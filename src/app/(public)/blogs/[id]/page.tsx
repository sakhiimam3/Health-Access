"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";

import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/icons";
import { useGetBlogById } from "@/lib/hooks";
import { useParams } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";

const BlogDetails = () => {
  const params = useParams();
  const slug = params?.id as string;
  const { data, isLoading, error } = useGetBlogById(slug);
  const blog = data?.data;

  if (isLoading) {
    return (
      <PagesWrapper type={false} bgColor="bg-[#189BA3]" btnColor="#189BA3">
        <div className="mt-56 px-4 pb-16">
          <div className="mb-12">
            <Skeleton className="w-full h-[240px] rounded-[10px] mb-12" />
            <div className="relative mb-12 rounded-[10px] w-full h-[600px]">
              <Skeleton className="w-full h-full rounded-[10px] absolute top-0 left-0" />
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col gap-3">
                    <Skeleton className="w-20 h-4 rounded" />
                    <Skeleton className="w-32 h-4 rounded" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              </div>
            </div>
            <div className="mb-12">
              <Skeleton className="w-2/3 h-8 mb-6 rounded" />
              <Skeleton className="w-full h-32 mb-4 rounded" />
              <Skeleton className="w-full h-32 mb-4 rounded" />
              <Skeleton className="w-1/2 h-8 rounded" />
            </div>
          </div>
        </div>
      </PagesWrapper>
    );
  }

  if (error || !blog) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Blog not found.</div>;
  }

  return (
    <PagesWrapper type={false} bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={blog.title}
          image={blog.image || "/images/pharmacy-detail.png"}
          height="h-[240px]"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
          isDetail={true}
        />
        <LayoutWrapper>
          <div className="my-14">
            {/* Header Image Section */}
            <div className="relative mb-8 rounded-[10px] w-full h-[600px]">
              <Image
                src={blog.image || "/images/blogsDetial.png"}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
              <div className="absolute inset-0 bg-black opacity-40 rounded-[10px]"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white"></div>

              {/* Admin and Social Icons Section */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 border border-gray-300 rounded-full">
                    <AvatarImage src="/images/notfoundAvatar.png" />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm text-[#189BA3] font-roboto">
                      {blog.author || "Admin"}
                    </span>
                    <span className="text-sm text-[#189BA3] font-roboto">
                      {new Date(blog.createdAt).toLocaleDateString()} . {blog.readingTime || 5} minutes read
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FacebookIcon />
                  <InstagramIcon />
                  <XIcon />
                  <LinkedInIcon />
                </div>
              </div>
            </div>

            {/* Blog Content Section */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
                {blog.title}
              </h2>
              
              {/* Improved content styling with proper spacing */}
              <div 
                className="blog-content prose prose-lg max-w-none
                  [&>p]:mb-6 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:text-base
                  [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-800 [&>h1]:mb-6 [&>h1]:mt-8
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mb-5 [&>h2]:mt-8
                  [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h3]:mt-6
                  [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-gray-800 [&>h4]:mb-3 [&>h4]:mt-5
                  [&>ul]:mb-6 [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ul>li]:text-gray-700 [&>ul>li]:list-disc
                  [&>ol]:mb-6 [&>ol]:pl-6 [&>ol>li]:mb-2 [&>ol>li]:text-gray-700 [&>ol>li]:list-decimal
                  [&>blockquote]:border-l-4 [&>blockquote]:border-[#189BA3] [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:mb-6 [&>blockquote]:bg-gray-50 [&>blockquote]:italic [&>blockquote]:text-gray-600
                  [&>strong]:font-semibold [&>strong]:text-gray-800
                  [&>em]:italic [&>em]:text-gray-600
                  [&>a]:text-[#189BA3] [&>a]:underline [&>a:hover]:text-[#147a80]
                  [&>img]:mb-6 [&>img]:rounded-lg [&>img]:shadow-md
                  [&>hr]:my-8 [&>hr]:border-gray-300
                  [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
                  [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:mb-6 [&>pre]:overflow-x-auto
                  font-roboto"
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
            </section>
          </div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default BlogDetails;
