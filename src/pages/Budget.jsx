// src/pages/Budget.jsx

import { useFinance } from "../context/FinanceContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const formatCurrency = (value) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    value,
  );

const COLORS = [
  "#6366f1",
  "#f43f5e",
  "#10b981",
  "#f59e0b",
  "#3b82f6",
  "#8b5cf6",
];

const Budget = () => {
  const { budgetCategories } = useFinance();

  const totalAllocated = budgetCategories.reduce(
    (sum, b) => sum + b.allocated,
    0,
  );
  const totalSpent = budgetCategories.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-indigo-600/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Budget Totale</p>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(totalAllocated)}
          </p>
        </div>
        <div className="bg-gray-900 border border-red-600/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Speso</p>
          <p className="text-2xl font-bold text-red-400">
            {formatCurrency(totalSpent)}
          </p>
        </div>
        <div className="bg-gray-900 border border-green-600/20 rounded-xl p-5">
          <p className="text-sm text-gray-400 mb-1">Rimanente</p>
          <p className="text-2xl font-bold text-green-400">
            {formatCurrency(totalRemaining)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Distribuzione Budget
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={budgetCategories}
                dataKey="allocated"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category, percent }) =>
                  `${category} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {budgetCategories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                formatter={(value) => formatCurrency(value)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart allocato vs speso */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Allocato vs Speso per Categoria
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={budgetCategories} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis
                type="number"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Legend />
              <Bar
                dataKey="allocated"
                fill="#6366f1"
                radius={[0, 4, 4, 0]}
                name="Allocato"
              />
              <Bar
                dataKey="spent"
                fill="#f43f5e"
                radius={[0, 4, 4, 0]}
                name="Speso"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress bars */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-5">
          Utilizzo Budget per Categoria
        </h3>
        <div className="space-y-5">
          {budgetCategories.map((b, index) => {
            const percentage = Math.round((b.spent / b.allocated) * 100);
            const isOver = percentage > 90;
            return (
              <div key={b.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white font-medium">{b.category}</span>
                  <span className="text-gray-400">
                    {formatCurrency(b.spent)} / {formatCurrency(b.allocated)}
                    <span
                      className={`ml-2 font-semibold ${isOver ? "text-red-400" : "text-green-400"}`}
                    >
                      {percentage}%
                    </span>
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${isOver ? "bg-red-500" : "bg-indigo-500"}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Budget;
