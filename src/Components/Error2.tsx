import { MdOutlineErrorOutline } from "react-icons/md";

const Error2 = () => {
  return (
    <div className="border-[#ff4500] bg-[#0e1113] border-4 rounded-md py-2 px-4 flex justify-center items-center gap-2">
      <MdOutlineErrorOutline color="#ef6464" />
      <p className="text-white">Subreddit already added</p>
    </div>
  );
};

export default Error2;
