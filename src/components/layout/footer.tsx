import Link from "next/link";
import LayoutWrapper from "./wrapper";
import Image from "next/image";
import { NavItems } from "@/mockdata";

export default function Footer() {
  const servicesData = [
    {
      title: "Travel Vaccines",
      id:"12312313wd3413"
    },
    {
      title: "Weight Management",
      id:"12312313wd3443"

    },
    {
      title: "Vitamin B12 Injections",
      id:"12312313wg3443"

    },
    {
      title: "Yellow Fever Clinic",
      id:"12312313wd3493"

    },
    {
        title: "Anti-Sweat Injections",
    
        id:"12312313wd3493"

      },
      
  ];
  return (
    <footer className="bg-[#363636] text-[#BCBCBC] py-12">
      <LayoutWrapper>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-24">
          {/* Logo and Description */}
          <div className="md:col-span-4 ">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/footerlogo.png"
                  alt="HealthAccess Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-[#B8B8B8] pr-4">
              At Health Access, our mission is to make healthcare accessible,
              reliable, and hassle-free. We connect individuals with trusted NHS
              and private pharmacy services across the UK, ensuring you get the
              care you need when you need it.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:ml-8 ">
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-5 ">
              {NavItems.map(
                (item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="hover:text-white capitalize text-[#B8B8B8]  transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-5">
              {servicesData.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/services/?type=${item.title}`}
                    className="hover:text-white font-roboto-slab transition-colors duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <div className="space-y-3 ">
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.667 12.3038C22.667 6.74719 18.1899 2.24268 12.667 2.24268C7.14414 2.24268 2.66699 6.74719 2.66699 12.3038C2.66699 17.3255 6.32383 21.4879 11.1045 22.2427V15.2121H8.56543V12.3038H11.1045V10.0872C11.1045 7.56564 12.5975 6.1728 14.8816 6.1728C15.9758 6.1728 17.1201 6.36931 17.1201 6.36931V8.84529H15.8592C14.617 8.84529 14.2295 9.6209 14.2295 10.4166V12.3038H17.0029L16.5596 15.2121H14.2295V22.2427C19.0102 21.4879 22.667 17.3257 22.667 12.3038Z"
                    fill="#189BA3"
                  />
                </svg>
                <span className="font-roboto-slab">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.667 12.3038C22.667 6.74719 18.1899 2.24268 12.667 2.24268C7.14414 2.24268 2.66699 6.74719 2.66699 12.3038C2.66699 17.3255 6.32383 21.4879 11.1045 22.2427V15.2121H8.56543V12.3038H11.1045V10.0872C11.1045 7.56564 12.5975 6.1728 14.8816 6.1728C15.9758 6.1728 17.1201 6.36931 17.1201 6.36931V8.84529H15.8592C14.617 8.84529 14.2295 9.6209 14.2295 10.4166V12.3038H17.0029L16.5596 15.2121H14.2295V22.2427C19.0102 21.4879 22.667 17.3257 22.667 12.3038Z"
                    fill="#189BA3"
                  />
                </svg>

                <span className="font-roboto-slab">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8431 0.242676H17.6032L11.5731 7.02008L18.667 16.2427H13.1126L8.76209 10.6493L3.78422 16.2427H1.02243L7.47216 8.99348L0.666992 0.242676H6.36244L10.2949 5.3553L14.8431 0.242676ZM13.8743 14.6181H15.4038L5.5314 1.78196H3.89019L13.8743 14.6181Z"
                    fill="#189BA3"
                  />
                </svg>
                <span className="font-roboto-slab">X</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <svg
                  width="19"
                  height="17"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8431 0.242676H17.6032L11.5731 7.02008L18.667 16.2427H13.1126L8.76209 10.6493L3.78422 16.2427H1.02243L7.47216 8.99348L0.666992 0.242676H6.36244L10.2949 5.3553L14.8431 0.242676ZM13.8743 14.6181H15.4038L5.5314 1.78196H3.89019L13.8743 14.6181Z"
                    fill="#189BA3"
                  />
                </svg>
                <span className="font-roboto-slab">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#189BA3]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white">
              © 2024 Health Access. All rights reserved.
            </p>
            <div className="flex gap-3">
            <div className="flex gap-2 mt-4 md:mt-0 text-sm">
              <Link
                href="/privacy-policy"
                className="hover:text-white underline text-[#B8B8B8] transition-colors duration-200 !important"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <Link
                href="/privacy-policy"
                className="hover:text-white underline text-[#B8B8B8] transition-colors duration-200 !important"
              >
                Terms of Services
              </Link>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <Link
                href="/privacy-policy"
                className="hover:text-white underline text-[#B8B8B8] transition-colors duration-200 !important"
              >
                Cookies Settings
              </Link>
            </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </footer>
  );
}
