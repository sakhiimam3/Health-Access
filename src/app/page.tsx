import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PartnerSection from "@/components/partnerSection";
import Blogs from "@/components/Blogs";
import PharmacySlider from "@/components/pharmacySlider";
import HomeServices from "@/components/home-services";
import HowItWorks from "@/components/howitworks";
import TrustedPartner from "@/components/TrustedPartner";
import FrequentlyAsked from "@/components/frequently-asked";
import { getHowItWorksData, getHomeServicesData } from "@/lib/api/cms-utils";

export default async function Home() {
  const howItWorksRes = await getHowItWorksData();
  const homeServicesRes = await getHomeServicesData();

  const menuTypes = howItWorksRes.data?.menuTypes || [];
  const servicesData = homeServicesRes.data?.services || [];

  return (
    <>
      <Header menuTypes={menuTypes} />
      <HowItWorks data={howItWorksRes.data?.howItWorks || []} />
      <HomeServices servicesData={servicesData} isNested={false} link="/services" />
      <PharmacySlider />
      <TrustedPartner />
      <FrequentlyAsked btnColor="#189BA3" />
      <PartnerSection bgColor="bg-[#189BA3]" />
      <Blogs />
      <Footer menuTypes={menuTypes} servicesData={servicesData} />
    </>
  );
}
