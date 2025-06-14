export type RedditType = {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  url: string;
};

export interface QCI {
  query: string;
  setQuery: (newQuery: string) => void;
  reddits: RedditType[][];
  retrieve: (query: string) => void;
}
