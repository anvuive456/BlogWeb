import {Post} from "@prisma/client";
import MotionDiv from './MotionDiv';
import {baseUrl} from "../../lib/api";
import Image from "next/image";
import AppDate from "@an/components/AppDate";

const variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
  }
}
const PortraitArticleCard = ({post, index}: { post: Post, index: number }) => {
  return (
      <>
        <MotionDiv variants={variants} initial='hidden' animate='visible'
                   transition={{delay: index * 0.25, ease: 'easeInOut', duration: 0.5}} viewport={{amount: 0}}
                   className="h-96 w-1/2 overflow-hidden p-2 relative">
          <div className='relative h-full'>
            <Image
                className="w-full h-1/2 rounded"
                src={post.image}
                width={800}
                height={600}
                alt={post.title}/>
            <h2 className=" text-gray-900 font-thin font-serif text-xl my-3"><a
                href={post.url}>{post.title}</a></h2>
            <p className="line-clamp-3 text-gray-900 font-thin tracking-wider leading-tight">{post.description}...</p>
            <AppDate className='font-light absolute bottom-0' dateString={post.updatedAt.toString()}/>
            {/*<a href={post.url}*/}
            {/*   className="absolute bottom-1 inline-block pt-5 text-sm font-medium tracking-wider">Đọc thêm...</a>*/}
          </div>
        </MotionDiv>

      </>
  )
}

export default PortraitArticleCard;
