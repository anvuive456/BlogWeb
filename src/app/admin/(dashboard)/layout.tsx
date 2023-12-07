import {getServerSession} from "next-auth";
import SessionProvider from "@an/components/SessionProvider";


export default async function RootLayout({
                                           children
                                         }: {
  children: React.ReactNode
}) {
  return (
      <div className="sm:ml-64">
        {children}
      </div>

  )
}
