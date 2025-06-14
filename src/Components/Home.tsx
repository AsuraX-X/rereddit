import { motion } from "motion/react";
import { NavLink } from "react-router";
import { QueryProvider } from "../Context/QueryContext";
import { useQueryContext } from "../Context/useQueryContext";

const Home = () => {
  const { query, setQuery, retrieve } = useQueryContext();

  const text = "Reddit";

  const parent = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const child = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
            <input
              type="text"
              placeholder="e.g jokes"
              className="bg-white py-2 px-4 rounded-full text-base w-100"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => retrieve(query)}
              className="bg-[#ff4500] text-white py-2 px-4 rounded-full cursor-pointer text-xl"
            >
              <NavLink to="/reddits">Retrieve</NavLink>
            </button>
          </div>
        </section>
      </div>
    </QueryProvider>
  );
};

export default Home;
