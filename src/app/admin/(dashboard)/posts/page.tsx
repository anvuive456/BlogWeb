'use client';

import { api, baseApiUrl } from '../../../../../lib/api';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import AppDate from '@an/components/AppDate';
import { PostWithCategory } from '@an/types/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type _State = {
  posts: PostWithCategory[],
  count: number,
  pageCount: number,
  pagination: {
    from: number,
    to: number
  }
};


const Loading = () => {
  return (
    <div role='status' className='h-96 flex flex-col items-center justify-center'>
      <svg aria-hidden='true'
           className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
           viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
          fill='currentColor' />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill' />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};


const Page = () => {
  const [state, setState] = useState<_State | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPosts = async () => {
    setLoading(true);
    const data = await fetch(baseApiUrl + `/posts?page=${page}&limit=10`).then(res => res.json());
    setState(data);
    setLoading(false);
  };
  const moveToPage = (nexPage: number) => {
    setPage(nexPage);
  };
  useEffect(() => {
    getPosts();
  }, [page]);

  const canBack = () => {
    if (!state?.pageCount) return false;
    return page > 1;
  };
  const canNext = () => {
    if (!state?.pageCount) return false;
    return page < (state.pageCount);
  };

  const deletePost = async ({ id }: { id: number }) => {
    setLoading(true);
    const data = await fetch(baseApiUrl + `/admin/posts/${id}`, { method: 'DELETE' }).then(res => res.json());
    if (data.deleted) {
      await getPosts();
    }
  };

  const togglePublish = async ({ id }: { id: number }) => {
    setLoading(true);
    const data = await fetch(baseApiUrl + `/admin/posts/publish`, {
      method: 'POST',
      body: JSON.stringify({ id: id }),
    }).then(res => res.json());
    if (!data.message) await getPosts();
  };

  return (
    <div className='p-4'>
      <button
        onClick={() => router.push('/admin/posts/create')}
        className='p-2 mb-2 border rounded bg-blue-600 hover:bg-blue-500 transition-all duration-300 text-white'>
        Thêm bài viết
      </button>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        {
          loading ? <Loading /> :
            <table className=' w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='p-4 w-3'>
                  #
                </th>
                <th scope='col' className='px-6 py-3 '>
                  Hình ảnh
                </th>
                <th scope='col' className='px-6 py-3 '>
                  Tiêu đề
                </th>
                <th scope='col' className='px-6 py-3'>
                  Ngày tạo
                </th>
                <th scope='col' className='px-6 py-3'>
                  Danh mục
                </th>
                <th scope='col' className='px-6 py-3'>
                  Published
                </th>
                <th scope='col' className='px-6 py-3'>
                </th>

              </tr>
              </thead>

              <tbody>
              {state?.posts && state?.posts.map((post: PostWithCategory) =>
                <tr key={post.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <td className='p-4 w-40'>
                    {post.slug}
                  </td>
                  <td className='px-6 py-4 '>
                    <Image src={post.image} alt={post.title} width={300} height={200} />
                  </td>
                  <td className='px-6 py-4 w-48 line-clamp-2'>
                    {post.title}
                  </td>
                  <td className='px-6 py-4'>
                    <AppDate dateString={post.createdAt.toString()} />
                  </td>
                  <td className='px-6 py-4'>
                    {post.category.name}
                  </td>

                  <td className='px-6 py-4'>
                    <label className='relative inline-flex items-center me-5 cursor-pointer'>
                      <input readOnly={true} type='checkbox' onClick={() => togglePublish({ id: post.id })}
                             className='sr-only peer' checked={post.published} />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                    </label>
                  </td>
                  <td className='px-6 py-4 '>
                    <div className='flex flex-row gap-3 justify-center items-center'>

                      <button
                        onClick={() => router.push(`/admin/posts/${post.id}`)}
                        className='transition-all duration-200 text-lg font-normal text-blue-600 dark:text-blue-500 hover:underline'>
                        <span className='sr-only'>
                          Sửa
                        </span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                          <path fill='currentColor'
                                d='M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h8.387l-1 1H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192h12.77q.23 0 .423-.192q.192-.193.192-.423v-7.489l1-1v8.489q0 .69-.462 1.152q-.463.463-1.153.463zM10 14v-2.615l8.944-8.945q.166-.165.348-.228q.183-.064.385-.064q.188 0 .368.064q.18.063.326.21L21.483 3.5q.16.165.242.364q.083.2.083.401t-.06.382q-.061.18-.227.345L12.52 14zm10.813-9.715l-1.111-1.17zM11 13h1.092l6.666-6.665l-.546-.547l-.61-.584L11 11.806zm7.212-7.212l-.61-.584zl.546.547z' />
                        </svg>
                      </button>

                      <button onClick={() => deletePost({ id: post.id })}
                              className='transition-all duration-200 text-lg font-normal text-red-600 dark:text-red-500 hover:underline'>
                        <span className='sr-only'>
                          Xoá
                        </span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                          <path fill='currentColor'
                                d='M7.615 20q-.67 0-1.143-.472Q6 19.056 6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.152q-.463.463-1.153.463zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.23 0 .423-.192q.192-.193.192-.423zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z' />
                        </svg>
                      </button>


                    </div>
                  </td>
                </tr>,
              )}
              </tbody>
            </table>

        }

        <nav className='flex items-center flex-column flex-wrap md:flex-row justify-between p-4'
             aria-label='Table navigation'>
              <span
                className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>Showing <span
                className='font-semibold text-gray-900 dark:text-white'>{state?.pagination.from}-{state?.pagination.to}</span> of <span
                className='font-semibold text-gray-900 dark:text-white'>{state?.count}</span>
                </span>


          <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
            {
              canBack() ? <li>
                <button
                  onClick={() => moveToPage(page - 1)}
                  className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>Previous
                </button>
              </li> : <></>
            }
            {
              canNext() ?
                <li>
                  <button
                    onClick={() => moveToPage(page + 1)}
                    className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>Next
                  </button>
                </li> : <></>
            }

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Page;
