import SearchBar from "@an/components/SearchBar";
import {baseApiUrl} from "../../../../lib/api";
import {Post} from "@prisma/client";
import LandScapeArticleCard from "@an/components/LandScapeArticleCard";

type Props = {
  search: string,
  page: number,
}
const Page = async ({searchParams}: { params: any, searchParams: Props }) => {
  const {search, page} = searchParams;

  console.log(page, search);
  // if (!page) {
  //   redirect('/posts?page=1&limit=10');
  // }

  const {
    posts
  } = await fetch(baseApiUrl + `/posts?search=${search}&pe=false`,{ next: { revalidate: 0 } }).then(res => res.json());

  console.log(posts);
  return (
      <>
        <SearchBar/>

        <div className='my-2'>
          {
              posts && posts.map((post: Post) => <LandScapeArticleCard key={post.id} post={post}/>)
          }
        </div>

      </>
  )
}


export default Page;
