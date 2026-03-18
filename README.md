# FinFlow Dashboard 💹

> **Finance dashboard aziendale** con dati in tempo reale, costruita con React e Firebase.

🔗 **[Live Demo](https://vanessasg.github.io/finflow-dashboard/)**

---

## 📸 Overview

FinFlow è una dashboard finanziaria per un'azienda fittizia, progettata per monitorare entrate, spese, budget e criptovalute in tempo reale. Il progetto nasce come showcase delle principali funzionalità di React in un contesto professionale e realistico.

---

## ✨ Features

- **Dashboard** — KPI cards con trend, grafico lineare e a barre dell'andamento annuale, tabella transazioni recenti
- **Transazioni** — Tabella completa con ricerca full-text, filtri per categoria, aggiunta nuova transazione con validazione form, editing inline al click sulla riga, eliminazione con dialog di conferma
- **Budget** — Grafico a torta per distribuzione budget, grafico a barre orizzontali allocato vs speso, progress bar per categoria con alert visivo al superamento del 90%
- **Crypto** — Prezzi live di BTC, ETH, SOL, ADA, XRP via CoinGecko API con aggiornamento automatico ogni minuto
- **Sidebar collassabile** — Si restringe a sole icone su desktop, slide-in/out su mobile
- **Dati persistenti** — CRUD completo su Firebase Firestore con record protetti non eliminabili
- **Design responsive** — Layout ottimizzato per desktop, tablet e mobile

---

## 🛠 Tech Stack

| Tecnologia | Utilizzo |
|---|---|
| **React 18** | UI library, componenti funzionali |
| **Vite 6** | Build tool e dev server |
| **React Router v6** | Routing SPA con HashRouter |
| **Context API** | State management globale |
| **Recharts** | Grafici (LineChart, BarChart, PieChart) |
| **Firebase Firestore** | Database cloud NoSQL, persistenza dati |
| **Tailwind CSS v4** | Utility-first styling |
| **Font Awesome** | Icone UI |
| **SweetAlert2** | Dialog di conferma styled |
| **CoinGecko API** | Prezzi crypto in tempo reale |

---

## 📁 Struttura del progetto

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx       # Sidebar collassabile (desktop + mobile)
│   │   └── TopBar.jsx        # Header con hamburger menu
│   └── ui/
│       ├── KpiCard.jsx       # Card metriche con trend
│       └── StatBadge.jsx     # Badge categoria/stato
├── context/
│   └── FinanceContext.jsx    # Context API + CRUD Firestore
├── data/
│   └── mockData.js           # Dati aziendali mock
├── hooks/
│   └── useCrypto.js          # Custom hook per CoinGecko API
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Budget.jsx
│   └── Crypto.jsx
└── utils/
    └── seedFirestore.js      # Seed iniziale database
```

---

## 🚀 Setup locale

### Prerequisiti
- Node.js 22.12+
- Account Firebase

### Installazione

```bash
# Clona la repo
git clone https://github.com/vanessasg/finflow-dashboard.git
cd finflow-dashboard

# Installa dipendenze
npm install
```

### Configurazione Firebase

1. Crea un progetto su [Firebase Console](https://console.firebase.google.com)
2. Abilita **Firestore Database** in test mode
3. Crea un file `.env` nella root del progetto:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Imposta le Firestore Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{transactionId} {
      allow read: if true;
      allow create: if true;
      allow update: if true;
      allow delete: if resource.data.get('protected', false) != true;
    }
  }
}
```

### Avvio

```bash
npm run dev
```

Al primo avvio, il seed popolerà automaticamente Firestore con i dati mock.

---

## 📦 Deploy

Il progetto è deployato su **GitHub Pages** tramite `gh-pages`:

```bash
npm run deploy
```

---

## 🔑 Note

- Il file `.env` non è incluso nella repo per motivi di sicurezza. Ogni sviluppatore deve configurare il proprio progetto Firebase.
- I record con `protected: true` non possono essere eliminati né dal frontend né direttamente via API Firestore (regola lato server).
- La CoinGecko API è gratuita e non richiede autenticazione per le richieste base.

---

## Author

**vanessasg** — [vanessasg.com](https://www.vanessasg.com) · [GitHub](https://github.com/vanessasg)