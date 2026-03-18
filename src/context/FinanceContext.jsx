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
      status: "completata",
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
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
