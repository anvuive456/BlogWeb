import {Post} from "@prisma/client";

const PortraitArticleCard = ({post}: { post: Post }) => {
  return (
      <>
        <div className="w-1/2 overflow-hidden pr-2 md:pr-4">
          <div>
            <img
                className="w-full h-1/2 rounded"
                 src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
                 alt=""/>
            <h2 className="line-clamp-3 text-gray-900 font-thin font-serif text-xl my-5"><a
                href={post.url}>{post.title}</a></h2>
            <p className="text-gray-900 font-thin tracking-wider leading-loose">{post.content?.slice(0,50)}...</p>
            <a href={post.url}
               className="inline-block pt-5 text-sm font-medium tracking-wider">Đọc thêm...</a>
          </div>
        </div>
      </>
  )
}

export default PortraitArticleCard;
