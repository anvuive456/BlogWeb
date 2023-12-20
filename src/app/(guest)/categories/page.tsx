import {CategoryWithPosts} from "@an/types/types";
import PortraitArticleCard from "@an/components/PortraitArticleCard";
import {baseApiUrl} from "../../../../lib/api";


// const Categories = async () => {
//   const categories = await fetch(baseApiUrl + '/categories?postLimit=2')
//       .then(value => value.json())
//       .then(value => value as CategoryWithPosts[]).catch(reason => []);
//   return (
//       <>
//         <div className="mr-2 md:mr-4 ml-2">
//           {
//               categories && categories.map(category => <div key={category.slug}>
//                 <h2 className="font-semibold text-2xl mb-10">{category.name}<a
//                     href={`./categories/${category.slug}`} className="block text-sm italic font-light">View All →</a></h2>
//                 <div className="flex flex-wrap overflow-hidden mb-10">
//                   {
//                       category.posts && category.posts.map(post =>
//                           <PortraitArticleCard key={post.slug} post={post}/>
//                       )
//                   }
//                 </div>
//               </div>)
//           }
//
//         </div>
//       </>
//   )
// }
export default async function Page() {

  const categories = await fetch(baseApiUrl + '/categories?postLimit=2',{ next: { revalidate: 0 } })
      .then(value => value.json())
      .then(value => value as CategoryWithPosts[]);
  return (
      <>
        <div className="mr-2 md:mr-4 ml-2">
          {
              categories && categories.map(category => <div key={category.slug}>
                <h2 className="font-semibold text-2xl mb-10">{category.name}<a
                    href={`./categories/${category.slug}`} className="block text-sm italic font-light">View All →</a></h2>
                <div className="flex flex-wrap overflow-hidden mb-10">
                  {
                      category.posts && category.posts.map((post,index) =>
                          <PortraitArticleCard key={post.slug} post={post} index={index}/>
                      )
                  }
                </div>
              </div>)
          }

        </div>
      </>
  )
}
