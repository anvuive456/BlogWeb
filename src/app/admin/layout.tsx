import {getServerSession} from "next-auth";
import SessionProvider from "@an/components/SessionProvider";
import AdminSideBar from "@an/components/AdminSideBar";
import ToastProvider from "@an/components/modal/ToastProvider";
import {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Trang của admin An Tran',

}
type Props = {
  children: React.ReactNode,
  auth: React.ReactNode
}
export default async function RootLayout({
                                           children,
                                           auth
                                         }: Props) {
  const session = await getServerSession();
  return (
      <SessionProvider session={session}>
        <div suppressHydrationWarning>
          <ToastProvider>
            <AdminSideBar/>

            {children}
          </ToastProvider>
        </div>
        {auth}
      </SessionProvider>

  )
}
