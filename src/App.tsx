import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Reddits from "./Pages/Reddits";
import { useQueryContext } from "./Context/useQueryContext";
import Error1 from "./Components/Error1";
import Error2 from "./Components/Error2";
import { motion } from "motion/react";

function App() {
  const { error } = useQueryContext();

  return (
    <>
      <motion.div
        initial={{ y: -60 }}
        animate={{ y: error ? 10 : -60 }}
        className="absolute left-0 right-0 flex justify-center items-center z-100"
      >
        {error === "error1" ? <Error1 /> : <Error2 />}
      </motion.div>{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reddits" element={<Reddits />} />
      </Routes>
    </>
  );
}

export default App;
