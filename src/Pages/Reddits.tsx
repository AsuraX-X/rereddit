import { NavLink } from "react-router";
import { useQueryContext } from "../Context/useQueryContext";
import { BiPlus, BiTrash } from "react-icons/bi";
import RedditCard from "../Components/RedditCard";
import { motion } from "motion/react";
import Error1 from "../Components/Error1";
import Error2 from "../Components/Error2";

const Reddits = () => {
  const {
    query,
    setQuery,
    retrieve,
    reddits,
    removeReddit,
    error,
    filtered,
    suggestions,
  } = useQueryContext();

  return (
    <div className="h-screen flex flex-col justify-between overflow-y-hidden">
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: error ? 10 : -60 }}
        className="absolute left-0 right-0 flex justify-center items-center"
      >
        {error === "error1" ? <Error1 /> : <Error2 />}
      </motion.div>
      <header>
        <h1 className="text-white flex w-full justify-center py-2 text-3xl">
          <NavLink to="/">
            <span className="text-[#ff4500]">Re</span>Reddit
          </NavLink>
        </h1>
      </header>
      <section className="flex gap-2 h-10 px-8">
        <div className="relative">
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                retrieve(query);
                setQuery("");
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="bg-white py-2 px-4 rounded-full relative z-10"
            placeholder="Add subreddit"
          />
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: filtered.length > 0 ? "auto" : 0 }}
            className="absolute overflow-hidden bg-[#181c1f] top-0 z-0 text-white px-4 w-full pt-8 rounded-b-2xl rounded-t-xl"
          >
            <ul className="py-4 divide-[#3e4142] divide-y-1">
              {filtered.length > 0
                ? filtered.map(
                    (_, i) =>
                      i < 5 &&
                      _ !== query && (
                        <li
                          onClick={() => {
                            retrieve(_);
                            setQuery("");
                          }}
                          className=" p-4 cursor-pointer"
                          key={i}
                        >
                          {_}
                        </li>
                      )
                  )
                : suggestions.length === 0 && <p className="p-4">Loading</p>}
            </ul>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ border: "solid 0.2rem #ffffff" }}
          onClick={() => {
            retrieve(query);
            setQuery("");
          }}
          className="cursor-pointer bg-[#ff4500] size-10 flex justify-center items-center rounded-full"
        >
          <BiPlus color="#ffffff" size={30} />
        </motion.button>
      </section>
      <section className="text-white h-[80%] overflow-x-auto">
        <div className="h-9/10 flex">
          {reddits.map((R, i) => (
            <div className="h-full min-w-1/4 w-full" key={i}>
              <div className="px-8 flex justify-between items-center">
                <a
                  href={`https://www.reddit.com/r/${R[0].subreddit}`}
                  target="_blank"
                >
                  r/{R[0].subreddit}
                </a>
                <motion.button
                  className="rounded-full size-8 flex justify-center items-center cursor-pointer"
                  whileHover={{ backgroundColor: "#ff4500" }}
                  onClick={() => removeReddit(i)}
                >
                  <BiTrash size={20} viewBox="1 0 24 24" />
                </motion.button>
              </div>
              <div className="pl-8 p-6 h-full overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                {R.map(({ id, title, author, score, num_comments, url }) => (
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reddits;
