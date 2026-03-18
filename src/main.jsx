import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </HashRouter>,
);
