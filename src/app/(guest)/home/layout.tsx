import {Metadata} from "next";
import {Suspense} from "react";
import SideBar from "@an/components/SideBar";
import {baseUrl} from "../../../../lib/api";


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl + '/home'),
  title: 'Trang chủ',
  description: 'Xem các bài đăng',
}


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode,
}) {
  return (
      <main className="max-w-5xl mx-auto my-10">
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
