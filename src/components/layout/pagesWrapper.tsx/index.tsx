import React from "react";
import Header from "../header";
import Footer from "../footer";
import FrequentlyAsked from "@/components/frequently-asked";
import Blogs from "@/components/Blogs";
import PartnerSection from "@/components/partnerSection";

const 
PagesWrapper = ({ children ,bgColor,btnColor,type,isSearchPage,isPartner}: { children: React.ReactNode ,bgColor:string ,btnColor:string ,type?:boolean ,isSearchPage?:boolean,isPartner?:boolean }) => {
  return (
    <div>
      <Header />
      {children}
      {type && <Blogs />}
      {isPartner && <PartnerSection bgColor={bgColor} />}
      {!isSearchPage && <FrequentlyAsked  btnColor={btnColor} />}
      <Footer />
    </div>
  );
};

export default PagesWrapper;
