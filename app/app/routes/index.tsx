import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import content from "~/utils/content.server";
import PostExcerpt from '~/components/post-excerpt'

type IndexData = {
  posts: Array<any>;
  categories: Array<any>;
};

export let loader: LoaderFunction = async () => {
  const posts = await content.fetch("*[_type == 'post'] | order(dateTime(publishedAt) desc) {publishedAt, _updatedAt, slug, title, excerpt, 'categories': categories[]->{title, slug}}");
  const categories = await content.fetch("*[_type == 'category'] | order(title asc) {slug, title}");

  let data: IndexData = {
    posts,
    categories
  };

  return json(data);
};

export let meta: MetaFunction = () => {
  return {
    title: "Road to Mastery development blog",
    description: "Learnings, thoughts and other materials on the journey of web development",
  };
};

export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="flex flex-wrap container px-5 py-12 mx-auto">
      <main className="w-full lg:w-4/5 lg:pr-8 mb-8 md:mb-0">
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

      <aside className='w-full lg:w-1/5'>
        <h2 className='text-2xl font-bold mb-4'>Categories</h2>
        <ul>
          {data.categories.map(category => 
            <li key={category.slug.current} className='text-xl py-1'>
              <Link to={`/category/${category.slug.current}`}
                className='text-indigo-500 hover:text-black transition-all duration-300'>{category.title}</Link>
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
}
