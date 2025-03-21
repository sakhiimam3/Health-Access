import React from "react";
import Header from "../header";
import Footer from "../footer";
import FrequentlyAsked from "@/components/frequently-asked";
import Blogs from "@/components/Blogs";
import PartnerSection from "@/components/partnerSection";

const PagesWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Blogs />
      <PartnerSection />
      <FrequentlyAsked />
      <Footer />
    </div>
  );
};

export default PagesWrapper;
