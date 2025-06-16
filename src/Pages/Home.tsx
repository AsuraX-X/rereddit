import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useQueryContext } from "../Context/useQueryContext";
import { type ChangeEvent } from "react";
import SuggestionsList from "../Components/SuggestionsList";

const Home = () => {
  const navigate = useNavigate();

  const { query, setQuery, retrieve, filtered, suggestions, reddits, exists } =
    useQueryContext();

  const text = "Reddit";

  const parent = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div>
      <section className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-4">
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            transition={{ delay: 1 }}
            className="flex text-6xl text-[#ff4500]"
          >
            <p>Re</p>
            <motion.p
              variants={parent}
              initial="hidden"
              animate="visible"
              className="text-white"
            >
              {text.split("").map((_, i) => (
                <motion.span variants={child} key={i}>
                  {_}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-[#d2d2d2] text-2xl">
              Retrieve your favourite subreddits
            </p>
            <div className="relative">
              <div className="z-10 relative">
                <input
                  type="text"
                  placeholder="e.g jokes"
                  className="bg-white py-2 px-4 rounded-full text-base w-80 sm:w-120"
                  value={query}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      exists(query);
                      retrieve(query);
                      setQuery("");
                      navigate("/reddits");
                    }
                  }}
                />
              </div>
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height:
                    filtered.length > 0 || (suggestions.length === 0 && query)
                      ? "auto"
                      : 0,
                }}
                className="absolute overflow-hidden bg-[#181c1f] top-0 z-0 text-white px-4 w-full pt-8 rounded-b-2xl rounded-t-xl"
              >
                <SuggestionsList />
              </motion.div>
            </div>
            <div className="flex gap-2 h-15 items-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "#ffffff",
                }}
                onClick={() => {
                  exists(query);
                  retrieve(query);
                  setQuery("");
                  navigate("/reddits");
                }}
                className="bg-[#ff4500] border-3 border-[#ff4500] text-white py-2 w-35 rounded-full cursor-pointer text-xl"
              >
                Retrieve
              </motion.button>
              {reddits.length > 0 && (
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#ff4500",
                  }}
                  onClick={() => navigate("/reddits")}
                  className="bg-white border-3 border-[#ffffff] w-35 py-2 rounded-full text-xl cursor-pointer"
                >
                  My ReReddits
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
