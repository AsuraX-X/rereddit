import { motion } from "motion/react";
import { useQueryContext } from "../Context/useQueryContext";
import { useNavigate } from "react-router";

const SuggestionsList = ({ home = false }: { home?: boolean }) => {
  const {
    setLoading,
    retrieve,
    setQuery,
    exists,
    filtered,
    suggestions,
    query,
  } = useQueryContext();

  const nav = useNavigate();

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height:
          filtered.length > 0 || (suggestions.length === 0 && query)
            ? "auto"
            : 0,
      }}
      className="absolute overflow-hidden bg-[#181c1f] top-0 z-1 text-white px-4 w-full pt-8 rounded-b-2xl rounded-t-4xl"
    >
      <ul className="py-4 divide-[#3e4142] divide-y-1">
        {filtered.length > 0
          ? filtered.map(
              (_, i) =>
                i < 5 &&
                _ !== query && (
                  <li
                    key={i}
                    onClick={() => {
                      if (home) nav("/reddits");
                      exists(_);
                      setLoading("loading1");
                      retrieve(_);
                      setQuery("");
                    }}
                    className=" p-4 cursor-pointer"
                  >
                    {_}
                  </li>
                )
            )
          : suggestions.length === 0 && <p className="">Loading</p>}
      </ul>
    </motion.div>
  );
};

export default SuggestionsList;
