// src/context/FinanceContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  kpiData,
  monthlyData,
  budgetCategories,
  companyInfo,
} from "../data/mockData";
import { seedTransactions } from "../utils/seedFirestore";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Leggi da Firestore al mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        await seedTransactions(); // popola solo se vuoto
        const snapshot = await getDocs(collection(db, "transactions"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(data);
      } catch (err) {
        console.error("Errore fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Aggiungi
  const addTransaction = async (newTransaction) => {
    try {
      const docRef = await addDoc(
        collection(db, "transactions"),
        newTransaction,
      );
      setTransactions((prev) => [
        { id: docRef.id, ...newTransaction },
        ...prev,
      ]);
    } catch (err) {
      console.error("Errore addTransaction:", err);
    }
  };

  // Modifica
  const editTransaction = async (updatedTransaction) => {
    try {
      const { id, ...data } = updatedTransaction;
      await updateDoc(doc(db, "transactions", id), data);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? updatedTransaction : t)),
      );
    } catch (err) {
      console.error("Errore editTransaction:", err);
    }
  };

  // Elimina
  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Errore deleteTransaction:", err);
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
        editTransaction,
        deleteTransaction,
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
