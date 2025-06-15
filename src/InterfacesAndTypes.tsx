export type RedditType = {
  id: string;
  subreddit: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  url: string;
};

export interface QCI {
  query: string;
  setQuery: (newQuery: string) => void;
  error: string;
  reddits: RedditType[][];
  retrieve: (query: string) => void;
  removeReddit: (index: number) => void;
  filtered: string[];
  suggestions: string[];
}
