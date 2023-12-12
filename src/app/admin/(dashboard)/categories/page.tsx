'use client'
import {CategoryWithCountPost, CategoryWithPosts, PostWithCategory} from "@an/types/types";
import {useEffect, useState} from "react";
import {baseApiUrl} from "../../../../../lib/api";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const Loading = () => {
  return (
      <div role="status" className='h-96 flex flex-col items-center justify-center'>
        <svg aria-hidden="true"
             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
  );
}

type _State = {
  categories: CategoryWithCountPost[],
  pageCount: number,
  count: number,
  pagination: {
    from: number,
    to: number,
  }
}

const Page = () => {
  const router = useRouter();
  const [state, setState] = useState<_State | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getCategories = async () => {
    setLoading(true);
    const res = await fetch(baseApiUrl + `/admin/categories?page=${page}&limit=10`).then(res => res.json());
    setState(res);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, [page]);

  const moveToPage = (nexPage: number) => {
    setPage(nexPage);
  }
  useEffect(() => {
    getCategories();
  }, [page]);

  const canBack = () => {
    if (!state?.pageCount) return false;
    return page > 1;
  }
  const canNext = () => {
    if (!state?.pageCount) return false;
    return page < (state.pageCount);
  }
  const deleteCategory = async ({id}: { id: number }) => {
    setLoading(true);
    const res = await fetch(baseApiUrl + `/admin/categories/${id}`, {
      method: 'DELETE',
      // mode: 'same-origin'
    }).then(res => res.json());
    if (res.message) {
      toast.error(res.message);
      return;
    }
    getCategories();
    toast.success('Xoá danh mục thành công');
  }


  return (
      <>

        <div className='p-4'>
          <button
              onClick={() => {
                router.push('/admin/categories/create');
              }}
              className='p-2 mb-2 border rounded bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white'>
            Thêm Danh mục
          </button>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {
              loading ? <Loading/> :
                  <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4 w-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Tên
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        Số lượng bài viết
                      </th>
                      <th scope="col" className="px-6 py-3">
                      </th>

                    </tr>
                    </thead>

                    <tbody>
                    {state?.categories && state?.categories.map((category: CategoryWithCountPost) =>
                        <tr key={category.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="w-3 p-4 ">
                            {category.slug}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {category.name}
                          </td>
                          <td className="px-6 py-4 w-48 line-clamp-2">
                            {category._count.posts}
                          </td>

                          <td className="px-6 py-4 ">
                            <div className='flex flex-row gap-3 justify-center items-center'>
                              {/*<button*/}
                              {/*    onClick={() => router.push(`/admin/posts/${post.slug}`)}*/}
                              {/*    className="transition-all duration-200 text-lg font-normal text-blue-600 dark:text-blue-500 hover:underline">Sửa*/}
                              {/*</button>*/}
                              <button onClick={() => deleteCategory({id: category.id})}
                                      className="transition-all duration-200 text-lg font-normal text-red-600 dark:text-red-500 hover:underline">Xoá
                              </button>


                            </div>
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>

            }

            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4"
                 aria-label="Table navigation">
              <span
                  className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span
                  className="font-semibold text-gray-900 dark:text-white">{state?.pagination.from}-{state?.pagination.to}</span> of <span
                  className="font-semibold text-gray-900 dark:text-white">{state?.count}</span>
                </span>


              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                {
                  canBack() ? <li>
                    <button
                        onClick={() => moveToPage(page - 1)}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous
                    </button>
                  </li> : <></>
                }
                {
                  canNext() ?
                      <li>
                        <button
                            onClick={() => moveToPage(page + 1)}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
                        </button>
                      </li> : <></>
                }

              </ul>
            </nav>
          </div>
        </div>
      </>
  )
}

export default Page;
