export type Slug = {
  current: string
}

export type Category = {
  title: string
  slug: Slug
}

export type Post = {
  publishedAt: string
  _updatedAt: string
  slug: Slug
  title: string
  excerpt: string
  categories: Array<Category>
};
