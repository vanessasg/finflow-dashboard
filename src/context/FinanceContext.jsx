// src/context/FinanceContext.jsx

import { createContext, useContext, useState } from "react";
import {
  transactions as initialTransactions,
  kpiData,
  monthlyData,
  budgetCategories,
  companyInfo,
} from "../data/mockData";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);

  const addTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: transactions.length + 1,
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t,
      ),
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        kpiData,
        monthlyData,
        budgetCategories,
        companyInfo,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
