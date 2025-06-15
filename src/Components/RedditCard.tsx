import type { RedditType } from "../InterfacesAndTypes";
import { BiUserCircle } from "react-icons/bi";
import { TbArrowBigUp } from "react-icons/tb";
import { IoChatbubbleOutline } from "react-icons/io5";

const RedditCard = ({
  title,
  author,
  score,
  num_comments,
  url,
}: Omit<RedditType, "id" | "subreddit">) => {
  return (
    <a href={url} target="_blank">
      <div className="border-1 border-[#3e4142] rounded-2xl p-2">
        <p className="flex gap-1 items-center">
          <BiUserCircle /> {author}
        </p>
        <p>{title}</p>
        <div className="flex gap-4">
          <p className="flex items-center">
            <TbArrowBigUp />
            {score}
          </p>
          <p className="flex items-center">
            <IoChatbubbleOutline />
            {num_comments}
          </p>
        </div>
      </div>
    </a>
  );
};

export default RedditCard;
