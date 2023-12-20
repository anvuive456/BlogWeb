'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const AdminSideBar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
    console.log(open);
  };
  return (
    <>
      <button
        onClick={toggle}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 max-sm:w-screen h-screen transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }  sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center ps-2.5 mb-5">
            <img
              src={session?.user?.image ?? ''}
              className="h-7 me-3 sm:h-8 rounded-full"
              alt="Admin Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {session?.user?.name}
            </span>
            <button
              type="button"
              onClick={toggle}
              className="sm:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/posts"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7.5 16.5h6v-1h-6zm0-4h9v-1h-9zm0-4h9v-1h-9zM5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h12.77q.69 0 1.152.463q.463.462.463 1.152v12.77q0 .69-.462 1.152q-.463.463-1.153.463zm0-1h12.77q.23 0 .423-.192q.192-.193.192-.423V5.615q0-.23-.192-.423Q18.615 5 18.385 5H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192M5 5v14z"
                  />
                </svg>
                <span className="ms-3">Bài đăng</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/categories"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m8.637 8.994l2.667-4.402q.13-.211.312-.295T12 4.213q.202 0 .384.084t.312.295l2.667 4.402q.131.202.131.424t-.106.409q-.105.186-.284.295t-.417.109H9.313q-.24 0-.42-.111q-.181-.111-.281-.293q-.106-.18-.106-.4q0-.221.13-.433M17.5 21.231q-1.567 0-2.65-1.082q-1.08-1.082-1.08-2.649t1.08-2.649q1.083-1.082 2.65-1.082t2.65 1.082q1.08 1.082 1.08 2.649t-1.081 2.65q-1.082 1.08-2.649 1.08M3.77 19.923v-4.85q0-.343.232-.573q.232-.23.576-.23h4.85q.343 0 .573.233q.23.232.23.576v4.85q0 .343-.233.573q-.232.23-.576.23h-4.85q-.343 0-.573-.233q-.23-.232-.23-.576m13.73.309q1.147 0 1.94-.792q.792-.792.792-1.938q0-1.147-.792-1.94q-.792-.792-1.938-.792q-1.147 0-1.94.792q-.792.792-.792 1.938q0 1.147.792 1.94q.792.792 1.938.792m-12.73-.5h4.462V15.27H4.769zm4.858-10.5h4.746L12 5.427zM17.5 17.5"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Danh mục</span>
              </Link>
            </li>
            {/*<li>*/}
            {/*  <Link*/}
            {/*    href="/admin/users"*/}
            {/*    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"*/}
            {/*  >*/}
            {/*    <svg*/}
            {/*      xmlns="http://www.w3.org/2000/svg"*/}
            {/*      width="24"*/}
            {/*      height="24"*/}
            {/*      viewBox="0 0 24 24"*/}
            {/*    >*/}
            {/*      <path*/}
            {/*        fill="currentColor"*/}
            {/*        d="M12 11.385q-1.237 0-2.119-.882T9 8.385q0-1.238.881-2.12q.881-.88 2.119-.88t2.119.88q.881.882.881 2.12q0 1.237-.881 2.118T12 11.385m-7 7.23V16.97q0-.619.36-1.158q.361-.54.97-.838q1.416-.679 2.833-1.018q1.418-.34 2.837-.34q1.42 0 2.837.34q1.417.34 2.832 1.018q.61.298.97.838q.361.539.361 1.158v1.646zm1-1h12v-.646q0-.332-.214-.625q-.215-.292-.594-.494q-1.234-.598-2.546-.916q-1.31-.319-2.646-.319q-1.335 0-2.646.319q-1.312.318-2.546.916q-.38.202-.594.494Q6 16.637 6 16.97zm6-7.23q.825 0 1.413-.588T14 8.385q0-.825-.587-1.413T12 6.385q-.825 0-1.412.587T10 8.385q0 .825.588 1.412t1.412.588m0 7.23"*/}
            {/*      />*/}
            {/*    </svg>*/}
            {/*    <span className="flex-1 ms-3 whitespace-nowrap">*/}
            {/*      Người dùng*/}
            {/*    </span>*/}
            {/*  </Link>*/}
            {/*</li>*/}

            <li>
              <a
                onClick={() => signOut()}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5.615 20q-.69 0-1.152-.462Q4 19.075 4 18.385V5.615q0-.69.463-1.152Q4.925 4 5.615 4h6.404v1H5.615q-.23 0-.423.192Q5 5.385 5 5.615v12.77q0 .23.192.423q.193.192.423.192h6.404v1zm10.847-4.462l-.702-.719l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.703-.718L20 12z"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;
