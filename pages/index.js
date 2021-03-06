import Container from '../components/container'
import Layout from '../components/layout'
import {getAllPosts} from '../lib/api'
import Head from 'next/head'
import BlogPosts from '../components/blog-posts'

export default function Index({allPosts}) {
  return (
    <>
      <Layout>
        <Head>
          <title>roadToMastery webdev blog</title>
        </Head>
        <Container>
          <main>
            {allPosts.length > 0 ? <BlogPosts posts={allPosts} /> : null}
          </main>

          <aside>
            <div className="rounded bg-lightBlue-600 text-white w-full md:w-52 lg:w-72 xl:w-96 px-10 py-6 text-center space-y-3 text-xl font-thin tracking-wide">
              {/* <div className="text-3xl leading-8 md:text-2xl md:leading-6 lg:text-3xl lg:leading-8 font-bold">
                Content marketing that increases your conversions.
              </div>
              <div className="tracking-wider">
                Get my latest content marketing techniques sent to your inbox,
                plus exclusive tips not shared on this blog.
              </div>
              <form
                className="bg-white rounded p-1 flex flex-col"
                action=""
                method="post"
              >
                <div className="">
                  <input
                    type="email"
                    className="block w-full text-center focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-300 mb-1 text-gray-900 text-base py-3 rounded bg-gray-50"
                    name="fields[email]"
                    placeholder="Enter your email"
                    value=""
                  />
                  <button
                    type="submit"
                    className="block bg-orange-500 text-white w-full text-center transition hover:bg-orange-600 focus:shadow-inner focus:outline-none text-base py-3 rounded"
                  >
                    Sign Up
                  </button>
                </div>
              </form> */}

              <h1 className="text-xl leading-6 md:text-lg md:leading-5 lg:text-xl lg:leading-6 font-medium">
                3 friends&apos; blog about their journey in the world of web
                development.
              </h1>
            </div>
          </aside>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt'
  ])

  return {
    props: {allPosts}
  }
}
