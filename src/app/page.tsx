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
import { ApiErrorNotice } from "@/components/ui/error-message";

export default async function Home() {
  // Fetch data with error handling
  const howItWorksRes = await getHowItWorksData();
  const homeServicesRes = await getHomeServicesData();
  console.log(howItWorksRes,"howItWorksRes")

  // Handle fallback data and collect errors
  const menuTypes = howItWorksRes.success ? howItWorksRes.data?.data?.menuTypes || [] : [];
  const servicesData = homeServicesRes.success ? homeServicesRes.data?.data?.services || [] : [];
  const howItWorksData = howItWorksRes.success ? howItWorksRes.data?.data?.howItWorks || [] : [];

  // Collect all errors for display
  const apiErrors: string[] = [];
  
  if (!howItWorksRes.success) {
    console.error('How It Works data fetch failed:', howItWorksRes.error);
    apiErrors.push(`How It Works: ${howItWorksRes.error}`);
  }
  
  if (!homeServicesRes.success) {
    console.error('Home Services data fetch failed:', homeServicesRes.error);
    apiErrors.push(`Home Services: ${homeServicesRes.error}`);
  }

  return (
    <>
      <Header menuTypes={menuTypes} />
      <HowItWorks data={howItWorksData} />
      <HomeServices servicesData={servicesData} isNested={false} link="/services" />
      <PharmacySlider />
      <TrustedPartner />
      <FrequentlyAsked btnColor="#189BA3" />
      <PartnerSection bgColor="bg-[#189BA3]" />
      <Blogs />
      <Footer menuTypes={menuTypes} servicesData={servicesData} />
      
      {/* Show API errors only in development or when there are critical failures */}
      {(process.env.NODE_ENV === 'development' || apiErrors.length > 0) && (
        <ApiErrorNotice errors={apiErrors} />
      )}
    </>
  );
}
