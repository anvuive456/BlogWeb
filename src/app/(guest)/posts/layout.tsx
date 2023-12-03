import {Inter, Poppins} from "next/font/google";
import {Metadata} from "next";
import AppHeader from "@an/components/AppHeader";
import AppFooter from "@an/components/AppFooter";
import {Suspense} from "react";
import SideBar from "@an/components/SideBar";


export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Xem các bài đăng',
}


export default function RootLayout({
                                     children,
    params
                                   }: {
  children: React.ReactNode,
  params: {search: string}
}) {
  return (
      <main className="max-w-5xl mx-auto pb-10 pt-10">
        {children}
      </main>
  )
}
