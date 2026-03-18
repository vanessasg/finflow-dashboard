import { NavLink } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faArrowRightArrowLeft,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: faChartPie },
  { path: "/transactions", label: "Transazioni", icon: faArrowRightArrowLeft },
  { path: "/budget", label: "Budget", icon: faWallet },
  { path: "/crypto", label: "Crypto", icon: faBitcoin },
];

const Sidebar = () => {
  const { companyInfo } = useFinance();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">{companyInfo.name}</h1>
        <p className="text-xs text-gray-400 mt-1">Finance Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          © {companyInfo.fiscalYear} {companyInfo.name}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
