import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { QueryProvider } from "../Context/QueryContext";
import { useQueryContext } from "../Context/useQueryContext";
import { type ChangeEvent } from "react";

const Home = () => {
  const navigate = useNavigate();

  const { query, setQuery, retrieve, filtered, suggestions } =
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
    <QueryProvider>
      <div>
        <section className="h-screen flex justify-center items-center">
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="flex text-6xl text-[#ff4500]">
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
            </div>
            <p className="text-[#d2d2d2] text-2xl">
              Retrieve your favourite subreddits
            </p>
            <div className="relative">
              <div className="z-10 relative">
                <input
                  type="text"
                  placeholder="e.g jokes"
                  className="bg-white py-2 px-4 rounded-full text-base w-100"
                  value={query}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      retrieve(query);
                      setQuery("");
                      navigate("/reddits");
                    }
                  }}
                />
              </div>
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
                                navigate("/reddits");
                              }}
                              className=" p-4 cursor-pointer"
                              key={i}
                            >
                              {_}
                            </li>
                          )
                      )
                    : suggestions.length === 0 && (
                        <p className="p-4">Loading</p>
                      )}
                </ul>
              </motion.div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                retrieve(query);
                setQuery("");
                navigate("/reddits");
              }}
              className="bg-[#ff4500] text-white py-2 px-4 rounded-full cursor-pointer text-xl"
            >
              Retrieve
            </motion.button>
          </div>
        </section>
      </div>
    </QueryProvider>
  );
};

export default Home;
