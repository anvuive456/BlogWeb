import Link from "next/link";
import {Icons} from "@an/components/icons";

const AppHeader = () => {
  return (
      <header className="max-w-5xl mx-auto pt-5">
        <div className="flex flex-wrap -mx-2 overflow-hidden px-5 lg:px-2 my-2">
          <div className="px-2 w-full overflow-hidden md:w-1/6 lg:w-1/3 xl:w-1/3 text-center md:text-left">
            <h1 className="font-bold text-2xl font-serif">An Tran</h1>
          </div>

          <nav className="my-2 px-2 w-full overflow-hidden md:w-3/6 lg:w-1/3 xl:w-1/3 text-center md:text-left">
            <ul>
              <li className="inline-block"><Link className="block font-semibold px-3" href="/">Trang chủ</Link></li>
              <li className="inline-block"><Link className="block font-semibold px-3" href="/categories">Danh mục</Link></li>
              <li className="inline-block"><Link className="block font-semibold px-3" href='/about'>Về tôi</Link></li>
            </ul>
          </nav>

          <div className="my-2 px-2 w-full overflow-hidden md:w-2/6 lg:w-1/3 xl:w-1/3 text-center md:text-right">
            <Link href="https://www.facebook.com/profile.php?id=100003962274819" title="Facebook" target="_blank"
                  className="inline-block w-6 mr-2">
              <Icons.facebook/>
            </Link>
            <Link href="https://www.instagram.com/mr_an_283" target="_blank" title="Instagram"
                  className="inline-block w-6 mr-2">
              <Icons.instagram/>
            </Link>
            <Link href="https://www.linkedin.com/in/trannhatan280399" target="_blank" title="LinkedIn"
                  className="inline-block w-6">
              <Icons.linkedin/>
            </Link>
          </div>

        </div>
      </header>
  )
}

export default AppHeader;
