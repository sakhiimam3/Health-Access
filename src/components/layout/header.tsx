"use client"
// import Image from 'next/image'
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";


const Header = () => {
  return (
    <section>
      <nav className="flex justify-between items-center py-4">
        <div>
          <img
            src={"/images/logo.png"}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div position="">
          <ul className="flex justify-center gap-12 capitalize font-[400]">
            {navItems.map(
              (item, index) => (
                <li key={index} className="relative group">
                  <Link
                    href="#"
                    className="inline-block relative before:absolute before:left-0 before:bottom-0 before:top-6 before:w-full before:h-1 before:bg-teal-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-200 before:ease-in-out group-hover:before:scale-x-100"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="flex gap-1 items-center">
          <span className="font-[400]">Manage Your Account</span>
          <div className="flex gap-1 items-center">
            <div className="flex gap-1 items-center">
              menu
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
      
    </section>
  );
};

export default Header;
