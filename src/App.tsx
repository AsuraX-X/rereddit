import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Reddits from "./Pages/Reddits";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reddits" element={<Reddits />} />
    </Routes>
  );
}

export default App;
