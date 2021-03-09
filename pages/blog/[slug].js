import {useRouter} from 'next/router'
import ErrorPage from 'next/error'

import hydrate from 'next-mdx-remote/hydrate'

import {getFiles, getFileBySlug} from '@lib/mdx'
import BlogLayout from '@layouts/blog'
import MDXComponents from '@components/MDXComponents'

export default function Blog({mdxSource, frontMatter}) {
  const router = useRouter()
  if (!router.isFallback && !frontMatter.slug) {
    return <ErrorPage statusCode={404} />
  }

  const content = hydrate(mdxSource, {
    components: MDXComponents
  })

  return <BlogLayout frontMatter={frontMatter}>{content}</BlogLayout>
}

export async function getStaticProps({params}) {
  const post = await getFileBySlug('blog', params.slug)

  return {props: post}
}

export async function getStaticPaths() {
  const posts = await getFiles('blog')

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  }
}
