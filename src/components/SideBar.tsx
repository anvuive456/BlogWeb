import { Suspense } from 'react';
import { CategoryWithPosts, PostWithAuthor } from '@an/types/types';
import RecentArticleCard from '@an/components/RecentArticleCard';
import RecentArticleCardPlaceHolder from '@an/components/placeholders/RecentArticleCardPlaceHolder';
import { baseApiUrl, baseUrl } from '../../lib/api';
import Link from 'next/link';
import SearchBar from '@an/components/SearchBar';
import Image from 'next/image';


const Categories = async () => {
  const data = await fetch(baseApiUrl + '/categories')
    .then(value => value.json())
    .then(value => value as CategoryWithPosts[]);
  return (
    <ul>
      {
        (data && data.map((cate) => {
          return <li key={cate.id} className='flex justify-between'>
            <Link href={baseUrl + '/categories/' + cate.slug}
                  className='text-gray-900 font-thin font-serif text-lg py-2 block '>
              {cate.name}
            </Link><span className='text-gray-700 text-lg font-thin p-2'>{cate.posts.length}</span></li>;
        }))
      }

    </ul>

  );
};

const RecentPosts = async () => {
  const posts = await fetch(baseApiUrl + '/recent_posts')
    .then(res => res.json())
    .then(value => value as PostWithAuthor[]);

  return (<>
    <ul>
      {
        posts && posts.map(post => <li key={post.id} className='mb-3'>
          <RecentArticleCard post={post} />
        </li>)
      }
    </ul>
  </>);
};


const SideBar = () => {
  // const params = useSearchParams();

  return (
    <>
      <div className='md:w-1/3 sm:w-full overflow-hidden'>
        <div className='ml-2 md:ml-4 mr-2'>
          <div className='mt-16 sm:mt-0 text-center justify-center justify-items-center'>
            <Image src={'/images/my-image.jpg'} alt={'An tran'} width={64} height={64} unoptimized={true}
                   className='pointer-events-none w-64 h-64 rounded-full mx-auto' />
            {/*<div*/}
            {/*    className=" pointer-events-none w-64 h-64 rounded-full mx-auto bg-cover bg-center bg-no-repeat bg-my-image"/>*/}
            {/*<h2 className="font-light text-xl my-5">Raalhu</h2>*/}
            {/*<p className="text-gray-900 font-thin tracking-wider leading-loose">Hi! Welcome to*/}
            {/*    Raalhu theme preview. Raalhu is a minimal blog theme built with tailwindcss. It is*/}
            {/*    an html theme available free of change, with only a few page templates. Enjoy!</p>*/}
          </div>
          <div className='mt-20'>
            <h2 className='font-light text-xl mb-5 text-center'>Tìm bài viết</h2>
            <SearchBar />
          </div>
          {/*<div className="mt-10 bg-gray-100 rounded-sm p-5">*/}
          {/*    <div className="pb-6">*/}
          {/*        <div className="w-10 mx-auto mt-6 text-gray-900">*/}
          {/*            <svg className="fill-current" viewBox="-1 0 512 512"*/}
          {/*                 xmlns="http://www.w3.org/2000/svg">*/}
          {/*                <path*/}
          {/*                    d="M505.668 246.465c-.89-.906-54.297-54.309-55.668-55.68V55c0-30.328-24.672-55-55-55H115C84.672 0 60 24.672 60 55v135.785C.379 250.406 0 248.301 0 257v210c0 24.813 20.188 45 45 45h420c24.813 0 45-20.188 45-45V257c0-3.855-1.54-7.71-4.332-10.535zm-35.992 6.426L450 262.73v-29.516zM115 30h280c13.785 0 25 11.215 25 25v222.73l-120 60V197c0-8.285-6.715-15-15-15H135c-8.285 0-15 6.715-15 15v95.73l-30-15V55c0-13.785 11.215-25 25-25zm155 257.973l-66.68-44.453a15.004 15.004 0 00-15.027-.938L150 261.73V212h120zm-120 7.297l43.922-21.961L270 324.027v28.703l-15 7.5-105-52.5zm-90-32.54l-19.676-9.84L60 233.216zM465 482H45c-8.27 0-15-6.73-15-15V281.27l218.293 109.148a15.008 15.008 0 0013.414 0L480 281.27V467c0 8.27-6.73 15-15 15zm0 0"/>*/}
          {/*                <path*/}
          {/*                    d="M195 91h120c8.285 0 15-6.715 15-15s-6.715-15-15-15H195c-8.285 0-15 6.715-15 15s6.715 15 15 15zm0 0M135 151h240c8.285 0 15-6.715 15-15s-6.715-15-15-15H135c-8.285 0-15 6.715-15 15s6.715 15 15 15zm0 0M375 181h-30c-8.285 0-15 6.715-15 15s6.715 15 15 15h30c8.285 0 15-6.715 15-15s-6.715-15-15-15zm0 0M375 241h-30c-8.285 0-15 6.715-15 15s6.715 15 15 15h30c8.285 0 15-6.715 15-15s-6.715-15-15-15zm0 0"/>*/}
          {/*            </svg>*/}
          {/*        </div>*/}
          {/*        <h2 className="font-light text-xl mb-2 text-center pt-5 text-gray-900">Subscribe to*/}
          {/*            our newsletter</h2>*/}
          {/*        <span*/}
          {/*            className="block text-center text-gray-900 font-thin tracking-wider leading-loose text-xs italic">Get the news right in your inbox!</span>*/}
          {/*        <form action="">*/}
          {/*            <div*/}
          {/*                className="bg-white border border-gray-400 mt-5 rounded-sm overflow-hidden">*/}
          {/*                <input className="bg-transparent w-full p-3" type="text" name="name" id=""*/}
          {/*                       placeholder="First Name"/>*/}
          {/*            </div>*/}
          {/*            <div*/}
          {/*                className="bg-white border border-gray-400 mt-3 rounded-sm overflow-hidden">*/}
          {/*                <input className="bg-transparent w-full p-3" type="email" name="email" id=""*/}
          {/*                       placeholder="Email Address"/>*/}
          {/*            </div>*/}
          {/*            <div*/}
          {/*                className="mt-3 text-gray-900 font-thin tracking-wider leading-loose text-xs italic">*/}
          {/*                    <span className="inline-block pr-1">*/}
          {/*                        <input type="checkbox" name="" id="privacy-check"/>*/}
          {/*                    </span>*/}
          {/*                <label htmlFor="privacy-check">By checking this you agree to our <a href=""*/}
          {/*                                                                                    className="text-orange-500">Privacy*/}
          {/*                    Policy</a>.</label>*/}
          {/*            </div>*/}
          {/*            <button type="submit"*/}
          {/*                    className="w-full rounded-sm bg-gray-900 text-white tracking-widest text-sm uppercase font-medium py-3 mt-5">Subscribe*/}
          {/*            </button>*/}
          {/*        </form>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className='mt-10'>
            <h2 className='font-light text-xl mb-5 text-gray-900 text-center'>Danh mục</h2>
            <Suspense fallback={
              <div role='status' className='max-w-sm animate-pulse'>
                <div className='mt-10 mb-10 h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 '></div>
                <div className='mt-10 mb-10 h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 '></div>
              </div>
            }>
              <Categories />
            </Suspense>
          </div>

          <div className='mt-10'>
            <h2 className='font-light text-xl mb-5 text-gray-900 text-center'>Bài viết gần đây</h2>
            <Suspense fallback={<RecentArticleCardPlaceHolder />}>
              <RecentPosts />
            </Suspense>
          </div>
        </div>

      </div>

    </>
  );
};

export default SideBar;
