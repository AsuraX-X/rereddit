import { useEffect, useState, type ReactNode } from "react";
import type { RedditType } from "../InterfacesAndTypes";
import { QueryContext } from "./QueryContext";

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");

  const [filtered, setFiltered] = useState([]);

  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState("");

  const [error, setError] = useState("");

  const [added, setAdded] = useState(false);

  const [reddits, setReddits] = useState<RedditType[][]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("reddits");
    if (stored) {
      setReddits(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (reddits.length > 0) {
      localStorage.setItem("reddits", JSON.stringify(reddits));
    }
  }, [reddits]);

  useEffect(() => {
    const getSuggestions = async () => {
      const res = await fetch(
        "https://www.reddit.com/subreddits/popular/.json?limit=100"
      );
      const data = await res.json();

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

  const addReddit = (newReddit: RedditType[]) => {
    const newIds = newReddit.map((r) => r.id);
    const existingIndex = reddits.findIndex((group) =>
      group.some((r) => newIds.includes(r.id))
    );
    if (existingIndex !== -1) {
      setReddits((prev) =>
        prev.map((group, idx) => (idx === existingIndex ? newReddit : group))
      );
    } else {
      setReddits((prev) => [...prev, newReddit]);
      setAdded(true);
    }
  };

  const retrieve = async (query: string) => {
    if (query) {
      try {
        const res = await fetch(`https://www.reddit.com/r/${query}.json`);
        const data = await res.json();

        const result = data.data.children.map(
          (child: { data: RedditType }) => ({
            id: child.data.id,
            subreddit: child.data.subreddit,
            title: child.data.title,
            author: child.data.author,
            score: child.data.score,
            num_comments: child.data.num_comments,
            url: child.data.url,
          })
        );
        addReddit(result);
        setLoading("");
      } catch (error) {
        console.error(error);
        setError("error1");
        const timeout = setTimeout(() => setError(""), 2000);
        return () => clearTimeout(timeout);
      }
    }
  };

  const exists = (query: string) => {
    const check = reddits.some(
      (redditGroup) =>
        redditGroup[0]?.subreddit?.toLowerCase() === query.toLowerCase()
    );

    if (check) {
      setError("error2");
      const timeout = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timeout);
    }
  };

  useEffect(() => {
    if (error) setLoading("");
  }, [error]);

  useEffect(() => {
    if (added) {
      const target = document.getElementById(
        reddits[reddits.length - 1][0].subreddit
      );
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setAdded(!added);
    }
  }, [reddits, added]);

  const removeReddit = (index: number) => {
    if (reddits.length === 1) localStorage.clear();
    setReddits(reddits.filter((_, i) => i !== index));
  };

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery,
        suggestions,
        filtered,
        retrieve,
        loading,
        setLoading,
        error,
        exists,
        reddits,
        removeReddit,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
