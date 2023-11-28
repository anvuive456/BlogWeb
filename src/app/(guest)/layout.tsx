import {Inter, Poppins} from "next/font/google";
import {Metadata} from "next";
import AppHeader from "@an/components/AppHeader";
import AppFooter from "@an/components/AppFooter";
import {Suspense} from "react";

const inter = Inter({subsets: ['latin']});
// const popin = Poppins({subsets:['latin'],weight:['100','200','300','400','500','600','900']});



export const revalidate = 180; // revalidate at most every hour

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body >
      <AppHeader/>
      {children}

      <AppFooter/>
      </body>
      </html>
  )
}
