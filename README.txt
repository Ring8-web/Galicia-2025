Galicia 2025 — Auto Runner (Windows .bat)
=============================================

Este pack permite que, cada vez que modifiques archivos del proyecto,
se haga automáticamente:
- (opcional) build local,
- commit con fecha/hora,
- push a GitHub (Rama: main),
- deploy automático en Vercel.

Incluye:
1) start-dev.bat            → Arranca servidor local (npm run dev) y abre el navegador
2) auto-deploy-watch.bat    → Observa cambios (cada 10s), hace commit + push automático
3) one-shot-deploy.bat      → Hace un deploy manual (commit + push) una sola vez
4) set-remote.bat           → Configura el remoto origin a https://github.com/Ring8-web/galicia2025.git
5) .gitignore               → Ignora node_modules, dist, etc.

REQUISITOS (una sola vez)
-------------------------
- Tener Node y Git instalados (node -v, git --version)
- En la primera vez:
  a) Ejecuta set-remote.bat (configura origin y rama main)
  b) Si es proyecto nuevo: abre terminal y ejecuta:
     git add .
     git commit -m "init"
     git push -u origin main

USO DIARIO
----------
- Para trabajar y ver cambios en vivo: start-dev.bat
  (Vite recarga la web automáticamente en http://localhost:5173)

- Para que se auto-deploye a Vercel cada vez que guardes cambios:
  auto-deploy-watch.bat  (déjalo abierto mientras trabajas)
  - Observa cambios cada 10 segundos
  - Si detecta cambios, hace commit + push automáticamente
  - Puedes cambiar el intervalo modificando WATCH_INTERVAL_SEC

Notas importantes
-----------------
- El watch usa 'git status --porcelain' para detectar cambios sin commitear.
- Si Git pide autenticación, inicia sesión y marca recordar credenciales, o usa:
  git config --global credential.helper store
- Si el remoto contiene commits previos (README creado en GitHub), ejecuta una vez:
  git fetch origin main
  git merge --allow-unrelated-histories origin/main
  git push -u origin main

URL de producción (ejemplo):
  https://galicia2025.vercel.app
