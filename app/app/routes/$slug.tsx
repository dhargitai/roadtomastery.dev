import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import content from "~/utils/content.server";
import BlockContent from "@sanity/block-content-to-react";
import serializer from '~/utils/serializer';

type PostData = {
  publishedAt: Date,
  _updatedAt: Date,
  slug: string,
  title: string,
  categories: Array<{ title: string, slug: string }>
  body: string;
  excerpt: string;
};

export let loader: LoaderFunction = async ({ params }) => {
  const matchingPosts = await content.fetch("*[_type == 'post' && slug.current == $slug] {publishedAt, _updatedAt, slug, title, body, excerpt, 'categories': categories[]->{title, slug}}", {
    slug: params.slug
  });

  if (!matchingPosts || !matchingPosts.length) {
    throw new Response('Post not found', { status: 404 })
  }

  let data: PostData = matchingPosts[0];

  return json(data);
};

export let meta: MetaFunction = ({data} : { data: PostData }) => {
  return {
    title: `${data.title} | Road to Mastery`,
    description: data.excerpt,
  };
};

export default function Index() {
  let post = useLoaderData<PostData>();

  return (
    <div className="flex flex-wrap container px-5 py-12 mx-auto">
      <main className="w-full text-xl lg:w-4/5 xl:w-3/4 prose lg:pr-8 mx-auto mb-8 md:mb-0">
      <h1 className="text-4xl mb-12">{post.title}</h1>
        <BlockContent blocks={post.body} serializers={serializer} />
      </main>
    </div>
  );
}
