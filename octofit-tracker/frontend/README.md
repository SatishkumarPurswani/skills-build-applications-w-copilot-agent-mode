# OctoFit Tracker frontend

## API configuration

The Vite app reads `VITE_CODESPACE_NAME` from the environment when it builds. In Codespaces, define it in `octofit-tracker/frontend/.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]`. You can also set `VITE_API_BASE_URL` when production uses a different API host:

```env
VITE_API_BASE_URL=https://api.example.com/api
```

When `VITE_CODESPACE_NAME` is unset, the app derives the backend host from a Codespaces frontend hostname ending in `-5173.app.github.dev`, uses the current origin for a same-host deployment, and only uses `http://localhost:8000/api` on localhost. Requests already in flight are shared, so React Strict Mode does not issue duplicate network calls. Restart Vite after changing `.env.local`.

## Development

```bash
npm install
npm run dev
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
