const KpiCard = ({ title, value, trend, trendLabel, color = "indigo" }) => {
  const colorMap = {
    indigo: "bg-indigo-600/10 text-indigo-400 border-indigo-600/20",
    green: "bg-green-600/10 text-green-400 border-green-600/20",
    red: "bg-red-600/10 text-red-400 border-red-600/20",
    blue: "bg-blue-600/10 text-blue-400 border-blue-600/20",
  };

  const trendPositive = trend >= 0;

  return (
    <div className={`rounded-xl border p-5 ${colorMap[color]}`}>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {trend !== undefined && (
        <p
          className={`text-xs mt-2 ${trendPositive ? "text-green-400" : "text-red-400"}`}
        >
          {trendPositive ? "▲" : "▼"} {Math.abs(trend)}% {trendLabel}
        </p>
      )}
    </div>
  );
};

export default KpiCard;
