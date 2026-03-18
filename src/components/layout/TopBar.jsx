import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/transactions": "Transazioni",
  "/budget": "Budget",
  "/crypto": "Crypto",
};

const TopBar = ({ onMenuClick }) => {
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger solo su mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-white">
          {pageTitles[pathname] || "Dashboard"}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-sm text-gray-400 capitalize">
          {today}
        </span>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
          V
        </div>
      </div>
    </header>
  );
};

export default TopBar;
