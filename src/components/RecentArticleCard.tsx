import AppDate from "@an/components/AppDate";
import {PostWithAuthor} from "@an/types/types";

const RecentArticleCard = ({post}: { post: PostWithAuthor }) => {
  return (
      <>
        <a href={post.url} className="flex">
          <div className="w-1/3">
            <img className="rounded"
                 src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                 alt=""/>
          </div>
          <div className="w-2/3 px-2">
            <h3 className="text-gray-900 font-thin font-serif mb-2">{post.title}</h3>
            <span className="text-xs text-gray-800 font-thin block mb-5"><AppDate
                dateString={post.createdAt.toString()}/></span>
          </div>
        </a>
      </>
  )
}

export default RecentArticleCard;
