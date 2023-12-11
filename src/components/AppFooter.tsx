import Link from "next/link";
import {Icons} from "@an/components/icons";

const AppFooter = () => {
  return (
      <>
        <footer className="bg-gray-100 text-center sm:text-left">
          <div className="max-w-5xl mx-auto pb-10 pt-10 text-gray-900">
            <ul>
              <li className="inline-block"><Link className="block font-semibold mx-3" href="/">Trang chủ</Link></li>
              <li className="inline-block"><Link className="block font-semibold mx-3" href="/categories">Danh mục</Link>
              </li>
              <li className="inline-block"><Link className="block font-semibold mr-3" href="/about">Về tôi</Link></li>
            </ul>
            <div className="sm:flex px-3">
              <div className="w-full sm:w-1/2">
                <h4 className="font-bold text-2xl font-serif pt-10">An Tran</h4>
                <span
                    className="block pt-1 text-xs tracking-wider font-light">&copy;2023 An Tran. All rights reserved.</span>
              </div>
              <div className="w-full sm:w-1/2 text-center md:text-right mt-10 sm:mt-0">
                <Link target='_blank' href="https://www.facebook.com/profile.php?id=100003962274819" title="Facebook" className="inline-block w-6 mr-2">
                  <Icons.facebook/>
                </Link>
                <Link target='_blank' href="https://www.linkedin.com/in/trannhatan280399" title="LinkedIn" className="inline-block w-6 mr-2">
                  <Icons.linkedin/>
                </Link>
                <Link target='_blank' href="https://www.instagram.com/mr_an_283" title="Instagram" className="inline-block w-6">
                  <Icons.instagram/>
                </Link>
              </div>
            </div>
          </div>
        </footer>

      </>
  )
}

export default AppFooter;
