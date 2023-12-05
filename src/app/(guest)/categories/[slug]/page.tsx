import PortraitArticleCard from "@an/components/PortraitArticleCard";
import {getCategoryPosts} from "@an/app/(guest)/categories/action";
import LoadMore from "@an/app/(guest)/categories/_components/LoadMore";
import {CategoryWithPosts} from "@an/types/types";
import {baseApiUrl} from "../../../../../lib/api";
import {Suspense} from "react";
const Page = async ({params, searchParams}: { params: { slug: string }, searchParams: {search: string} }) => {
  const category = await fetch(baseApiUrl + `/categories/${params.slug}?search=${searchParams.search || ''}`)
      .then(res => res.json())
      .then(value => value as CategoryWithPosts);
  // const category = await getCategoryPosts({slug: params.slug, page: 1});
  return (
      <>
        <div className="mr-2 md:mr-4 ml-2">
          <h2 className="font-semibold text-2xl mb-10">{category?.name ?? ''}</h2>
          <div className="flex flex-wrap overflow-hidden mb-10">
            {
                category?.posts && category.posts.map((post,index) =>
                    <PortraitArticleCard key={post.slug} post={post} index={index}/>
                )
            }
          </div>
          <Suspense>
            <LoadMore slug={params.slug}/>
          </Suspense>
        </div>
      </>
  )
}


export default Page;
