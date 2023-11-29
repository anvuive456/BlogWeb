import {Inter} from "next/font/google";
import {Metadata} from "next";

const inter = Inter({subsets: ['latin']});
// const popin = Poppins({subsets:['latin'],weight:['100','200','300','400','500','600','900']});

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
