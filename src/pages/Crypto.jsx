// src/pages/Crypto.jsx

import useCrypto from "../hooks/useCrypto";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatCurrency = (value) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);

const formatLarge = (value) => {
  if (value >= 1_000_000_000) return `€${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `€${(value / 1_000_000).toFixed(1)}M`;
  return formatCurrency(value);
};

const Crypto = () => {
  const { coins, loading, error, lastUpdated, refetch } = useCrypto();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">
          Caricamento dati crypto...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-400 text-sm">{error}</p>
        <button
          onClick={refetch}
          className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Riprova
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Prezzi in tempo reale · aggiornato alle{" "}
          {lastUpdated?.toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <button
          onClick={refetch}
          className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors"
        >
          ↻ Aggiorna
        </button>
      </div>

      {/* Coin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {coins.map((coin) => {
          const isPositive = coin.price_change_percentage_24h >= 0;
          return (
            <div
              key={coin.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <p className="text-white font-semibold text-sm">
                    {coin.name}
                  </p>
                  <p className="text-gray-500 text-xs uppercase">
                    {coin.symbol}
                  </p>
                </div>
                <span
                  className={`ml-auto text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}
                >
                  {isPositive ? "▲" : "▼"}{" "}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>

              <p className="text-2xl font-bold text-white mb-3">
                {formatCurrency(coin.current_price)}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div>
                  <p className="text-gray-500">Market Cap</p>
                  <p className="text-white">{formatLarge(coin.market_cap)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Volume 24h</p>
                  <p className="text-white">{formatLarge(coin.total_volume)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Max 24h</p>
                  <p className="text-white">{formatCurrency(coin.high_24h)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Min 24h</p>
                  <p className="text-white">{formatCurrency(coin.low_24h)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">
          Riepilogo Mercato
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-160">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left pb-3 font-medium">#</th>
                <th className="text-left pb-3 font-medium">Nome</th>
                <th className="text-right pb-3 font-medium">Prezzo</th>
                <th className="text-right pb-3 font-medium">24h %</th>
                <th className="text-right pb-3 font-medium">Market Cap</th>
                <th className="text-right pb-3 font-medium">Volume 24h</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {coins.map((coin, index) => {
                const isPositive = coin.price_change_percentage_24h >= 0;
                return (
                  <tr
                    key={coin.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 text-gray-500">{index + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-5 h-5"
                        />
                        <span className="text-white">{coin.name}</span>
                        <span className="text-gray-500 uppercase text-xs">
                          {coin.symbol}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-white">
                      {formatCurrency(coin.current_price)}
                    </td>
                    <td
                      className={`py-3 text-right font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}
                    >
                      {isPositive ? "▲" : "▼"}{" "}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </td>
                    <td className="py-3 text-right text-gray-300">
                      {formatLarge(coin.market_cap)}
                    </td>
                    <td className="py-3 text-right text-gray-300">
                      {formatLarge(coin.total_volume)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Crypto;
