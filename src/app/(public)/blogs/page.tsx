"use client";
import NHSCard from "@/components/blogCard";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Blog1 from "@public/images/blogslide.png";
import Blog2 from "@public/images/blog-2.png";
import Blog3 from "@public/images/blog-3.png";
import { useGetFeaturedBlogs, useGetPopularBlogs } from "@/lib/hooks";
import { Loader2 } from "lucide-react";
import isValidUrl from "@/lib/isValidUrl";
import Skeleton from "@/components/ui/Skeleton";

const BlogsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch featured blogs from API
  const {
    data: featuredData,
    isLoading: featuredLoading,
    error: featuredError,
  } = useGetFeaturedBlogs();
  const featuredBlogs = featuredData?.data || [];

  // Fetch popular blogs from API
  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useGetPopularBlogs();
  const popularBlogs = popularData?.data || [];

  useEffect(() => {
    if (featuredBlogs.length > 0 && !selectedBlog) {
      setSelectedBlog(featuredBlogs[0]);
    }
  }, [featuredBlogs, selectedBlog]);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

 

  return (
    <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          fromColor="#189BA3"
          toColor="#189BA3"
          image="/images/blogBg.png"
          textColor="text-white"
          height="h-[300px]"
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
              {featuredLoading ? (
                <div className="flex items-start gap-4">
                  <div className="w-[45%]">
                    <div className="p-4 bg-white rounded-lg shadow h-[320px] flex flex-col space-y-4">
                      <Skeleton className="w-full h-[180px] rounded-[10px]" />
                      <Skeleton className="w-1/2 h-6" />
                      <Skeleton className="w-3/4 h-4" />
                      <Skeleton className="w-1/3 h-4" />
                      <div className="flex items-center space-x-2 mt-auto">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-20 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col gap-8">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start gap-6 mb-8">
                        <div className="w-full h-[180px] rounded-[10px] relative">
                          <Skeleton className="w-full h-full rounded-[10px]" />
                        </div>
                        <div className="space-y-4 w-full">
                          <Skeleton className="w-1/3 h-4" />
                          <Skeleton className="w-1/2 h-6" />
                          <Skeleton className="w-3/4 h-4" />
                          <div className="flex items-center mt-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="ml-3">
                              <Skeleton className="w-20 h-4" />
                              <div className="flex items-center mt-2">
                                <Skeleton className="w-16 h-4 mr-2" />
                                <Skeleton className="w-8 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : featuredError ? (
                <div className="text-red-500">
                  Failed to load featured blogs.
                </div>
              ) : featuredBlogs.length === 0 ? (
                <div>No featured blogs found.</div>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="w-[45%]">
                    <NHSCard
                      id={selectedBlog?.slug}
                      imageSrc={
                        selectedBlog
                          ? selectedBlog.image
                          : featuredBlogs[0]?.image ||
                            "/images/deatail-blog.png"
                      }
                      title={
                        selectedBlog
                          ? selectedBlog.title
                          : featuredBlogs[0]?.title ||
                            "Understanding NHS Services"
                      }
                      description={
                        selectedBlog
                          ? selectedBlog.excerpt || selectedBlog.description
                          : featuredBlogs[0]?.excerpt ||
                            "Learn how your local pharmacy can treat common conditions like UTIs and earaches without a GP visit."
                      }
                      author={
                        selectedBlog
                          ? selectedBlog.author
                          : featuredBlogs[0]?.author || "John Doe"
                      }
                      date={
                        selectedBlog
                          ? selectedBlog.createdAt?.slice(0, 10)
                          : featuredBlogs[0]?.createdAt?.slice(0, 10) ||
                            "2021-01-01"
                      }
                      readTime={
                        selectedBlog
                          ? `${selectedBlog.readingTime || 5} min read`
                          : `${featuredBlogs[0]?.readingTime || 5} min read`
                      }
                    />
                  </div>
                  <div className="w-[45%]">
                    {featuredBlogs.map((blog, index) => (
                      <div
                        key={blog.id || index}
                        className="flex items-start gap-6 mb-8 cursor-pointer"
                        onClick={() => handleBlogClick(blog)}
                      >
                        <div className="w-full h-[180px] rounded-[10px] relative">
                          <Image
                            src={
                              isValidUrl(blog.image)
                                ? blog.image
                                : "/images/notfound.jpg"
                            }
                            alt="blog"
                            fill
                            objectFit="cover"
                            className="rounded-[10px]"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "/images/notfound.jpg";
                            }}
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h6 className="text-sm font-ubantu font-bold text-[#189BA3]">
                              {blog.tags || "Blog"}
                            </h6>
                            <h2 className="text-lg font-bold mt-2 ">
                              {blog.title}
                            </h2>
                            <p className="mt-2 font-roboto text-xs text-[#1E222B]">
                              {blog.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full">
                              <AvatarFallback>
                                {blog.author?.[0] || "A"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-[#189BA3] font-ubantu">
                                {blog.author}
                              </p>
                              <div className="flex items-center text-sm text-gray-500">
                                <span>{blog.createdAt?.slice(0, 10)}</span>
                                <span className="mx-2 font-roboto">•</span>
                                <span className="font-roboto">
                                  {blog.readingTime
                                    ? `${blog.readingTime} min read`
                                    : "5 min read"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
            {/* Popular blog posts section */}
            <section>
              <div>
                <h2 className="text-3xl my-8 font-ubantu font-bold ">
                  Latest blog posts
                </h2>
              </div>
              {popularLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow h-[320px]"
                    >
                      <Skeleton className="w-full h-[180px] rounded-[10px]" />
                      <Skeleton className="w-1/2 h-6" />
                      <Skeleton className="w-3/4 h-4" />
                      <div className="flex items-center space-x-2 mt-auto">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-20 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : popularError ? (
                <div className="text-red-500">
                  Failed to load popular blogs.
                </div>
              ) : popularBlogs.length === 0 ? (
                <div>No popular blogs found.</div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularBlogs.map((blog, index) => (
                    <NHSCard
                      id={blog?.slug}
                      key={blog.id || index}
                      imageSrc={
                        isValidUrl(blog.image)
                          ? blog.image
                          : "/images/notfound.jpg"
                      }
                      title={blog.title}
                      description={blog.excerpt || blog.description}
                      author={blog.author}
                      date={blog.createdAt?.slice(0, 10)}
                      readTime={
                        blog.readingTime
                          ? `${blog.readingTime} min read`
                          : "5 min read"
                      }
                      height="250px"
                    />
                  ))}
                </div>
              )}
            </section>
            {/* <section className="py-10">
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
            </section> */}
          </>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default BlogsPage;
