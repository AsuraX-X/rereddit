import { createContext, useState, type ReactNode } from "react";
import type { QCI, RedditType } from "../InterfacesAndTypes";
import { useEffect } from "react";

export const QueryContext = createContext<QCI | undefined>(undefined);

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  const [filtered, setFiltered] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  const [error, setError] = useState("");

  const [reddits, setReddits] = useState<RedditType[][]>([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const res = await fetch(
        "https://www.reddit.com/subreddits/popular/.json?limit=100"
      );
      const data = await res.json();
      console.log(data);

      const results = data.data.children.map(
        (child: { data: { display_name: string } }) => child.data.display_name
      );

      setSuggestions(results);
    };

    getSuggestions();
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }
    const lowerValue = query.toLowerCase();
    const startsWith = suggestions.filter((suggestion: string) =>
      suggestion.toLowerCase().startsWith(lowerValue)
    );
    const includes = suggestions.filter(
      (suggestion: string) =>
        !suggestion.toLowerCase().startsWith(lowerValue) &&
        suggestion.toLowerCase().includes(lowerValue)
    );
    setFiltered([...startsWith, ...includes]);
  }, [query, suggestions]);

  useEffect(() => {
    console.log(filtered);
  }, [filtered]);

  const addReddit = (newReddit: RedditType[]) => {
    const newIds = newReddit.map((r) => r.id);
    const exists = reddits.some((group) =>
      group.some((r) => newIds.includes(r.id))
    );
    if (!exists) {
      setReddits((prev) => [...prev, newReddit]);
    } else setError("error2");
    const timeout = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(timeout);
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
      setError("error1");
      const timeout = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timeout);
    }
  };

  const removeReddit = (index: number) => {
    setReddits(reddits.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("reddits", JSON.stringify(reddits));
  }, [reddits]);

  useEffect(() => {
    const stored = localStorage.getItem("reddits");
    if (stored) {
      setReddits(JSON.parse(stored));
    }
  }, []);

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        suggestions,
        filtered,
        retrieve,
        error,
        reddits,
        removeReddit,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
