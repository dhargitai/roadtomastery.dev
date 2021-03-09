import Container from '@components/container'
import Layout from '@components/layout'
import Head from 'next/head'
import Image from 'next/image'
import DateFormatter from '@components/date-formatter'
import {useRouter} from 'next/router'

export default function BlogLayout({frontMatter, children, preview}) {
  const router = useRouter()

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
                  <title>{frontMatter.title} | roadToMastery</title>
                  {frontMatter.ogImage && frontMatter.ogImage.url ? (
                    <meta
                      property="og:image"
                      content={frontMatter.ogImage.url}
                    />
                  ) : null}
                </Head>

                <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-6 leading-10">
                  {frontMatter.title}
                </h1>
                <ul className="flex items-center flex-col sm:flex-row sm:gap-3">
                  <li className="flex items-center gap-3">
                    <Image
                      src={frontMatter.author.picture}
                      className="rounded-full w-9"
                      width={36}
                      height={36}
                    />
                    {frontMatter.author.name}
                  </li>
                  <li>
                    Updated <DateFormatter dateString={frontMatter.date} />
                  </li>
                </ul>

                <div className="mt-7 md:mt-8 flex flex-col md:flex-row-reverse">
                  <div className="text-lg lg:text-xl leading-7 lg:leading-8 md:flex-grow">
                    {frontMatter.coverImage ? (
                      <div className="w-full mb-7 md:float-right md:w-64 lg:ml-7">
                        <Image
                          src={frontMatter.coverImage}
                          className="rounded w-9"
                          layout="responsive"
                          width={150}
                          height={150}
                        />
                      </div>
                    ) : null}

                    <div className="space-y-7 prose-xl">{children}</div>
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
