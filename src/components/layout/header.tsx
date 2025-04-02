"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Search, Calendar } from "lucide-react";
import LayoutWrapper from "./wrapper";
import { NavItems } from "@/mockdata";
import ButtonTheme from "../shared/ButtonTheme";


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50  ">
      <LayoutWrapper>
        <nav className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="HealthAccess Logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          {!isScrolled && (
            <div
              className={`hidden md:flex items-center space-x-12 transition-opacity duration-300 }`}
            >
              {NavItems.map((item,index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="capitalize text-sm font-[400] font-ubuntu relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          )}

          {isScrolled && (
            <div className="flex justify-around items-center bg-white p-2 rounded-[25px] shadow-lg w-[30%] mx-auto">
              <div
                className="flex space-x-4"
                onClick={() => setIsScrolled(false)}
              >
                <div className="text-black">
                  <span className="font-semibold text-xs">Location</span>
                  <div className="text-gray-400 text-xs">Search Location</div>
                </div>
                <div className="text-black">
                  <span className="font-semibold text-xs">Type Vaccine</span>
                  <div className="text-gray-400 text-xs">Add dates</div>
                </div>
                <div className="text-black">
                  <span className="font-semibold text-xs">No of people</span>
                  <div className="text-gray-400 text-xs">Add No of people</div>
                </div>
              </div>
              <Button
                size="icon"
                className="bg-teal-500 hover:bg-teal-600 rounded-full h-8 w-8 ml-2"
              >
                <span>
                  <Search className="h-5 w-5 text-white" />
                </span>
              </Button>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Link href="/login">
            <span className="hidden underline text-sm font-ubuntu font-[400] md:inline">
             Sign In
            </span>
            </Link>
            
             <ButtonTheme  bgColor="bg-[#189BA3]" textColor="text-white" >
                Become a Partner
              </ButtonTheme> 
          </div>
        </nav>
        <div
          className={`w-full bg-white transition-all z-50 duration-300 ${
            isScrolled ? "py-2 opacity-0 h-0" : "py-6 opacity-100 h-auto"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center py-3 px-5 gap-2 bg-white rounded-full p-2 shadow-[0_0_10px_0_rgba(0,0,0,0.02)] border border-gray-100">
              <div className="flex-1 flex flex-col items-start pl-4">
                <label className="font-bold mb-1">Location</label>
                <div className="flex items-center">
                  <svg
                    width="18"
                    height="22"
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.4604 8.63C17.32 7.16892 16.8036 5.76909 15.9616 4.56682C15.1195 3.36456 13.9805 2.40083 12.6554 1.7695C11.3303 1.13816 9.86425 0.860724 8.40008 0.964207C6.93592 1.06769 5.5235 1.54856 4.30037 2.36C3.24957 3.06265 2.36742 3.9893 1.71731 5.07339C1.0672 6.15749 0.665264 7.37211 0.540369 8.63C0.417852 9.87966 0.575043 11.1409 1.00054 12.3223C1.42604 13.5036 2.10917 14.5755 3.00037 15.46L8.30037 20.77C8.39333 20.8637 8.50393 20.9381 8.62579 20.9889C8.74765 21.0397 8.87836 21.0658 9.01037 21.0658C9.14238 21.0658 9.27309 21.0397 9.39495 20.9889C9.51681 20.9381 9.62741 20.8637 9.72037 20.77L15.0004 15.46C15.8916 14.5755 16.5747 13.5036 17.0002 12.3223C17.4257 11.1409 17.5829 9.87966 17.4604 8.63ZM13.6004 14.05L9.00037 18.65L4.40037 14.05C3.72246 13.3721 3.20317 12.5523 2.87984 11.6498C2.5565 10.7472 2.43715 9.7842 2.53037 8.83C2.62419 7.86111 2.93213 6.92516 3.43194 6.08985C3.93175 5.25453 4.61093 4.54071 5.42037 4C6.48131 3.29524 7.72668 2.9193 9.00037 2.9193C10.2741 2.9193 11.5194 3.29524 12.5804 4C13.3874 4.53862 14.065 5.24928 14.5647 6.08094C15.0644 6.9126 15.3737 7.84461 15.4704 8.81C15.5666 9.76743 15.4488 10.7343 15.1254 11.6406C14.8019 12.5468 14.281 13.3698 13.6004 14.05ZM9.00037 5C8.11035 5 7.24032 5.26392 6.5003 5.75839C5.76028 6.25286 5.18351 6.95566 4.84291 7.77793C4.50232 8.6002 4.4132 9.505 4.58684 10.3779C4.76047 11.2508 5.18905 12.0526 5.81839 12.682C6.44773 13.3113 7.24955 13.7399 8.12246 13.9135C8.99538 14.0872 9.90018 13.9981 10.7224 13.6575C11.5447 13.3169 12.2475 12.7401 12.742 12.0001C13.2364 11.26 13.5004 10.39 13.5004 9.5C13.4977 8.30734 13.0228 7.16428 12.1794 6.32094C11.3361 5.4776 10.193 5.00265 9.00037 5ZM9.00037 12C8.50592 12 8.02257 11.8534 7.61144 11.5787C7.20032 11.304 6.87989 10.9135 6.69067 10.4567C6.50145 9.9999 6.45194 9.49723 6.54841 9.01228C6.64487 8.52733 6.88297 8.08187 7.2326 7.73224C7.58223 7.38261 8.02769 7.1445 8.51264 7.04804C8.9976 6.95158 9.50026 7.00109 9.95708 7.1903C10.4139 7.37952 10.8043 7.69996 11.079 8.11108C11.3537 8.5222 11.5004 9.00555 11.5004 9.5C11.5004 10.163 11.237 10.7989 10.7681 11.2678C10.2993 11.7366 9.66341 12 9.00037 12Z"
                      fill="#189BA3"
                    />
                  </svg>
                  <Input
                    type="text"
                    placeholder="Choose Location"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-2 h-10 transition-none"
                  />
                </div>
              </div>

              <div className="flex-1  flex flex-col items-start border-l border-gray-200 pl-4">
                <label className="font-bold mb-1">Service</label>
                <div className="flex items-center">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.8996 4.93L22.3096 3.51L19.4896 0.690002L18.0696 2.1L18.7796 2.81L16.6596 4.93L15.2396 3.51L13.8296 2.1L12.4096 3.51L13.1196 4.22L6.04961 11.29C5.95588 11.383 5.88149 11.4936 5.83072 11.6154C5.77995 11.7373 5.75381 11.868 5.75381 12C5.75381 12.132 5.77995 12.2627 5.83072 12.3846C5.88149 12.5064 5.95588 12.617 6.04961 12.71L5.33961 13.41C4.90443 13.8502 4.61604 14.4141 4.514 15.0246C4.41195 15.6351 4.50123 16.2622 4.76961 16.82L0.0996094 21.49L1.50961 22.9L6.17961 18.23C6.57768 18.4267 7.0156 18.5293 7.45961 18.53C7.85443 18.5323 8.24582 18.4566 8.61133 18.3073C8.97684 18.158 9.30929 17.938 9.58961 17.66L10.2896 16.95C10.3826 17.0437 10.4932 17.1181 10.615 17.1689C10.7369 17.2197 10.8676 17.2458 10.9996 17.2458C11.1316 17.2458 11.2623 17.2197 11.3842 17.1689C11.506 17.1181 11.6166 17.0437 11.7096 16.95L18.7796 9.88L19.4896 10.59L20.8996 9.17L19.4896 7.76L18.0696 6.34L20.1896 4.22L20.8996 4.93ZM8.16961 16.24C8.07996 16.3447 7.96964 16.4297 7.84558 16.4897C7.72151 16.5498 7.58638 16.5835 7.44866 16.5888C7.31094 16.5941 7.17361 16.5709 7.04529 16.5206C6.91696 16.4704 6.80041 16.3941 6.70296 16.2967C6.6055 16.1992 6.52925 16.0827 6.47897 15.9543C6.4287 15.826 6.40549 15.6887 6.41081 15.5509C6.41613 15.4132 6.44986 15.2781 6.50988 15.154C6.56991 15.03 6.65493 14.9197 6.75961 14.83L7.45961 14.12L8.87961 15.54L8.16961 16.24ZM10.9996 14.83L8.16961 12L9.16961 11L14.1196 11.71L10.9996 14.83ZM15.8596 10L10.9096 9.29L14.5396 5.67L17.3596 8.49L15.8596 10Z"
                      fill="#189BA3"
                    />
                  </svg>
                  <div className="relative">
                    <select defaultValue="service1" className="border-0 focus:ring-0 p-2 h-full flex items-center transition-none">
                      <option value="service1">Service 1</option>
                      <option value="service2">Service 2</option>
                      <option value="service3">Service 3</option>
                      <option value="service4">Service 4</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-start border-l border-gray-200 pl-4">
                <label className="font-bold mb-1">No of People</label>
                <div className="flex items-center">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_303_25194)">
                      <path
                        d="M15.9102 16.9781C16.6023 16.3005 17.0768 15.4321 17.2733 14.4837C17.4697 13.5352 17.3792 12.5498 17.0133 11.653C16.6473 10.7562 16.0226 9.9888 15.2187 9.44857C14.4148 8.90835 13.4682 8.61984 12.4996 8.61984C11.531 8.61984 10.5844 8.90835 9.78052 9.44857C8.97661 9.9888 8.35184 10.7562 7.98591 11.653C7.61998 12.5498 7.52947 13.5352 7.72593 14.4837C7.92239 15.4321 8.39691 16.3005 9.08897 16.9781C7.91723 17.601 6.94304 18.5391 6.27647 19.6866C6.13372 19.9445 6.09793 20.2482 6.1768 20.5323C6.25567 20.8163 6.44289 21.0581 6.6982 21.2055C6.9535 21.3529 7.25648 21.3943 7.54194 21.3206C7.8274 21.2469 8.07253 21.0641 8.22459 20.8116C8.6642 20.0688 9.28969 19.4534 10.0395 19.0259C10.7892 18.5984 11.6374 18.3736 12.5005 18.3736C13.3636 18.3736 14.2118 18.5984 14.9616 19.0259C15.7114 19.4534 16.3369 20.0688 16.7765 20.8116C16.8488 20.9423 16.9465 21.0574 17.0639 21.15C17.1812 21.2426 17.3158 21.3108 17.4598 21.3508C17.6038 21.3908 17.7544 21.4017 17.9027 21.3828C18.0509 21.364 18.194 21.3158 18.3234 21.2411C18.4528 21.1663 18.5661 21.0665 18.6565 20.9475C18.7469 20.8285 18.8127 20.6927 18.8501 20.548C18.8874 20.4033 18.8956 20.2525 18.874 20.1046C18.8525 19.9567 18.8017 19.8146 18.7246 19.6866C18.0575 18.5389 17.0826 17.6007 15.9102 16.9781ZM9.87459 13.5C9.87459 12.9808 10.0285 12.4733 10.317 12.0416C10.6054 11.6099 11.0154 11.2735 11.495 11.0748C11.9747 10.8761 12.5025 10.8241 13.0117 10.9254C13.5209 11.0267 13.9886 11.2767 14.3557 11.6438C14.7229 12.011 14.9729 12.4787 15.0742 12.9879C15.1754 13.4971 15.1235 14.0249 14.9248 14.5045C14.7261 14.9842 14.3896 15.3942 13.958 15.6826C13.5263 15.971 13.0188 16.125 12.4996 16.125C11.8034 16.125 11.1357 15.8484 10.6434 15.3562C10.1512 14.8639 9.87459 14.1962 9.87459 13.5ZM23.6755 14.3991C23.5574 14.4879 23.4229 14.5526 23.2797 14.5894C23.1365 14.6262 22.9875 14.6345 22.8411 14.6136C22.6948 14.5928 22.5539 14.5434 22.4267 14.4681C22.2995 14.3929 22.1883 14.2932 22.0996 14.175C21.3187 13.1353 20.2387 12.3384 19.3499 12.1462C19.1136 12.0951 18.9 11.9692 18.7409 11.7872C18.5817 11.6052 18.4854 11.3768 18.4663 11.1358C18.4471 10.8947 18.5061 10.654 18.6346 10.4491C18.763 10.2442 18.954 10.0862 19.1793 9.99843C19.4598 9.88894 19.7098 9.71351 19.9081 9.48698C20.1065 9.26045 20.2474 8.98948 20.3189 8.69699C20.3903 8.40449 20.3903 8.09909 20.3188 7.8066C20.2474 7.51411 20.1065 7.24313 19.9081 7.0166C19.7098 6.79007 19.4598 6.61464 19.1793 6.50515C18.8988 6.39566 18.5961 6.35533 18.2967 6.38757C17.9973 6.41982 17.7101 6.52368 17.4594 6.69039C17.2086 6.85709 17.0017 7.08173 16.8562 7.34531C16.7871 7.47888 16.692 7.59725 16.5765 7.69344C16.4609 7.78963 16.3272 7.86168 16.1833 7.90533C16.0395 7.94898 15.8883 7.96334 15.7388 7.94757C15.5892 7.93181 15.4444 7.88623 15.3128 7.81353C15.1812 7.74083 15.0655 7.64249 14.9725 7.52431C14.8796 7.40614 14.8112 7.27053 14.7716 7.1255C14.7319 6.98047 14.7217 6.82896 14.7416 6.67992C14.7615 6.53089 14.8111 6.38736 14.8874 6.25781C15.1658 5.76557 15.5424 5.33583 15.9939 4.99528C16.4453 4.65473 16.962 4.41064 17.5118 4.27818C18.0615 4.14572 18.6327 4.12771 19.1897 4.22528C19.7467 4.32285 20.2777 4.5339 20.7497 4.84534C21.2217 5.15677 21.6247 5.56194 21.9335 6.03566C22.2423 6.50938 22.4505 7.04155 22.545 7.59909C22.6395 8.15664 22.6183 8.72767 22.4828 9.2767C22.3474 9.82573 22.1004 10.341 21.7574 10.7906C22.5829 11.3405 23.3075 12.0283 23.8996 12.8241C24.0787 13.0626 24.1557 13.3626 24.1137 13.658C24.0717 13.9533 23.9141 14.2199 23.6755 14.3991ZM5.64928 12.1491C4.76053 12.3412 3.68053 13.1381 2.89959 14.1787C2.71995 14.4173 2.45289 14.5748 2.15717 14.6164C1.86145 14.6581 1.56129 14.5806 1.32272 14.4009C1.08415 14.2213 0.926711 13.9542 0.885042 13.6585C0.843374 13.3628 0.920887 13.0626 1.10053 12.8241C1.69288 12.0286 2.41748 11.3408 3.24272 10.7906C2.89969 10.341 2.65276 9.82573 2.51728 9.2767C2.38179 8.72767 2.36065 8.15664 2.45515 7.59909C2.54965 7.04155 2.75778 6.50938 3.06661 6.03566C3.37545 5.56194 3.77839 5.15677 4.2504 4.84534C4.72242 4.5339 5.25343 4.32285 5.81045 4.22528C6.36747 4.12771 6.9386 4.14572 7.48837 4.27818C8.03814 4.41064 8.5548 4.65473 9.00626 4.99528C9.45772 5.33583 9.83434 5.76557 10.1127 6.25781C10.189 6.38736 10.2386 6.53089 10.2585 6.67992C10.2784 6.82896 10.2682 6.98047 10.2285 7.1255C10.1889 7.27053 10.1206 7.40614 10.0276 7.52431C9.93465 7.64249 9.81894 7.74083 9.68733 7.81353C9.55572 7.88623 9.41088 7.93181 9.26135 7.94757C9.11183 7.96334 8.96066 7.94898 8.81678 7.90533C8.6729 7.86168 8.53923 7.78963 8.42367 7.69344C8.30811 7.59725 8.213 7.47888 8.14397 7.34531C7.9984 7.08173 7.79149 6.85709 7.54075 6.69039C7.29001 6.52368 7.00281 6.41982 6.70344 6.38757C6.40407 6.35533 6.10133 6.39566 5.82084 6.50515C5.54036 6.61464 5.29036 6.79007 5.092 7.0166C4.89365 7.24313 4.75276 7.51411 4.68127 7.8066C4.60978 8.09909 4.60978 8.40449 4.68127 8.69699C4.75276 8.98948 4.89365 9.26045 5.092 9.48698C5.29036 9.71351 5.54035 9.88894 5.82084 9.99843C6.04613 10.0862 6.23714 10.2442 6.36557 10.4491C6.494 10.654 6.55301 10.8947 6.53387 11.1358C6.51472 11.3768 6.41843 11.6052 6.25927 11.7872C6.1001 11.9692 5.88654 12.0951 5.65022 12.1462L5.64928 12.1491Z"
                        fill="#189BA3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_303_25194">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <select defaultValue="1" className="border-0 focus:ring-0 p-2 h-full flex items-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num.toString()}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-start border-l border-gray-200 pl-4">
                <label className="font-bold mb-1">Date</label>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-500 mr-2" />
                  <Input
                    type="date"
                    defaultValue="2021-07-17"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-2 h-10"
                  />
                </div>
              </div>

              <Button
                size="icon"
                className="bg-teal-500 hover:bg-teal-600 rounded-full h-10 w-10 ml-2"
              >
                <span>
                  <Search className="h-6 w-6 text-white" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </LayoutWrapper>

      <div className="border-b border-[#DCDCDC] border-width-2"></div>
    </header>
  );
};

export default Header;
