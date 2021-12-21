import { Link } from 'remix';
import type { Post } from '~/types';

export default ({ post }: { post: Post }) => <div className="py-8 flex flex-wrap md:flex-nowrap">
<div className="md:w-44 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
  <Link to={`/category/${post.categories[0].slug.current}`} className="font-semibold title-font text-gray-700">{post.categories[0].title}</Link>
  <span className="mt-1 text-gray-500 text-sm">{new Date(post.publishedAt).toDateString()}</span>
</div>
<div className="md:flex-grow">
  <h2 className="text-3xl font-medium text-gray-900 hover:text-indigo-500 title-font mb-2  transition-all duration-300">
    <Link to={`/${post.slug.current}`}>{post.title}</Link>
  </h2>
  <p className="leading-relaxed text-xl">{post.excerpt}</p>
  <Link to={`/${post.slug.current}`} className="text-indigo-500 hover:text-black inline-flex items-center mt-4  transition-all duration-300">
    Read More &rarr;
  </Link>
</div>
</div>
