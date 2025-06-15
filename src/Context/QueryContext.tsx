import { createContext, useState, type ReactNode } from "react";
import type { QCI, RedditType } from "../InterfacesAndTypes";
import { useEffect } from "react";

export const QueryContext = createContext<QCI | undefined>(undefined);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  const [reddits, setReddits] = useState<RedditType[][]>([]);

  const addReddit = (newReddit: RedditType[]) => {
    setReddits((prev) => [...prev, newReddit]);
  };

  const removeReddit = (index: number) => {
    setReddits(reddits.filter((_, i) => i !== index));
  };

  const retrieve = async (query: string) => {
    try {
      const res = await fetch(`https://www.reddit.com/r/${query}.json`);
      const data = await res.json();
      console.log(data);

      const results = data.data.children.map((child: { data: RedditType }) => ({
        id: child.data.id,
        subreddit: child.data.subreddit,
        title: child.data.title,
        author: child.data.author,
        score: child.data.score,
        num_comments: child.data.num_comments,
        url: child.data.url,
      }));

      addReddit(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("reddits");
    if (stored) {
      setReddits(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    console.log(reddits);
    localStorage.setItem("reddits", JSON.stringify(reddits));
  }, [reddits]);

  return (
    <QueryContext.Provider
      value={{ query, setQuery, reddits, retrieve, removeReddit }}
    >
      {children}
    </QueryContext.Provider>
  );
};
