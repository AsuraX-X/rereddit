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

  const retrieve = async (query: string) => {
    try {
      const res = await fetch(`https://www.reddit.com/r/${query}.json`);
      const data = await res.json();
      const results = data.data.children.map(
        ({
          data,
        }: {
          data: {
            id: string;
            title: string;
            author: string;
            score: number;
            num_comments: number;
            url: string;
          };
        }) => ({
          id: data.id,
          title: data.title,
          author: data.author,
          score: data.score,
          num_comments: data.num_comments,
          url: data.url,
        })
      );

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
    <QueryContext.Provider value={{ query, setQuery, reddits, retrieve }}>
      {children}
    </QueryContext.Provider>
  );
};
