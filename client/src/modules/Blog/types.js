export type Author = {
  name: string,
  imageId: string,
};

export type Post = {
  title: string,
  subtitle: string,
  author: Author,
  clapCount: number,
  imageId: string,
};

export type Props = {
  row?: string,
  column?: string,
  sortBy: string, // trending or latest
  maxPosts: number,
};

export type State = {
  posts: Post[],
};
