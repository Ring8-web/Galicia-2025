# Galicia 2025 — Vercel Ready

## Deploy (Vercel)
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Pasos rápidos
1. `npm install`
2. `git init && git add . && git commit -m "init"`
3. Crea repo en GitHub y `git remote add origin ... && git push -u origin main`
4. En Vercel: Importa el repo → Deploy

### Notas
- `vite.config.js` + `@vitejs/plugin-react` incluidos.
- `build` llama a Vite vía `node` para evitar errores 126.
