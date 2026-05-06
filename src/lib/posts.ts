export type PostFrontmatter = {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified?: string;
  category: string;
  readTime: string;
  tags: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

export type Post = PostFrontmatter & {
  Content: MarkdownComponent;
  url: string;
};

type MarkdownComponent = (props: Record<string, unknown>) => unknown;

type MarkdownModule = {
  frontmatter: PostFrontmatter;
  Content?: MarkdownComponent;
  default?: MarkdownComponent;
};

const modules = import.meta.glob<MarkdownModule>('../content/blog/*.md', {
  eager: true
});

export const posts: Post[] = Object.entries(modules)
  .map(([file, module]) => {
    const Content = module.Content ?? module.default;
    if (!Content) throw new Error(`Missing Markdown component for ${file}`);

    return {
      ...module.frontmatter,
      Content,
      url: `/blog/${module.frontmatter.slug}.html`
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const featuredPosts = posts.slice(0, 3);

export const postBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getRelatedPosts(post: Post, count = 3) {
  const tagSet = new Set(post.tags);

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const tagScore = candidate.tags.filter((tag) => tagSet.has(tag)).length;
      const categoryScore = candidate.category === post.category ? 2 : 0;
      return { post: candidate, score: tagScore + categoryScore };
    })
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, count)
    .map((entry) => entry.post);
}

export function formatMonth(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));
}
