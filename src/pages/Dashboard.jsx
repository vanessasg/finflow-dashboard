import { useFinance } from "../context/FinanceContext";
import KpiCard from "../components/ui/KpiCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatCurrency = (value) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    value,
  );

const Dashboard = () => {
  const { kpiData, monthlyData, transactions, companyInfo } = useFinance();

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Ricavi Totali"
          value={formatCurrency(kpiData.totalRevenue)}
          trend={8.2}
          trendLabel="vs anno scorso"
          color="indigo"
        />
        <KpiCard
          title="Spese Totali"
          value={formatCurrency(kpiData.totalExpenses)}
          trend={3.1}
          trendLabel="vs anno scorso"
          color="red"
        />
        <KpiCard
          title="Utile Netto"
          value={formatCurrency(kpiData.netProfit)}
          trend={12.5}
          trendLabel="vs anno scorso"
          color="green"
        />
        <KpiCard
          title="Cash Flow"
          value={formatCurrency(kpiData.cashFlow)}
          trend={5.7}
          trendLabel="vs anno scorso"
          color="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Line Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Andamento Annuale
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}k`}
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
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                name="Ricavi"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={false}
                name="Spese"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Ricavi vs Spese per Mese
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickFormatter={(v) => `${v / 1000}k`}
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
                dataKey="revenue"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                name="Ricavi"
              />
              <Bar
                dataKey="expenses"
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
                name="Spese"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">
          Transazioni Recenti
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-800">
              <th className="text-left pb-3 ps-3 font-medium">Data</th>
              <th className="text-left pb-3 font-medium">Descrizione</th>
              <th className="text-left pb-3 font-medium">Categoria</th>
              <th className="text-right pb-3 pe-3 font-medium">Importo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {recentTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="py-3 ps-3 text-gray-400">{t.date}</td>
                <td className="py-3 text-white">{t.description}</td>
                <td className="py-3 text-gray-400">{t.category}</td>
                <td
                  className={`py-3 text-right pe-3 font-medium ${t.amount >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
