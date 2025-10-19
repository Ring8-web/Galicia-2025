@echo off
title Galicia 2025 - Deploy Automático (Ring8-web)
echo =============================================
echo   🚀 Publicando Galicia 2025 en Vercel
echo =============================================

if not exist .git (
    echo Inicializando repositorio Git...
    git init
    git branch -M main
    git remote add origin https://github.com/Ring8-web/galicia2025.git
)

echo.
echo 📦 Guardando cambios...
git add .
git commit -m "Actualizacion automatica %date% %time%"

echo.
echo 🌍 Subiendo a GitHub (Ring8-web)...
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Error al hacer push. Revisa conexión o autenticación.
    pause
    exit /b
)

echo.
echo ✅ Listo! Vercel lanzará el deploy automáticamente.
echo 🕐 Espera 1–2 minutos y revisa tu enlace:
echo     👉 https://galicia2025.vercel.app
echo.
pause
