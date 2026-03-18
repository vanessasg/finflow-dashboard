import { NavLink } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faArrowRightArrowLeft,
  faWallet,
  faXmark,
  faCaretLeft,
  faCaretRight,

} from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: faChartPie },
  { path: "/transactions", label: "Transazioni", icon: faArrowRightArrowLeft },
  { path: "/budget", label: "Budget", icon: faWallet },
  { path: "/crypto", label: "Crypto", icon: faBitcoin },
];

const Sidebar = ({ isOpen, onClose, onToggle }) => {
  const { companyInfo } = useFinance();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 bg-gray-900 border-r border-gray-800 flex flex-col
        transition-all duration-300 ease-in-out
        w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"}
      `}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between min-h-16 overflow-hidden">
        {isOpen && (
          <div className="overflow-hidden whitespace-nowrap">
            <h1 className="text-lg font-bold text-white truncate">
              {companyInfo.name}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Finance Dashboard</p>
          </div>
        )}
        {/* Toggle desktop */}
        <button
          onClick={onToggle}
          className={`hidden md:flex text-gray-400 hover:text-white transition-colors ${isOpen ? "ml-auto": "mx-auto"}`}
        >
          <FontAwesomeIcon
            icon={isOpen ? faCaretLeft : faCaretRight}
            className="!w-5 !h-5"
          />
        </button>

        {/* Chiudi mobile — solo se aperta */}
        {isOpen && (
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white transition-colors ml-auto"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1 overflow-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors overflow-hidden ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4 h-4 shrink-0" />
            {isOpen && (
              <span className="whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-800 overflow-hidden">
          <p className="text-xs text-gray-500 text-center whitespace-nowrap">
            © {companyInfo.fiscalYear} {companyInfo.name}
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
