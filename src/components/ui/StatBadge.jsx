const StatBadge = ({ label, color = "gray" }) => {
  const colorMap = {
    gray: "bg-gray-700 text-gray-300",
    green: "bg-green-900/50 text-green-400",
    red: "bg-red-900/50 text-red-400",
    yellow: "bg-yellow-900/50 text-yellow-400",
    indigo: "bg-indigo-900/50 text-indigo-400",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${colorMap[color]}`}
    >
      {label}
    </span>
  );
};

export default StatBadge;
