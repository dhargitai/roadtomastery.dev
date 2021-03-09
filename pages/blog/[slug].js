import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '@components/container'
import Layout from '@components/layout'
import {getPostBySlug, getAllPosts} from '@lib/api'
import Head from 'next/head'
import Image from 'next/image'
import markdownToHtml from '@lib/markdownToHtml'
import DateFormatter from '@components/date-formatter'

export default function Post({post, preview}) {
  const router = useRouter()
  if (!router.isFallback && !post.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <main className="flex my-10 gap-10 mx-auto justify-center">
          <article className="bg-white shadow-xl rounded pt-12 pb-20 px-5 sm:mx-5 sm:max-w-xl md:max-w-3xl md:px-12 md:pt-12 lg:max-w-4xl lg:px-32">
            {router.isFallback ? (
              <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-6">
                Loading...
              </h1>
            ) : (
              <>
                <Head>
                  <title>{post.title} | roadToMastery</title>
                  {post.ogImage && post.ogImage.url ? (
                    <meta property="og:image" content={post.ogImage.url} />
                  ) : null}
                </Head>

                <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-6">
                  {post.title}
                </h1>
                <ul className="flex items-center flex-col sm:flex-row sm:gap-3">
                  <li className="flex items-center gap-3">
                    <Image
                      src={post.author.picture}
                      className="rounded-full w-9"
                      width={36}
                      height={36}
                    />
                    {post.author.name}
                  </li>
                  <li>
                    Updated <DateFormatter dateString={post.date} />
                  </li>
                </ul>

                <div className="mt-7 md:mt-8 flex flex-col md:flex-row-reverse">
                  <div className="text-lg lg:text-xl leading-7 lg:leading-8 md:flex-grow">
                    {post.coverImage ? (
                      <div className="w-full mb-7 md:float-right md:w-64 lg:ml-7">
                        <Image
                          src={post.coverImage}
                          className="rounded w-9"
                          layout="responsive"
                          width={150}
                          height={150}
                        />
                      </div>
                    ) : null}

                    <div
                      className="space-y-7"
                      dangerouslySetInnerHTML={{__html: post.content}}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </article>
        </main>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage'
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}
