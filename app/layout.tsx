import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Layout from "./components/RootLayout";
import { GoogleTagManager } from "@next/third-parties/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Winstead",
  description: "Find Curated Properties Across the Globe",
  verification: {
    google: "nrq9MNsvP-2ARvNXGewA3MLtsKKjA6Imy7RYqFleH-Y",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NSC43PQQ');
        `}
      </Script>

      <Layout className={`${jakarta.variable} h-full antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSC43PQQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Navbar />
        {children}
        <ToastContainer />
        <Footer />
        <GoogleTagManager gtmId="GTM-NSC43PQQ" />
      </Layout>
    </>
  );
}