import {baseApiUrl} from "../../../../../../lib/api";
import {PostWithCategory} from "@an/types/types";
import AppDate from "@an/components/AppDate";
import Link from "next/link";

const TableRow = ({post}: { post: PostWithCategory }) => {
  return (
      <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-10 p-4 ">
            {post.slug}
          </td>
          <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          </th>
          <td className="px-6 py-4 w-48 line-clamp-2">
            {post.title}
          </td>
          <td className="px-6 py-4">
            <AppDate dateString={post.createdAt.toString()}/>
          </td>
          <td className="px-6 py-4">
            {post.category.name}
          </td>

          <td className="px-6 py-4 ">
            <div className='flex flex-row gap-3 justify-center items-center'>
              <Link href={`/admin/posts/${post.slug}`}
                    className="transition-all duration-200 text-lg font-normal text-blue-600 dark:text-blue-500 hover:underline">Sửa</Link>
              <Link href="#"
                    className="transition-all duration-200 text-lg font-normal text-red-600 dark:text-red-500 hover:underline">Xoá</Link>
            </div>
          </td>
        </tr>
      </>
  )
}

const PostTable = async ({page}: { page: number }) => {
  const data = await fetch(`${baseApiUrl}/posts?page=${page}&limit=10`,{next:{revalidate:0}}).then(res => res.json());

  return <tbody>
  {data.posts && data.posts.map((post: PostWithCategory) => <TableRow key={post.id} post={post}/>)}
  </tbody>
}
export  default PostTable;
