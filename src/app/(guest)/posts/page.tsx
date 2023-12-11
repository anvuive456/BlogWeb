import SearchBar from "@an/components/SearchBar";
import {baseApiUrl} from "../../../../lib/api";
import {Post} from "@prisma/client";
import LandScapeArticleCard from "@an/components/LandScapeArticleCard";
import {redirect} from "next/navigation";

type Props = {
  search: string,
  page: number,
}
const Page = async ({params, searchParams}: { params: any, searchParams: Props }) => {
  const {search, page} = searchParams;

  console.log(page);
  // if(!page) {
  //   redirect('/posts?page=1');
  // }

  const {
    posts,
    count,
    pageCount
  } = await fetch(baseApiUrl + `/posts?search=${search}&page=${page}&limit=10`).then(res => res.json());


  return (
      <>
        <SearchBar/>
        {
            posts && posts.map((post: Post) => <LandScapeArticleCard key={post.id} post={post}/>)
        }
      </>
  )
}


export default Page;
