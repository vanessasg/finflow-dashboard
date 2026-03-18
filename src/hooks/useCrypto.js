// fetch dei dati live

import { useState, useEffect } from "react";

const COINS = "bitcoin,ethereum,solana,cardano,ripple";
const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${COINS}&order=market_cap_desc&sparkline=false`;

const useCrypto = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCoins = async () => {
    try {
      const res = await fetch(URL);
      if (!res.ok) throw new Error("Errore nel fetch");
      const data = await res.json();
      setCoins(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError("Impossibile caricare i dati. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 60000); // aggiorna ogni minuto
    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error, lastUpdated, refetch: fetchCoins };
};

export default useCrypto;