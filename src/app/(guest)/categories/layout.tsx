import {Metadata} from "next";
import {Suspense} from "react";
import SideBar from "@an/components/SideBar";
import {baseUrl} from "../../../../lib/api";


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl + '/categories'),
  title: 'Danh mục',
}

export const revalidate = 0;

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
