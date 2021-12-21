import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import content from "~/utils/content.server";
import PostExcerpt from '~/components/post-excerpt'
import type { Category, Post } from '~/types';

type CategoryPageData = {
  posts: Array<Post>;
  category: Category;
};

export let loader: LoaderFunction = async ({ params }) => {
  const posts = await content.fetch("*[_type == 'post' && count((categories[]->slug.current)[@ == $slug]) > 0] | order(dateTime(publishedAt) desc) {publishedAt, _updatedAt, slug, title, excerpt, 'categories': categories[]->{title, slug}}", {
    slug: params.slug
  });
  const categories = await content.fetch("*[_type == 'category' && slug.current == $slug]{title, slug}", {
    slug: params.slug
  });
  

  let data: CategoryPageData = {
    posts,
    category: categories[0]
  };

  return json(data);
};

export let meta: MetaFunction = ({data} : { data: CategoryPageData }) => {
  return {
    title: `${data.category.title} category posts | Road to Mastery`,
    description: `Collection of posts in "${data.category.title}" category.`,
  };
};

export default function Index() {
  let data = useLoaderData<CategoryPageData>();

  return (
    <div className="flex flex-wrap container px-5 py-12 mx-auto">
      <main className="w-full lg:pr-8 mb-8 md:mb-0">
        <h1 className="text-4xl mb-12">Posts in <em className="text-orange-500">{data.category.title}</em> category</h1>

        <section className="text-gray-600 body-font overflow-hidden">
          <div className="">
            <div className="-my-8 divide-y-2 divide-gray-100">

            {data.posts.map(post => (
              <PostExcerpt post={post} key={post.slug.current} />
            ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
