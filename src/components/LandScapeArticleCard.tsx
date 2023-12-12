import {Post} from "@prisma/client";
import Image from "next/image";
import AppDate from "@an/components/AppDate";
import Link from "next/link";

const LandScapeArticleCard = ({post} : {post: Post})=>{
  return  (
      <div className='flex flex-row gap-2 my-2'>
        <Image src={post.image} alt={post.title} width={250} height={250}/>
        <div className='flex flex-col gap-2 justify-center'>
          <Link href={post.url} className='text-xl font-semibold'>{post.title}</Link>
          <div className=' font-light'>{post.description}</div>
          <AppDate dateString={post.createdAt.toString()}/>
        </div>
      </div>
  )
}

export default LandScapeArticleCard;
