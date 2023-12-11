import {Metadata} from "next";
import {baseUrl} from "../../../../lib/api";


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl + '/posts'),
  title: 'Trang chủ',
  description: 'Xem các bài đăng',
}

export const revalidate =0;

export default function RootLayout({
                                     children,
                                     params
                                   }: {
  children: React.ReactNode,
  params: { search: string }
}) {
  return (
      <main className="max-w-5xl mx-auto pb-10 pt-10">
        {children}
      </main>
  )
}
