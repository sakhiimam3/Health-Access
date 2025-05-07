import React from "react";
import Header from "../header";
import Footer from "../footer";
import FrequentlyAsked from "@/components/frequently-asked";
import Blogs from "@/components/Blogs";
import PartnerSection from "@/components/partnerSection";

const PagesWrapper = ({
  children,
  bgColor,
  btnColor,
  type,
  isSearchPage,
  isPartner,
}: {
  children: React.ReactNode;
  bgColor: string;
  btnColor: string;
  type?: boolean;
  isSearchPage?: boolean;
  isPartner?: boolean;
}) => {
  return (
    <div>
      <Header />
      {children}
      {!isSearchPage && <FrequentlyAsked btnColor={btnColor} />}
      {isPartner && <PartnerSection bgColor={bgColor} />}
      {type && <Blogs />}
      <Footer />
    </div>
  );
};

export default PagesWrapper;
