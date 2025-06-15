import type { RedditType } from "../InterfacesAndTypes";
import { BiUserCircle } from "react-icons/bi";
import { TbArrowBigUp } from "react-icons/tb";
import { IoChatbubbleOutline } from "react-icons/io5";
import { motion } from "motion/react";

const RedditCard = ({
  title,
  author,
  score,
  num_comments,
  url,
}: Omit<RedditType, "id" | "subreddit">) => {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 200,
      }}
      href={url}
      target="_blank"
      className="border-1 border-[#3e4142] rounded-2xl p-2 px-3 min-h-25 flex flex-col justify-between"
    >
        <p className="flex gap-x-1 items-center">
          <BiUserCircle size={20} /> {author}
        </p>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {title}
        </p>
        <div className="flex gap-4 text-xs items-center">
          <p className="flex items-center gap-0.5">
            <TbArrowBigUp />
            {score}
          </p>
          <p className="flex items-center gap-0.5">
            <IoChatbubbleOutline />
            {num_comments}
          </p>
        </div>
    </motion.a>
  );
};

export default RedditCard;
