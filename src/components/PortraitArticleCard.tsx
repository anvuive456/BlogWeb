import {Post} from "@prisma/client";
import MotionDiv from './MotionDiv';

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
                   className="h-96 w-1/2 overflow-hidden p-2">
          <div className='relative h-full'>
            <img
                className="w-full h-1/2 rounded"
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
                alt=""/>
            <h2 className="line-clamp-2 text-gray-900 font-thin font-serif text-xl my-3"><a
                href={post.url}>{post.title}</a></h2>
            <p className="line-clamp-3 text-gray-900 font-thin tracking-wider leading-tight">{post.content}...</p>
            <a href={post.url}
               className="absolute bottom-1 inline-block pt-5 text-sm font-medium tracking-wider">Đọc thêm...</a>
          </div>
        </MotionDiv>

      </>
  )
}

export default PortraitArticleCard;
