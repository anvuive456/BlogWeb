import PortraitArticleCard from "@an/components/PortraitArticleCard";
import SideBar from "@an/components/SideBar";
import {baseApiUrl} from "../../../../lib/api";
import {CategoryWithPosts} from "@an/types/types";
const Page = async ({params}: { params: { slug: string } }) => {
  const category = await fetch(baseApiUrl + `/categories/${params.slug}`)
      .then(res => res.json())
      .then(value => value as CategoryWithPosts);
  console.log("category slug", category);
  return (
      <>
        <main className="max-w-5xl mx-auto pb-10 pt-10">
          <div className="flex flex-wrap overflow-hidden">
            <div className="w-full overflow-hidden md:w-4/6 lg:w-4/6 xl:w-4/6">
              <div className="mr-2 md:mr-4 ml-2">
                <h2 className="font-semibold text-2xl mb-10">{category.name}</h2>
                <div className="flex flex-wrap overflow-hidden mb-10">
                  {
                      category.posts && category.posts.map(post =>
                          <PortraitArticleCard key={post.slug} post={post}/>
                      )
                  }
                </div>

              </div>


            </div>
            <div className="w-full overflow-hidden md:w-2/6 lg:w-2/6 xl:w-2/6">
              <SideBar/>
            </div>
          </div>
        </main>

      </>
  )
}


export default Page;
