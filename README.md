# ONE Tech

## Avvio locale

Richiede Node.js 20.12 o successivo.

```bash
npm install
npm run dev
```

Vite serve il frontend e inoltra `/api` al backend Express sulla porta 3001. Le richieste validate sono salvate in `server/data/requests.ndjson`; senza SMTP l’API conferma il salvataggio locale. Per inoltrarle via email, copia `.env.example` in `.env` e configura `SMTP_HOST`, `SMTP_USER` e `SMTP_PASS` (facoltativi: `SMTP_FROM`, `CONTACT_EMAIL`). `.env` è escluso da Git.

## Verifiche

```bash
npm run lint
# Avvio locale

Requisiti: Node.js 20.12 o successivo.

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173 · API: http://localhost:3001

Per l’invio email, configura le credenziali SMTP in `.env` partendo da `.env.example`.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
