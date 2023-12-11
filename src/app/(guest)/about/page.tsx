import Image from "next/image";

const Page = ()=>{
  return (
      <>
        <main className="max-w-5xl mx-auto pb-10 pt-10">
          <div className="mt-20 sm:mt-0 text-center">
            <Image src={'/images/my-image.jpg'} alt={'An tran'} width={64} height={64} unoptimized={true} className='pointer-events-none w-64 h-64 rounded-full mx-auto'/>

            <h2 className="font-light text-xl my-5">An Tran</h2>
            <p className="text-gray-900 font-thin tracking-wider leading-loose max-w-lg mx-auto">
            Xin chào! Đây là
            </p>
          </div>
        </main>
      </>
  )
}

export default Page;
