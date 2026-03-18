// tabella, filtri e form

import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import StatBadge from "../components/ui/StatBadge";

const formatCurrency = (value) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(
    value,
  );

const categories = [
  "Tutte",
  "Entrata",
  "Marketing",
  "IT",
  "HR",
  "Operativo",
  "Legale",
];

const emptyForm = {
  date: "",
  description: "",
  category: "Operativo",
  amount: "",
};

const Transactions = () => {
  const { transactions, addTransaction } = useFinance();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tutte");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Filtri
  const filtered = transactions.filter((t) => {
    const matchSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "Tutte" || t.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  // Validazione form
  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Data obbligatoria";
    if (!form.description.trim())
      newErrors.description = "Descrizione obbligatoria";
    if (!form.amount || isNaN(form.amount))
      newErrors.amount = "Importo non valido";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    addTransaction({
      ...form,
      amount: parseFloat(form.amount),
    });
    setForm(emptyForm);
    setErrors({});
    setShowForm(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{filtered.length} transazioni</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {showForm ? "Annulla" : "+ Nuova Transazione"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Nuova Transazione
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            {/* Data */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Data</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              {errors.date && (
                <p className="text-xs text-red-400 mt-1">{errors.date}</p>
              )}
            </div>

            {/* Descrizione */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Descrizione
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="es. Abbonamento tool"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              {errors.description && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Categoria */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Categoria
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {categories
                  .filter((c) => c !== "Tutte")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>

            {/* Importo */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Importo (negativo = spesa)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="es. -1500 o 5000"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              {errors.amount && (
                <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 xl:col-span-4 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Aggiungi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtri */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Cerca transazione..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                  categoryFilter === c
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Tabella */}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-800">
              <th className="text-left pb-3 font-medium">Data</th>
              <th className="text-left pb-3 font-medium">Descrizione</th>
              <th className="text-left pb-3 font-medium">Categoria</th>
              <th className="text-left pb-3 font-medium">Stato</th>
              <th className="text-right pb-3 font-medium">Importo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Nessuna transazione trovata
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 text-gray-400">{t.date}</td>
                  <td className="py-3 text-white">{t.description}</td>
                  <td className="py-3">
                    <StatBadge label={t.category} color="indigo" />
                  </td>
                  <td className="py-3">
                    <StatBadge
                      label={t.status}
                      color={t.status === "completata" ? "green" : "yellow"}
                    />
                  </td>
                  <td
                    className={`py-3 text-right font-medium ${t.amount >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {formatCurrency(t.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
