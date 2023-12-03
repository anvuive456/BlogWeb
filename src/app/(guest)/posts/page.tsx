import SearchBar from "@an/components/SearchBar";
import {baseApiUrl} from "../../../../lib/api";
import {Post} from "@prisma/client";

const Page = async ({params, searchParams}: { params: any, searchParams: any }) => {
  const {search, page, limit} = searchParams;

  const {posts, count,pageCount} = await fetch(baseApiUrl+`/posts?search=${search}&page=${page}&limit=${limit}`).then(res=>res.json());


  return (
      <>
       <SearchBar />
        {
          posts && posts.map((post:Post)=> (
              <>

              </>
            ))
        }
      </>
  )
}


export default Page;
