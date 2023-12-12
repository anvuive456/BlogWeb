import SideBar from "@an/components/SideBar";
import {baseApiUrl} from "../../../../lib/api";
import {Post} from "@prisma/client";
import PortraitArticleCard from "@an/components/PortraitArticleCard";
import Link from "next/link";
import LoadMoreButton from "@an/app/(guest)/home/_components/LoadMoreButton";

const Page = async () => {

  const response = await fetch(baseApiUrl + `/posts?limit=10&page=1&published=true`).then(res => res.json());
  const {posts} = response;
  return (
      <>
        <div className="w-full overflow-hidden">
          <div className="mr-2 md:mr-4 ml-2">
            <div className="flex flex-wrap overflow-hidden mb-5">
              {
                  posts && posts.map((post: Post, index: number) => (
                      <>
                        <PortraitArticleCard key={post.id} post={post} index={index}/>
                      </>
                  ))
              }

            </div>
            <LoadMoreButton/>

          </div>

        </div>

      </>
  )
}

export default Page;
