"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full md:w-full lg:w-[45%] min-h-screen px-6 lg:px-12 py-8 flex flex-col">
        {/* Logo Container - Fixed at top with same width as form */}
        <div className="flex justify-center">
          <div className="w-full max-w-[360px]">
            <div className="mb-8 flex justify-center md:justify-start">
              <Image
                src="/images/logo.png"
                alt="Health Access"
                width={250}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Form Container - Centered vertically */}
        <div className="flex items-center justify-center flex-grow">
          <div className="w-full max-w-[400px]">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-center mb-1 textColor mb-2">Login</h1>
              <p className="text-sm text-center paragraphColor font-roboto">
                Lorem ipsum dolor sit amet adipiscing elit.
              </p>
            </div>

            {/* Login/Register Toggle */}
            <div className="flex bg-[#CEF9F7] rounded-full p-2 mb-8">
              <Button
                variant={isLogin ? "default" : "ghost"}
                className={cn(
                  "flex-1 rounded-full text-sm font-medium textColor font-ubuntu",
                  isLogin 
                    ? "bg-[#00A0AA] text-white" 
                    : "bg-transparent text-[#00A0AA]"
                )}
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
              <Button
                variant={!isLogin ? "default" : "ghost"}
                className={cn(
                  "flex-1 rounded-full text-sm font-medium font-ubantu",
                  !isLogin 
                    ? "bg-[#00A0AA] text-white" 
                    : "bg-transparent text-[#00A0AA]"
                )}
                onClick={() => setIsLogin(false)}
              >
                Register
              </Button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-lg mb-2 textColor">Name*</label>
                  <Input 
                    type="text" 
                    className="rounded-full h-11 border-[#737373]" 
                  />
                </div>
              )}
              <div>
                <label className="block text-lg mb-2 textColor">Email*</label>
                <Input 
                  type="email" 
                  className="rounded-full h-11  border-[#737373]" 
                />
              </div>

              <div>
                <label className="block text-lg mb-2  textColor">Password*</label>
                <Input 
                  type="password" 
                  className="rounded-full h-11  border-[#737373]" 
                />
              </div>

              <div className="text-right">
                <Button 
                  variant="link" 
                  className="text-[#737373] p-0 text-sm underline font-roboto"
                >
                  Forgot Password?
                </Button>
              </div>

              <Button 
                className="w-full bg-[#189BA3]  hover:bg-[#00A0AA]/90 text-white rounded-full h-11 mt-4"
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </form>

            <div className="text-center mt-12">
              <p className="text-sm  text-[#737373] font-plusJakartaSans ">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-[#EC761E] p-0 h-auto text-sm font-normal font-plusJakartaSans underline"
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </Button>
              </p>
            </div>
           
          </div>
          
        </div>

        {/* Copyright - Aligned with form width */}
        <div className="flex justify-center">
          <div className="w-full max-w-[360px]">
            <p className="text-sm textColor font-roboto  font-[400]">
              © 2024 Health Access. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Container */}
      
      <div className="hidden lg:block w-[55%] relative h-screen">
        {/* Full Height Image Container with Centered Image */}
        <div className="absolute inset-0 p-12">
          <div className="relative w-full h-full rounded-[29px] overflow-hidden">
            <Image
              src="/images/login.png"
              alt="Pharmacy"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#52525B]/100 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-16 left-5 right-0 px-4  text-start text-white px-8 z-10">
              <h2 className="text-3xl font-semibold  text-white mb-2">Your health, your priority</h2>
              <p className="text-md text-white font-roboto">Book trusted pharmacy services today.</p>
            </div>
          </div>
        </div>
      </div>
        
    </div>
  )
}