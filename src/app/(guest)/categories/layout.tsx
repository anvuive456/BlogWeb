import {Inter, Poppins} from "next/font/google";
import {Metadata} from "next";
import AppHeader from "@an/components/AppHeader";
import AppFooter from "@an/components/AppFooter";
import {Suspense} from "react";
import SideBar from "@an/components/SideBar";


export const metadata: Metadata = {
  title: 'Danh mục',
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
        <div className="flex flex-wrap overflow-hidden">
          <div className='w-2/3 max-md:w-full'>
            {children}

          </div>
          <Suspense>
            <SideBar/>

          </Suspense>
        </div>
      </main>
  )
}
