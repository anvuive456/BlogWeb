'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useRef} from "react";

const SearchBar = () => {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get('search') ?? '';
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submit = () => {
    router.push(`/posts?search=${inputRef.current?.value || ''}&page=1`);
  }
  return (
      <div className="relative border rounded-sm overflow-hidden">
        <form className='flex flex-row items-center'>
          <input ref={inputRef} className="w-full  py-4 pr-10 pl-4 font-light text-gray-900 border-0"
                 type="text" name="search" defaultValue={search} id="" placeholder="Tìm bài viết..."/>
          <button onClick={submit}
                  className="bg-transparent border-0  px-5 ">
                                    <span className="block w-5">
                                        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512"><path
                                            d="M495 466.2L377.2 348.4c29.2-35.6 46.8-81.2 46.8-130.9C424 103.5 331.5 11 217.5 11 103.4 11 11 103.5 11 217.5S103.4 424 217.5 424c49.7 0 95.2-17.5 130.8-46.7L466.1 495c8 8 20.9 8 28.9 0 8-7.9 8-20.9 0-28.8zm-277.5-83.3C126.2 382.9 52 308.7 52 217.5S126.2 52 217.5 52C308.7 52 383 126.3 383 217.5s-74.3 165.4-165.5 165.4z"/></svg>
                                    </span>
          </button>
        </form>
      </div>
  )
}

export default SearchBar;
