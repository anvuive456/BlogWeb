import AppDate from '@an/components/AppDate';
import { PostWithAuthor } from '@an/types/types';
import Image from 'next/image';

const RecentArticleCard = ({ post }: { post: PostWithAuthor }) => {
  return (
    <>
      <a href={post.url} className='flex'>
        <div className='w-1/3'>
          <Image className='rounded'
                 width={100}
                 height={50}
                 src={post.image}
                 alt={post.title} />
        </div>
        <div className='w-2/3 px-2'>
          <h3 className='line-clamp-2 text-gray-900 font-thin font-serif mb-2'>{post.title}</h3>
          <span className='text-xs text-gray-800 font-thin block mb-5'><AppDate
            dateString={post.createdAt.toString()} /></span>
        </div>
      </a>
    </>
  );
};

export default RecentArticleCard;
