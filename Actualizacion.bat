@echo off
title Galicia 2025 - Deploy Automático a Producción
echo =============================================
echo   🚀 Publicando Galicia 2025 en Vercel
echo =============================================

:: Verificar si existe .git
if not exist .git (
    echo ⚠️ No hay repositorio Git inicializado.
    echo Ejecuta 'git init' y configura el remoto antes del primer uso.
    pause
    exit /b
)

echo.
echo 📦 Guardando cambios locales...
git add .
git commit -m "Actualización automática %date% %time%"
echo.

echo 🌍 Subiendo a GitHub (y activando Vercel build)...
git push
echo.

if %errorlevel% neq 0 (
    echo ❌ Error al subir cambios. Revisa conexión o autenticación.
    pause
    exit /b
)

echo ✅ Listo! Tu sitio se actualizará automáticamente en Vercel.
echo 🕐 Espera 1-2 minutos y revisa tu enlace de producción:
echo     👉 https://galicia2025.vercel.app
echo.
pause
