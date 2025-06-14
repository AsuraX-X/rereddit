import { NavLink } from "react-router";
import { useQueryContext } from "../Context/useQueryContext";

const Reddits = () => {
  const { reddits } = useQueryContext();

  return (
    <div className="h-screen">
      <header>
        <h1 className="text-white flex w-full justify-center py-2 text-3xl">
          <NavLink to="/">
            <span className="text-[#ff4500]">Re</span>Reddit
          </NavLink>
        </h1>
      </header>
      <section>
        <input type="text" />
        <button>Add Subreddit</button>
      </section>
      <section>
        <div>
          {reddits.map((R) =>
            R.map(({ id, title, author, score, num_comments, url }, i) => (
                <div key={i} className="text-white">
                    {i}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Reddits;
