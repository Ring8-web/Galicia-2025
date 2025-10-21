# Galicia 2025 — Revista web (scroll) con días y galerías en /public/fotos

## Editar
- Fotos (.jpg) en: `public/fotos/` → la galería del Día 1 ya apunta a dia1-1.jpg ... dia1-6.jpg
- Audio opcional en: `public/audios/`
- Textos: `src/revista/Galicia2025Revista.jsx`

## Local
npm install
npm run dev

## Deploy (un clic)
Doble clic en `deploy-revista.bat`:
- genera un ID de build para evitar caché
- compila
- fuerza subida de `public/fotos/**` y `public/audios/**`
- commit + push a `main` (repo: Ring8-web/Galicia-2025.git)
- Vercel despliega automáticamente
