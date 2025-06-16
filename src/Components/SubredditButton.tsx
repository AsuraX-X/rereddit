import { IoIosCloseCircleOutline } from "react-icons/io";
import { useQueryContext } from "../Context/useQueryContext";
import { motion } from "motion/react";

const SubredditButton = ({
  subreddit,
  i,
}: {
  subreddit: string;
  i: number;
}) => {
  const { removeReddit } = useQueryContext();

  return (
    <motion.a
      whileHover={{
        scale: 1.02,
      }}
      href={`#${subreddit}`}
      className="flex min-w-35 w-35 gap-2 py-2 justify-center items-center rounded-full border-3 border-[#ff4500] bg-white px-4"
    >
      <p className="overflow-hidden overflow-ellipsis">r/{subreddit}</p>
      <button className="cursor-pointer" onClick={() => removeReddit(i)}>
        <IoIosCloseCircleOutline size={22} />
      </button>
    </motion.a>
  );
};

export default SubredditButton;
