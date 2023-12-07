'use client'
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

const Error = ({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  return (
      <div className='flex-col gap-3 justify-center h-96 flex items-center'>
        <Image src={'/images/error.svg'} alt={'Lỗi'} height={500} width={500}/>
        <h4>
          Không thể tải bài viết: {error.message}
        </h4>
        <button className='text-blue-400 underline' onClick={()=>router.back()}>
          Quay lại thôi
        </button>
      </div>
  )
}

export default Error;
