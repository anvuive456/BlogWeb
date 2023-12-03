import {getServerSession} from "next-auth";
import SessionProvider from "@an/components/SessionProvider";
import AdminSideBar from "@an/components/AdminSideBar";




export default async function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode,
}) {
  const session = await  getServerSession();
  return (
      <SessionProvider session={session} >
        <AdminSideBar/>

        {children}
      </SessionProvider>

  )
}
