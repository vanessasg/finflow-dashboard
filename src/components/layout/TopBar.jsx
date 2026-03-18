import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/transactions": "Transazioni",
  "/budget": "Budget",
  "/crypto": "Crypto",
};

const TopBar = () => {
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-white">
        {pageTitles[pathname] || "Dashboard"}
      </h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 capitalize">{today}</span>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
          V
        </div>
      </div>
    </header>
  );
};

export default TopBar;