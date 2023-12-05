import {getServerSession} from "next-auth";
import SessionProvider from "@an/components/SessionProvider";


export default async function RootLayout({
                                           children,
                                           modal
                                         }: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
      <div className="sm:ml-64">
        {children}
      </div>

  )
}
