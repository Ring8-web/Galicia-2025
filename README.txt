Galicia 2025 — Deploy FORZANDO medias (.bat)
=================================================

Este .bat sube y actualiza TODO, forzando la inclusión de fotos/audios
aunque tu .gitignore ignore `public/`.

Qué hace:
1) Comprueba Git/Node/npm
2) Cambia a la carpeta del script
3) Inicializa Git si falta (rama main)
4) Configura origin -> https://github.com/Ring8-web/Galicia-2025.git si no existe
5) Instala dependencias (npm ci / npm install)
6) Compila (npm run build)
7) Añade TODO con git add .
8) Fuerza la inclusión de `public/fotos/**`, `public/audios/**` y ficheros sueltos en `public/`
9) Commit con fecha/hora (o mensaje opcional)
10) Push a main (Vercel desplegará)
11) Abre producción: https://galicia2025.vercel.app
12) Guarda log en deploy-force-media-YYYY-MM-DD_HH-mm-ss.txt

Uso:
- Pon `deploy-force-media.bat` en la raíz del proyecto (junto a package.json)
- Doble clic para ejecutarlo
- Opcional: mensaje de commit
  deploy-force-media.bat "Añadir nuevas fotos Día 1"

Nota:
- Si tu .gitignore contiene `public/`, esto lo saltará añadiendo con `git add -f`.
