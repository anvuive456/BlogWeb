import Link from "next/link";

const LoadMoreButton = () => {

  return (
      <div className='border border-black rounded text-black p-2 text-center'>
        <Link href='/posts' >
          Xem thêm bài viết
        </Link>
      </div>


  )
}

export default LoadMoreButton;
