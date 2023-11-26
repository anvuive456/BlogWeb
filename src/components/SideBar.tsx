import {Category, Post} from "@prisma/client";
import {Suspense} from "react";
import {CategoryWithPosts} from "@an/types/types";
import {api} from "../../lib/api";

const Categories = async () => {
  // const {categories} = await api.get<{},{categories:CategoryWithPosts[]}>('/categories');
  const {data} = await api.get<{}, { data: CategoryWithPosts[] }>('/categories');
  return (
      <div className="mt-10">
        <h2 className="font-light text-xl mb-5 text-gray-900 text-center">Danh mục</h2>
        <ul>
          {
            (data && data.map((cate) => {
              return <li key={cate.id} className="flex justify-between">
                <a href="" className="text-gray-900 font-thin font-serif text-lg py-2 block ">
                  {cate.name}
                </a><span className="text-gray-700 text-lg font-thin p-2">{cate.posts.length}</span></li>
            }))
          }

        </ul>
      </div>
  )
}

const RecentPosts = async ()=>{
  const {data} = await api.get('/')
}

const SideBar = async () => {


  return (
      <>
        <div className="ml-2 md:ml-4 mr-2">
          <div className="mt-20 sm:mt-0 text-center">
            <div className="w-64 h-64 rounded-full mx-auto bg-cover bg-center bg-no-repeat bg-my-image"/>
            {/*<h2 className="font-light text-xl my-5">Raalhu</h2>*/}
            {/*<p className="text-gray-900 font-thin tracking-wider leading-loose">Hi! Welcome to*/}
            {/*    Raalhu theme preview. Raalhu is a minimal blog theme built with tailwindcss. It is*/}
            {/*    an html theme available free of change, with only a few page templates. Enjoy!</p>*/}
          </div>
          <div className="mt-20">
            <h2 className="font-light text-xl mb-5 text-center">Tìm bài viết</h2>
            <div className="relative border rounded-sm overflow-hidden">
              <form action="">
                <input className="w-full relative p-5 font-light text-gray-900 border-0"
                       type="text" name="s" id="" placeholder="Search..."/>
                <button type="submit"
                        className="bg-transparent border-0 absolute right-0 px-5 py-5 top-2">
                                    <span className="block w-5">
                                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512"><path
                                            d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"/></svg>
                                    </span>
                </button>
              </form>
            </div>
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
          <Suspense fallback={<div className='m-5'>Đang tải...</div>}>
            <Categories/>

          </Suspense>
          <div className="mt-10">
            <h2 className="font-light text-xl mb-5 text-gray-900 text-center">Bài viết gần đây</h2>
            <ul>
              {/*@foreach($recent_posts as $post)*/}
              <li className="mb-3">
                {/*<x-recent-article-card :data="$post"></x-recent-article-card>*/}
              </li>
              {/*@endforeach*/}

            </ul>
          </div>
        </div>

      </>
  )
}

export default SideBar;
