import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LayoutWrapper from "./layout/wrapper"
import ButtonTheme from "./shared/ButtonTheme"

export default function PartnerSection() {
  return (
    <section className="w-full bg-[#189BA3] px-4  md:py-12">
      <LayoutWrapper>
        <div className="grid md:grid-cols-2 ">
          {/* Left Column - Heading */}
          <div>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Partner with Health <br /> Access Today!
            </h1>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col gap-6">
            <p className="text-lg text-white/90">
              Join our growing network of trusted pharmacies and expand your reach. Gain access to a broader customer
              base, streamline bookings, and showcase your services to a nationwide audience.
            </p>

            {/* Email Input Group */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-1">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 flex-1 rounded-[25px] border-[#52525B] text-white outline-none bg-transparent text-base placeholder:text-white"
              />
              <ButtonTheme bgColor="bg-[#333333]"
              textColor="text-white"
              >
                Become a Partner
              </ButtonTheme>

            </div>

            {/* Stats Text */}
            <p className="text-sm text-white/80">Join 750+ pharmacies already benefiting from Health Access</p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  )
}

