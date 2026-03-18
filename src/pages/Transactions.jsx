import { useState, Fragment } from "react";
import { useFinance } from "../context/FinanceContext";
import StatBadge from "../components/ui/StatBadge";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";

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
const statuses = ["completata", "in attesa"];

const emptyForm = {
  date: "",
  description: "",
  category: "Operativo",
  amount: "",
  status: "completata",
};

const validate = (form) => {
  const errors = {};
  if (!form.date) errors.date = "Data obbligatoria";
  if (!form.description.trim()) errors.description = "Descrizione obbligatoria";
  if (!form.amount || isNaN(form.amount)) errors.amount = "Importo non valido";
  return errors;
};

const TransactionForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  errors,
  submitLabel,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 items-end">
    {/* Data */}
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Data</label>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={onChange}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
      />
      {errors.date && (
        <p className="text-xs text-red-400 mt-1">{errors.date}</p>
      )}
    </div>

    {/* Descrizione */}
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Descrizione</label>
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="es. Abbonamento tool"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
      />
      {errors.description && (
        <p className="text-xs text-red-400 mt-1">{errors.description}</p>
      )}
    </div>

    {/* Categoria */}
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Categoria</label>
      <select
        name="category"
        value={form.category}
        onChange={onChange}
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
        onChange={onChange}
        placeholder="es. -1500 o 5000"
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
      />
      {errors.amount && (
        <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
      )}
    </div>

    {/* Stato */}
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Stato</label>
      <select
        name="status"
        value={form.status}
        onChange={onChange}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>

    {/* Buttons */}
    <div className="sm:col-span-2 xl:col-span-5 flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="text-gray-400 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors"
      >
        Annulla
      </button>
      <button
        type="button"
        onClick={onSubmit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
      >
        {submitLabel}
      </button>
    </div>
  </div>
);

const Transactions = () => {
  const { transactions, loading, addTransaction, editTransaction, deleteTransaction } =
    useFinance();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tutte");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editErrors, setEditErrors] = useState({});

  // Filtri
  const filtered = transactions.filter((t) => {
    const matchSearch = t.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "Tutte" || t.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  // --- Crea ---
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    addTransaction({ ...form, amount: parseFloat(form.amount) });
    setForm(emptyForm);
    setFormErrors({});
    setShowForm(false);
  };

  // --- Espandi / Edit ---
  const handleRowClick = (t) => {
    if (expandedId === t.id) {
      setExpandedId(null);
    } else {
      setExpandedId(t.id);
      setEditForm({ ...t });
      setEditErrors({});
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setEditErrors({ ...editErrors, [e.target.name]: undefined });
  };

  const handleEditSubmit = () => {
    const errors = validate(editForm);
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    editTransaction({ ...editForm, amount: parseFloat(editForm.amount) });
    setExpandedId(null);
  };

  // --- Delete ---
  const handleDelete = (id) => {
    deleteTransaction(id);
    if (expandedId === id) setExpandedId(null);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">
          Caricamento transazioni...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">{filtered.length} transazioni</p>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setExpandedId(null);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {showForm ? "Annulla" : "+ Nuova Transazione"}
        </button>
      </div>

      {/* Form creazione */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">
            Nuova Transazione
          </h3>
          <TransactionForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setFormErrors({});
            }}
            errors={formErrors}
            submitLabel="Aggiungi"
          />
        </div>
      )}

      {/* Filtri + Tabella */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Cerca transazione..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
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

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-800">
              <th className="text-left pb-3 ps-3 font-medium">Data</th>
              <th className="text-left pb-3 font-medium">Descrizione</th>
              <th className="text-left pb-3 font-medium">Categoria</th>
              <th className="text-left pb-3 font-medium">Stato</th>
              <th className="text-right pb-3 font-medium">Importo</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Nessuna transazione trovata
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <Fragment key={t.id}>
                  {/* Riga */}
                  <tr
                    onClick={() => handleRowClick(t)}
                    className={`border-t border-gray-800 cursor-pointer transition-colors ${
                      expandedId === t.id
                        ? "bg-gray-800/70"
                        : "hover:bg-gray-800/50"
                    }`}
                  >
                    <td className="py-3 ps-3 text-gray-400">{t.date}</td>
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
                    <td
                      className="py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative group inline-block">
                        <button
                          onClick={() => !t.protected && handleDelete(t.id)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            t.protected
                              ? "text-gray-700 cursor-not-allowed"
                              : "text-gray-600 hover:text-red-400 cursor-pointer"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={t.protected ? faBan : faTrash}
                          />
                        </button>
                        <div className="absolute right-0 bottom-full mb-1 hidden group-hover:block z-10">
                          <span className="bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap border border-gray-700">
                            {t.protected
                              ? "Transazione protetta"
                              : "Elimina transazione"}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Riga espansa */}
                  {expandedId === t.id && (
                    <tr className="bg-gray-800/40 border-t border-gray-700">
                      <td colSpan={6} className="px-4 py-4">
                        <TransactionForm
                          form={editForm}
                          onChange={handleEditChange}
                          onSubmit={handleEditSubmit}
                          onCancel={() => setExpandedId(null)}
                          errors={editErrors}
                          submitLabel="Salva modifiche"
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
