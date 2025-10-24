@echo off
setlocal
title (2) Push y Deploy: GitHub + Vercel (forzado)
color 0A
cd /d "%~dp0"

set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "DEFAULT_BRANCH=main"
set "VERCEL_PROJECT=galicia2025"
set "PROD_URL=https://galicia2025.vercel.app"
set "COMMIT_MSG=Deploy forzado (build + push + vercel)"

where git   >nul 2>nul || (echo ❌ Falta Git. & pause & exit /b 1)
where node  >nul 2>nul || (echo ❌ Falta Node.js. & pause & exit /b 1)
where npm   >nul 2>nul || (echo ❌ Falta npm. & pause & exit /b 1)
where vercel>nul 2>nul || (echo ⚠ Instalando Vercel CLI... & npm i -g vercel >nul 2>&1)

echo 📦 Instalando dependencias (si faltan)...
if not exist node_modules npm install --force

for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMddHHmmss\")"') do set "VITE_BUILD_ID=%%i"
echo 🏗️ Compilando con npx vite...
npx --yes vite@latest build || (echo ❌ Error en la compilacion. & pause & exit /b 1)

echo 🔗 Asegurando remoto y rama...
if not exist .git ( git init & git branch -M %DEFAULT_BRANCH% )
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 ( git remote add origin %REPO_URL% ) else ( git remote set-url origin %REPO_URL% )

echo ➕ Añadiendo cambios (incluye fotos y audios)...
git add -A
if exist public\fotos\ ( git add -f public/fotos/* & git add -f public/fotos/**/* )
if exist public\audios\ ( git add -f public/audios/* & git add -f public/audios/**/* )

for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyy-MM-dd_HH-mm-ss\")"') do set "TS=%%i"
git commit -m "%COMMIT_MSG% %TS%" >nul 2>&1

echo ⬆️ Subiendo a GitHub (puede pedir login una unica vez)...
git push -u origin %DEFAULT_BRANCH% --force || (echo ❌ Error al hacer push. Revisa usuario/clave si lo pide. & pause & exit /b 1)

echo 🔗 Vercel link...
vercel link --yes --project %VERCEL_PROJECT% >nul 2>&1

echo 🚀 Deploy directo de /dist a PRODUCCION...
vercel deploy dist --prod --yes --confirm --env VITE_BUILD_ID=%VITE_BUILD_ID% || (echo ❌ Error en Vercel deploy. & pause & exit /b 1)

start "" "%PROD_URL%"
echo ✅ Publicado en: %PROD_URL%
pause
