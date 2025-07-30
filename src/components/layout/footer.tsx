"use client";

import Link from "next/link";
import LayoutWrapper from "./wrapper";
import Image from "next/image";
import { NavItems } from "@/mockdata";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "../icons/icons";
import { useGetHowItWorks } from "../useGetHowItWorks";
import { useHomeServices } from "@/lib/hooks";
import { ApiErrorNotice } from "../ui/error-message";

export default function Footer() {
  // Fetch menuTypes and services using hooks
  const { menuTypes, loading: menuTypesLoading } = useGetHowItWorks();
  const { data: homeServicesData, isLoading: servicesLoading, error: servicesError } = useHomeServices();
  
  const apiErrors: string[] = [];

  // Handle fallback data and collect errors
  if (servicesError) {
    console.error('Home Services data fetch failed:', servicesError);
    apiErrors.push(`Home Services: ${servicesError}`);
  }

  const servicesData = homeServicesData?.data?.services || [];
  
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
              {/* 1st static link */}
              <li key={NavItems[0].label}>
                <Link
                  href={NavItems[0].href}
                  className="hover:text-white capitalize text-[#B8B8B8]  transition-colors duration-200"
                >
                  {NavItems[0].label}
                </Link>
              </li>
              {/* 2nd and 3rd dynamic or skeleton */}
              {menuTypesLoading ? (
                <>
                  <li><div className="h-5 w-24 bg-gray-600 animate-pulse rounded"></div></li>
                  <li><div className="h-5 w-32 bg-gray-600 animate-pulse rounded"></div></li>
                </>
              ) : (
                menuTypes?.slice(0, 2)?.map((type) => (
                  <li key={type.id}>
                    <Link
                      href={`/${type.name.replace(/\s+/g, "-")}?typeid=${type.id}&name=${encodeURIComponent(type.name)}`}
                      className="hover:text-white capitalize text-[#B8B8B8]  transition-colors duration-200"
                    >
                      {type.name}
                    </Link>
                  </li>
                ))
              )}
              {/* Static How it works and About us */}
              <li key={NavItems[3].label}>
                <Link
                  href={NavItems[3].href}
                  className="hover:text-white capitalize text-[#B8B8B8]  transition-colors duration-200"
                >
                  {NavItems[3].label}
                </Link>
              </li>
              <li key={NavItems[4].label}>
                <Link
                  href={NavItems[4].href}
                  className="hover:text-white capitalize text-[#B8B8B8]  transition-colors duration-200"
                >
                  {NavItems[4].label}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-5">
              {servicesLoading ? (
                <>
                  <li><div className="h-5 w-32 bg-gray-600 animate-pulse rounded"></div></li>
                  <li><div className="h-5 w-28 bg-gray-600 animate-pulse rounded"></div></li>
                  <li><div className="h-5 w-36 bg-gray-600 animate-pulse rounded"></div></li>
                </>
              ) : (
                servicesData?.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/services/${item.name.replace(/\s+/g, "-")}`}
                      className="hover:text-white font-roboto-slab transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <div className="space-y-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <FacebookIcon width={25} height={24} />
                <span className="font-roboto-slab">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <InstagramIcon width={25} height={24} />
                <span className="font-roboto-slab">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <XIcon width={19} height={17} />
                <span className="font-roboto-slab">X</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <LinkedInIcon width={19} height={17} />
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
        {(process.env.NODE_ENV === 'development' || apiErrors.length > 0) && (
        <ApiErrorNotice errors={apiErrors} />
      )}
      </LayoutWrapper>
    </footer>
  );
}

