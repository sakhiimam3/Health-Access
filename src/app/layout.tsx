import type { Metadata } from "next";
import { Roboto_Slab, Ubuntu, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Provider from "@/components/layout/provider";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "@/context/userStore";
// import { Suspense } from "react";
// import Loading from "./loading";

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Health Access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSlab.variable} ${ubuntu.variable} ${plusJakartaSans.variable}`}
      >
        <UserContextProvider>
          <Provider>
            {/* <Suspense fallback={<Loading />}>{children}</Suspense> */}
            {children}
            <ToastContainer autoClose={2000} />

          </Provider>
        </UserContextProvider>
      </body>
    </html>
  );
}
