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
  exists: (query: string) => void;
  reddits: RedditType[][];
  retrieve: (query: string) => void;
  loading: string;
  setLoading: (type: string) => void;
  removeReddit: (index: number) => void;
  filtered: string[];
  suggestions: string[];
}
