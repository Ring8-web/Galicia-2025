Galicia 2025 — One Click Deploy (.bat)
==========================================

Este script hace TODO en un solo paso cuando TÚ quieras:
- Instala dependencias si faltan
- (opcional) actualiza ramas/remote si no están
- Compila (`npm run build`)
- Crea commit con fecha/hora (o usa un mensaje opcional)
- Hace push a GitHub (rama main) → Vercel se despliega solo

Cómo usar
---------
1) Copia `one-click-deploy.bat` en la **raíz del proyecto**.
2) Doble clic para ejecutar. También puedes pasar un mensaje:
   one-click-deploy.bat "Cambio portada y galería Día 1"

Requisitos (una sola vez)
-------------------------
- Tener Git y Node instalados (git --version, node -v, npm -v).
- Haber creado tu repo en GitHub: https://github.com/Ring8-web/galicia2025.git
- En la PRIMERA vez, si el remoto no está configurado, el script lo configurará
  y fijará la rama 'main'. Si es un proyecto totalmente nuevo, es posible que
  necesites este primer push manual:
    git add .
    git commit -m "init"
    git push -u origin main

Producción
----------
Tu sitio en Vercel se actualizará automáticamente tras el push:
https://galicia2025.vercel.app
