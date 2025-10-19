@echo off
title Galicia 2025 - Deploy con Build Local (Ring8-web)
echo =============================================
echo   🚀 Publicando Galicia 2025 (con verificación de build)
echo =============================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado o no está en PATH.
    pause
    exit /b
)

echo 🔧 Ejecutando build local...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Error en la compilación. Corrige antes del deploy.
    pause
    exit /b
)

if not exist .git (
    echo Inicializando repositorio Git...
    git init
    git branch -M main
    git remote add origin https://github.com/Ring8-web/galicia2025.git
)

git add .
git commit -m "Deploy con build local %date% %time%"
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Error al hacer push. Revisa la conexión.
    pause
    exit /b
)

echo ✅ Deploy iniciado. Verifica tu URL en 1–2 minutos:
echo    https://galicia2025.vercel.app
pause
