import ButtonTheme from "@/components/shared/ButtonTheme";
import LayoutWrapper from "@/components/layout/wrapper";

interface ServiceCallToActionProps {
  serviceName: string | null;
}

const ServiceCallToAction = ({ serviceName }: ServiceCallToActionProps) => {
  const isTravelVaccines = serviceName === "Travel Vaccines";

  return (
    <section
      className="w-full flex items-center h-[300px] bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: isTravelVaccines
          ? "url('/images/partner-bg-1.png')"
          : "url('/images/bg-2.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <LayoutWrapper>
        <div className="grid md:grid-cols-2 w-full max-w-[1320px] relative z-10">
          <div>
            {isTravelVaccines ? (
              <h1 className="text-3xl leading-relaxed font-bold text-white md:text-4xl lg:text-5xl">
                Book Your Travel <br /> Vaccines Today
              </h1>
            ) : (
              <h1 className="text-3xl leading-relaxed font-bold text-white md:text-4xl lg:text-5xl">
                Book a Consultation for <br /> Hair Loss Treatment
              </h1>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {isTravelVaccines ? (
              <p className="text-white text-xl font-roboto">
                Stay protected wherever you go! Find a nearby pharmacy and{" "}
                <br /> book your travel vaccines now.
              </p>
            ) : (
              <p className="text-white text-xl font-roboto">
                Don&apos;t wait until it&apos;s too late – take action today!
                Find a Pharmacy Near You to explore personalized hair loss
                solutions.
              </p>
            )}

            <ButtonTheme
              bgColor="bg-[#189BA3]"
              className="my-6 w-[200px] text-white py-3 text-lg rounded-[24px] hover:bg-[#14a085] transition-colors duration-300"
              children="Book Now"
              paddingX="px-12"
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default ServiceCallToAction; 