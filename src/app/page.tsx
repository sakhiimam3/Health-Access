import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PartnerSection from "@/components/partnerSection";
import Blogs from "@/components/Blogs";
import PharmacySlider from "@/components/pharmacySlider";
import HomeServices from "@/components/home-services";
import HowItWorks from "@/components/howitworks";
import TrustedPartner from "@/components/TrustedPartner";
export default function Home() {
  return (
    <>
    <Header />
     <div className="border-b border-[#DCDCDC] border-width-2"></div>
    <HowItWorks />
    <HomeServices />
    <PharmacySlider />
    <TrustedPartner />
    <Blogs />
     <PartnerSection />
    <Footer />
    </>
   
  );
}
