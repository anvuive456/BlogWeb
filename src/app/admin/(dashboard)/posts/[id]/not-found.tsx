import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
      <div className='flex flex-col items-center gap-5'>
        <Image src={'/images/notfound.svg'} alt={'Not found'} height={500} width={500}/>
        <div className='text-2xl '>Không tìm thấy bài viết</div>
        <Link className='underline text-blue-700 hover:text-blue-500 transition-colors duration-300' href='/posts'>Xem các bài viết khác</Link>
      </div>
  )
}
