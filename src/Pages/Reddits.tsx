import { NavLink } from "react-router";
import { useQueryContext } from "../Context/useQueryContext";
import { BiChevronLeft, BiChevronRight, BiPlus } from "react-icons/bi";
import { motion } from "motion/react";
import SubredditButton from "../Components/SubredditButton";
import SubredditCard from "../Components/SubredditCard";
import SuggestionsList from "../Components/SuggestionsList";
import { useState } from "react";

const Reddits = () => {
  const { query, setQuery, retrieve, exists, loading, setLoading, reddits } =
    useQueryContext();

  const [x, setX] = useState(0);

  const [index, setIndex] = useState(0);

  return (
    <div className="h-screen flex flex-col justify-between overflow-y-hidden">
      <header>
        <h1 className="text-white flex justify-center py-2 text-3xl">
          <NavLink to="/">
            <span className="text-[#ff4500]">Re</span>Reddit
          </NavLink>
        </h1>
      </header>
      <section
        className="w-full flex flex-col sm:flex-row gap-4 sm:gap-0 sm:divide-x-1 sm:divide-[#3e4142]
       sm:pl-8 pr-8 mb-5 items-center"
      >
        <div className="flex gap-2 justify-center items-center sm:w-auto sm:pr-12 w-full ml-8 sm:m-0 ">
          <div className="relative">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  exists(query);
                  setLoading("loading1");
                  retrieve(query);
                  setQuery("");
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className="bg-white py-2 px-4 rounded-full relative z-10"
              placeholder="Add subreddit"
            />
            <SuggestionsList />
          </div>
          <motion.button
            whileHover={{ borderColor: "#ffffff" }}
            animate={
              loading === "loading1"
                ? {
                    backgroundColor: "#0e1113",
                    color: "#0e1113",
                    borderColor: "#ff4500",
                    borderRightColor: "#0e1113",
                    rotate: 360,
                    pointerEvents: "none",
                    transition: {
                      rotate: {
                        repeat: Infinity,
                        ease: "linear",
                        duration: 1,
                      },
                    },
                  }
                : {}
            }
            onClick={() => {
              exists(query);
              if (query) setLoading("loading1");
              retrieve(query);
              setQuery("");
            }}
            className="border-3 border-[#ff4500] text-white cursor-pointer bg-[#ff4500] size-10 flex justify-center items-center rounded-full"
          >
            <BiPlus size={30} />
          </motion.button>
        </div>
        <div className="flex justify-between w-full pl-4 z-0">
          <div
            onClick={() => {
              if (index > 0) {
                setX(x + 146);
                setIndex(index - 1);
              }
            }}
            className="flex justify-center cursor-pointer items-center"
          >
            <BiChevronLeft color="#ffffff" size={40} />
          </div>
          <div className="flex overflow-hidden w-full relative h-12 max-w-255">
            <motion.div
              animate={{ x: `${x}px` }}
              className="flex gap-1.5 absolute items-center justify-center top-0 bottom-0"
            >
              {reddits.map((R, i) => (
                <SubredditButton key={i} i={i} subreddit={R[0].subreddit} />
              ))}
            </motion.div>
          </div>
          <div className="flex justify-center cursor-pointer items-center">
            <BiChevronRight
              onClick={() => {
                if (index < reddits.length - 1) {
                  setX(x - 146);
                  setIndex(index + 1);
                }
              }}
              className="flex justify-center cursor-pointer items-center"
              color="#ffffff"
              size={40}
            />
          </div>
        </div>
      </section>
      <section className="text-white h-[80%] overflow-x-auto">
        <div className="h-9/10 flex">
          {reddits.map((R, i) => (
            <SubredditCard reddit={R} i={i} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reddits;
