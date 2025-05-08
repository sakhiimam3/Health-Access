import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PartnerSection from "@/components/partnerSection";
import Blogs from "@/components/Blogs";
import PharmacySlider from "@/components/pharmacySlider";
import HomeServices from "@/components/home-services";
import HowItWorks from "@/components/howitworks";
import TrustedPartner from "@/components/TrustedPartner";
import FrequentlyAsked from "@/components/frequently-asked";
export default function Home() {
  return (
    <>
    <Header />
    <HowItWorks />
    <HomeServices isNested={false} link="/services" />
    <PharmacySlider />
    <TrustedPartner />
    <FrequentlyAsked btnColor="#189BA3" />
     <PartnerSection bgColor="bg-[#189BA3]" />
     <Blogs />
    <Footer />
    </>
   
  );
}
