import DateFormatter from './date-formatter'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPosts({posts}) {
  return (
    <>
      {posts.map(({slug, title, date, excerpt, author, coverImage}) => (
        <article
          className="bg-white mb-12 py-14 px-12 shadow-xl rounded max-w-3xl"
          key={slug}
        >
          <h2 className="text-lightBlue-600 font-bold text-2xl mb-4">
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a className="hover:text-orange-500 transition">{title}</a>
            </Link>
          </h2>

          <ul className="flex items-center flex-col sm:flex-row sm:gap-3">
            <li className="flex items-center gap-3">
              <Image
                src={author.picture}
                className="rounded-full w-9"
                width={36}
                height={36}
              />
              {author.name}
            </li>
            <li>
              Updated <DateFormatter dateString={date} />
            </li>
          </ul>

          <div className="mt-11">
            <div className="text-xl leading-8">
              {coverImage ? (
                <div className="float-right w-28 mb-7 ml-2 sm:w-48 md:w-32 lg:w-48">
                  <Image
                    src={coverImage}
                    className="rounded w-9"
                    layout="responsive"
                    width={150}
                    height={150}
                  />
                </div>
              ) : null}
              <div className="space-y-4">{excerpt}</div>

              <Link as={`/blog/${slug}`} href="/blog/[slug]">
                <a className="bg-orange-500 text-white w-full block py-2 mt-6 text-center hover:bg-orange-600 focus:shadow-inner relative rounded transition clear-both">
                  Continue Reading
                </a>
              </Link>
            </div>
          </div>
        </article>
      ))}

      {/* <section className="flex flex-row justify-between text-lightBlue-600 text-xl mt-3">
        <a href="#" className="hover:text-orange-500 transition">
          Older posts
        </a>
        <a href="#" className="hover:text-orange-500 transition">
          Newer posts
        </a>
      </section> */}
    </>
  )
}
