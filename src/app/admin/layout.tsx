import {getServerSession} from "next-auth";
import SessionProvider from "@an/components/SessionProvider";
import AdminSideBar from "@an/components/AdminSideBar";
import ToastProvider from "@an/components/modal/ToastProvider";


export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode,
}) {
  const session = await getServerSession();
  return (
      <SessionProvider session={session}>
        <div suppressHydrationWarning>
          <ToastProvider>
            <AdminSideBar/>

            {children}
          </ToastProvider>
        </div>

      </SessionProvider>

  )
}
