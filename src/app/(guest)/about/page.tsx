import Image from "next/image";
import {GoogleMapsEmbed} from '@next/third-parties/google'

const Page = () => {
  return (
      <>
        <main className="max-w-5xl mx-auto pb-10 pt-10">
          <div className="mt-20 sm:mt-0 flex flex-col justify-center items-center">
            <Image src={'/images/my-image.jpg'} alt={'An tran'} width={64} height={64} unoptimized={true}
                   className='pointer-events-none w-64 h-64 rounded-full mx-auto'/>

            <h2 className="font-light text-xl my-5 text-center">An Tran</h2>
            <p className="text-gray-900 font-light tracking-wider leading-loose max-w-lg mx-auto text-center">
              Xin chào! Đây là đồ án của tôi về NextJS 14.
              Những công nghệ được xử dụng trong đồ án này: NextJS 14, PostgreSQL, NextAuth, Tailwind, PlateJS.
            </p>
            <GoogleMapsEmbed
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ''}
                height={200}
                width={400}
                mode="place"
                allowfullscreen={false}
                loading={'eager'}
                style={''}
                q={'10.738207,106.678452'}
            />
          </div>
        </main>
      </>
  )
}

export default Page;
