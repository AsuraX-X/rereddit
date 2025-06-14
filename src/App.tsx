import { Routes, Route } from "react-router";
import Home from "./Components/Home";
import Reddits from "./Components/Reddits";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reddits" element={<Reddits />} />
    </Routes>
  );
}

export default App;
