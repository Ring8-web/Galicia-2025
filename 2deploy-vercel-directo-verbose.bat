@echo off
setlocal
title Galicia 2025 - DEPLOY DIRECTO VERCEL (VERBOSO)
color 0B

REM === CONFIG ===
set "VERCEL_PROJECT=galicia2025"
set "PROD_URL=https://galicia2025.vercel.app"

cd /d "%~dp0"

where vercel >nul 2>nul || (
  echo ⚠️ Instalando Vercel CLI...
  npm i -g vercel >nul 2>&1
)

echo.
echo 🏗️  Compilando proyecto con anti-cache...
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMddHHmmss\")"') do set "VITE_BUILD_ID=%%i"
npm run build || (echo ❌ Error en compilación. & pause & exit /b 1)

echo.
echo 🔗 Vinculando proyecto en Vercel (solo la 1ª vez)...
vercel whoami
vercel link --project %VERCEL_PROJECT% --yes

echo.
echo 🚀 Publicando carpeta "dist" directamente a producción...
vercel deploy dist --prod --yes --confirm --env VITE_BUILD_ID=%VITE_BUILD_ID%

echo.
echo ✅ PUBLICADO: Abriendo producción...
start "" "%PROD_URL%"
pause
