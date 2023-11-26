import SideBar from "@an/components/SideBar";
import {api} from "../../../../lib/api";
import {CategoryWithPosts} from "@an/types/types";
import PortraitArticleCard from "@an/components/PortraitArticleCard";
import {Suspense} from "react";


const Categories = async () => {
  const {data} = await api.get<{ postLimit: number }, { data: CategoryWithPosts[] }>('/categories?postLimit=2',);

  return (
      <>
        <div className="mr-2 md:mr-4 ml-2">
          {
              data && data.map(category => <div key={category.slug}>
                <h2 className="font-semibold text-2xl mb-10">{category.name}<a
                    href={`./categories/${category.slug}`} className="block text-sm italic font-light">View All →</a></h2>
                <div className="flex flex-wrap overflow-hidden mb-10">
                  {
                      category.posts && category.posts.map(post =>
                          <PortraitArticleCard key={post.slug} post={post}/>
                      )
                  }
                </div>
              </div>)
          }

        </div>
      </>
  )
}
export default async function Page() {


  return (
      <>
        <main className="max-w-5xl mx-auto pb-10 pt-10">
          <div className="flex flex-wrap overflow-hidden">
            <div className="w-full overflow-hidden md:w-4/6 lg:w-4/6 xl:w-4/6">

              <Suspense fallback={<div role='status' className='max-w-sm animate-pulse'>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              </div>}>
                <Categories/>

              </Suspense>

            </div>
            <div className="w-full overflow-hidden md:w-2/6 lg:w-2/6 xl:w-2/6">
              <SideBar/>
            </div>
          </div>
        </main>
      </>
  )
}
