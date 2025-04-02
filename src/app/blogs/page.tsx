import NHSCard from "@/components/blogCard";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import Blogimage from "../../../public/images/blog-1.png"

const BlogsPage = () => {
  return (
    <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          fromColor="#189BA3"
          toColor="#189BA3"
          textColor="text-white"
          height="h-[200px]"
          isDetail={true}
          title="Blogs"
        />

        <LayoutWrapper>
          <div className="flex gap-4">
              <div className="w-[60%]">
              <NHSCard 
               imageSrc={"/images/blog-1.png"}
               title="Understanding NHS Services"
               description="Learn how your local pharmacy can treat common conditions like UTIs and earaches without a GP visit."
               author="John Doe"
               date="2021-01-01"
               readTime="5 min read"
              />
              </div>
              <div className="w-[40%]">
                  <p>Related Blogs</p>
              </div>
            </div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default BlogsPage;
