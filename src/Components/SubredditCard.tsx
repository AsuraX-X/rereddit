import type { RedditType } from "../InterfacesAndTypes";
import { motion } from "motion/react";
import { useQueryContext } from "../Context/useQueryContext";
import { TfiReload } from "react-icons/tfi";
import RedditCard from "./RedditCard";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";

const SubredditCard = ({ reddit, i }: { reddit: RedditType[]; i: number }) => {
  const [refresh, setRefresh] = useState(false);
  const { setLoading, retrieve, loading, removeReddit } = useQueryContext();

  return (
    <div className="h-full sm:min-w-94 w-full" id={`${reddit[0].subreddit}`}>
      <div className="px-8 flex justify-between items-center">
        <a
          href={`https://www.reddit.com/r/${reddit[0].subreddit}`}
          target="_blank"
        >
          r/{reddit[0].subreddit}
        </a>
        <div className="flex gap-1">
          <motion.button
            whileHover={{ backgroundColor: "#202020" }}
            className="size-8 rounded-full cursor-pointer flex justify-center items-center"
            onClick={() => {
              setRefresh(true);
              setLoading("loading2");
              retrieve(reddit[0].subreddit);
            }}
            animate={
              loading === "loading2" && refresh
                ? {
                    rotate: 360,
                    pointerEvents: "none",
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        duration: 1,
                      },
                    },
                  }
                : {}
            }
          >
            <TfiReload size={18} />
          </motion.button>
          <motion.button
            className="rounded-full size-8 flex justify-center items-center cursor-pointer"
            whileHover={{ backgroundColor: "#ff4500" }}
            onClick={() => removeReddit(i)}
          >
            <BiTrash size={20} />
          </motion.button>
        </div>
      </div>
      <div className="pl-8 p-6 h-full overflow-y-auto overflow-x-hidden flex flex-col gap-2">
        {reddit.map(({ id, title, author, score, num_comments, url }) => (
          <RedditCard
            key={id}
            title={title}
            author={author}
            score={score}
            num_comments={num_comments}
            url={url}
          />
        ))}
      </div>
    </div>
  );
};

export default SubredditCard;
