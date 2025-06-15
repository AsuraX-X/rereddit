import { NavLink } from "react-router";
import { useQueryContext } from "../Context/useQueryContext";
import { BiPlus, BiTrash } from "react-icons/bi";
import RedditCard from "../Components/RedditCard";

const Reddits = () => {
  const { query, setQuery, retrieve, reddits, removeReddit } =
    useQueryContext();

  return (
    <div className="h-screen px-8 flex flex-col justify-between overflow-y-hidden">
      <header>
        <h1 className="text-white flex w-full justify-center py-2 text-3xl">
          <NavLink to="/">
            <span className="text-[#ff4500]">Re</span>Reddit
          </NavLink>
        </h1>
      </header>
      <section className="flex gap-2 h-10">
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
          className="bg-white py-2 px-4 rounded-full"
          placeholder="Add subreddit"
        />
        <button
          onClick={() => {
            retrieve(query);
            setQuery("");
          }}
          className="bg-[#ff4500] size-10 flex justify-center items-center rounded-full"
        >
          <BiPlus color="#ffffff" size={30} />
        </button>
      </section>
      <section className="text-white h-[80%] overflow-x-auto">
        <div className="h-9/10 flex">
          {reddits.map((R, i) => (
            <div className="h-full min-w-1/4 w-full" key={i}>
              <div className="">
                <h1>r/{R[0].subreddit}</h1>
                <button onClick={() => removeReddit(i)}>
                  <BiTrash />
                </button>
              </div>
              <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col gap-2">
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
