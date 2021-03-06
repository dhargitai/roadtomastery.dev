import * as React from 'react'
import Link from './link'
import NextLink from 'next/link'

export default function Header() {
  return (
    <header className="bg-lightBlue-600 text-white flex-row flex justify-between py-7 px-10 border-b border-white">
      <NextLink href="/">
        <a className="text-4xl font-light leading-8">
          roadTo<span className="font-semibold">Mastery</span>
        </a>
      </NextLink>
      <nav className="hidden sm:flex items-center font-light">
        <ul className="flex gap-4">
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
          {/* <li>
            <Link href="/subscribe">
              <a className="hover:text-orange-400 transition">
                Subscribe
              </a>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}
