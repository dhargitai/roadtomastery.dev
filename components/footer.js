import Link from './link'

export default function Footer() {
  return (
    <footer className="bg-lightBlue-600 text-white flex flex-col text-center border-t border-white">
      <div className="max-w-4xl mx-auto">
        <span className="text-4xl font-light text mt-4 block">
          roadTo<span className="font-semibold">Mastery</span>
        </span>
        <nav className="flex items-center mt-7 mb-10 text-xl tracking-wide">
          <ul className="flex gap-4 mx-auto">
            <li>
              <Link href="/">
                <a className="hover:text-orange-400 transition">Blog</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/about">
                <a className="hover:text-orange-400 transition">About</a>
              </Link>
            </li> */}
            <li>
              <Link href="/contact">
                <a className="hover:text-orange-400 transition">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="bg-lightBlue-700">
        <div className="max-w-4xl mx-auto my-5 space-y-4 text-sm font-light">
          {/* <p>
            <Link href="/terms">
              <a className="hover:text-orange-400 transition">
                Terms of Service, Privacy Policy and Cookies Policy
              </a>
            </Link>
          </p> */}
          <p>Copyright &copy; roadToMastery.dev 2021. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
