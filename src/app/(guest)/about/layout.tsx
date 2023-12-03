import {Inter} from "next/font/google";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Về tôi',
}


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <>
        {children}

      </>
  )
}
