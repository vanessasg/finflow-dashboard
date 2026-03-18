import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { transactions } from "../data/mockData";

export const seedTransactions = async () => {
  try {
    // Controlla se ci sono già dati
    const snapshot = await getDocs(collection(db, "transactions"));
    if (!snapshot.empty) {
      console.log("Firestore già popolato, seed saltato.");
      return;
    }

    // Inserisci tutti i mock
    for (const t of transactions) {
      const { id, ...data } = t; // rimuovi l'id mock, Firestore ne genera uno suo
      await addDoc(collection(db, "transactions"), data);
    }

    console.log("Seed completato!");
  } catch (err) {
    console.error("Errore seed:", err);
  }
};