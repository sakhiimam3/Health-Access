import React from "react";
import Header from "../header";
import Footer from "../footer";
import FrequentlyAsked from "@/components/frequently-asked";
import Blogs from "@/components/Blogs";
import PartnerSection from "@/components/partnerSection";

const PagesWrapper = ({ children ,bgColor,btnColor}: { children: React.ReactNode ,bgColor:string ,btnColor:string }) => {
  return (
    <div>
      <Header />
      {children}
      <Blogs />
      <PartnerSection bgColor={bgColor} />
      <FrequentlyAsked  btnColor={btnColor} />
      <Footer />
    </div>
  );
};

export default PagesWrapper;
