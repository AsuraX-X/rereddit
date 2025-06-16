import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryProvider } from "./Context/QueryProvider";
import App from "./App";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <QueryProvider>
        <App />
      </QueryProvider>
    </BrowserRouter>
  );
} else {
  throw new Error("Root element not found");
}
