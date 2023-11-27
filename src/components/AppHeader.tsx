const AppHeader = ()=> {
    return (

            <header className="max-w-5xl mx-auto pt-5">
                <div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-2 my-2">

                    <div className="px-2 w-full overflow-hidden md:w-1/6 lg:w-1/3 xl:w-1/3 text-center md:text-left">
                        <h1 className="font-bold text-2xl font-serif">An Tran</h1>
                    </div>

                    <nav className="my-2 px-2 w-full overflow-hidden md:w-3/6 lg:w-1/3 xl:w-1/3 text-center md:text-left">
                        <ul>
                            <li className="inline-block"><a className="block font-semibold px-3" href="/">Trang chủ</a></li>
                            <li className="inline-block"><a className="block font-semibold px-3" href="categories">Danh mục</a></li>
                            <li className="inline-block"><a className="block font-semibold px-3" href='about'>Về tôi</a></li>
                        </ul>
                    </nav>

                    <div className="my-2 px-2 w-full overflow-hidden md:w-2/6 lg:w-1/3 xl:w-1/3 text-center md:text-right">
                        <a href="" title="Facebook" target="_blank" className="inline-block w-6 mr-2">
                            <svg className="fill-current" viewBox="-110 1 511 512" xmlns="http://www.w3.org/2000/svg"><path d="M180 512H98.008c-13.695 0-24.836-11.14-24.836-24.836V302.227H25.336C11.64 302.227.5 291.082.5 277.39v-79.246c0-13.696 11.14-24.836 24.836-24.836h47.836v-39.684c0-39.348 12.355-72.824 35.726-96.805C132.375 12.73 165.184 0 203.778 0l62.53.102c13.672.023 24.794 11.164 24.794 24.835v73.579c0 13.695-11.137 24.836-24.829 24.836l-42.101.015c-12.84 0-16.11 2.574-16.809 3.363-1.152 1.31-2.523 5.008-2.523 15.223v31.352h58.27c4.386 0 8.636 1.082 12.288 3.12 7.88 4.403 12.778 12.727 12.778 21.723l-.031 79.247c0 13.687-11.141 24.828-24.836 24.828h-58.47v184.941C204.84 500.86 193.696 512 180 512zm-76.813-30.016h71.633V288.79c0-9.144 7.442-16.582 16.582-16.582h66.727l.027-68.883h-66.758c-9.14 0-16.578-7.437-16.578-16.582v-44.789c0-11.726 1.192-25.062 10.043-35.086 10.696-12.117 27.551-13.515 39.301-13.515l36.922-.016V30.109l-57.332-.093c-62.024 0-100.566 39.703-100.566 103.609v53.117c0 9.14-7.438 16.582-16.579 16.582H30.516v68.883h56.093c9.141 0 16.579 7.438 16.579 16.582zM266.25 30.117h.004zm0 0"/></svg>
                        </a>
                        <a href="social?url=www.instagram.com/mr_an_283" target="_blank" title="Instagram" className="inline-block w-6 mr-2">
                            <svg className="fill-current" viewBox="0 0 512.001 512.001" xmlns="http://www.w3.org/2000/svg"><path d="M373.406 0H138.594C62.172 0 0 62.172 0 138.594V373.41C0 449.828 62.172 512 138.594 512H373.41C449.828 512 512 449.828 512 373.41V138.594C512 62.172 449.828 0 373.406 0zm108.578 373.41c0 59.867-48.707 108.574-108.578 108.574H138.594c-59.871 0-108.578-48.707-108.578-108.574V138.594c0-59.871 48.707-108.578 108.578-108.578H373.41c59.867 0 108.574 48.707 108.574 108.578zm0 0"/><path d="M256 116.004c-77.195 0-139.996 62.8-139.996 139.996S178.804 395.996 256 395.996 395.996 333.196 395.996 256 333.196 116.004 256 116.004zm0 249.976c-60.64 0-109.98-49.335-109.98-109.98 0-60.64 49.34-109.98 109.98-109.98 60.645 0 109.98 49.34 109.98 109.98 0 60.645-49.335 109.98-109.98 109.98zm0 0M399.344 66.285c-22.813 0-41.367 18.559-41.367 41.367 0 22.813 18.554 41.371 41.367 41.371s41.37-18.558 41.37-41.37-18.558-41.368-41.37-41.368zm0 52.719c-6.258 0-11.352-5.094-11.352-11.352 0-6.261 5.094-11.351 11.352-11.351 6.261 0 11.355 5.09 11.355 11.351 0 6.258-5.094 11.352-11.355 11.352zm0 0"/></svg>
                        </a>
                        <a href="social?url=www.linkedin.com/in/trannhatan280399" target="_blank" title="LinkedIn" className="inline-block w-6">
                            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256"><path fill="currentColor" d="M216 26H40a14 14 0 0 0-14 14v176a14 14 0 0 0 14 14h176a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm2 190a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2V40a2 2 0 0 1 2-2h176a2 2 0 0 1 2 2ZM94 112v64a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0Zm88 28v36a6 6 0 0 1-12 0v-36a22 22 0 0 0-44 0v36a6 6 0 0 1-12 0v-64a6 6 0 0 1 12 0v2.11A34 34 0 0 1 182 140ZM98 84a10 10 0 1 1-10-10a10 10 0 0 1 10 10Z"/></svg>
                        </a>
                    </div>

                </div>
            </header>
    )
}

export default AppHeader;
