import {Inter, Poppins} from "next/font/google";
import AppHeader from "@an/components/AppHeader";
import AppFooter from "@an/components/AppFooter";

const inter = Inter({subsets: ['latin']});
// const popin = Poppins({subsets:['latin'],weight:['100','200','300','400','500','600','900']});

export const revalidate = 0;
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className='overflow-x-hidden max-w-full'>
      <body  className={inter.className}>
      <AppHeader/>
      {children}

      <AppFooter/>
      </body>
      </html>
  )
}
