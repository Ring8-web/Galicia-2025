@echo off
title Build FIJO (instala deps y compila con npx)
color 0A
cd /d "%~dp0"

where node  >nul 2>nul || (echo ❌ Falta Node.js. Instálalo. & pause & exit /b 1)
where npm   >nul 2>nul || (echo ❌ Falta npm. & pause & exit /b 1)

echo 🧹 Limpiando instalacion previa...
del /q package-lock.json 2>nul
rmdir /s /q node_modules 2>nul

echo 📦 Instalando dependencias...
npm install --force || (echo ❌ Error en npm install. & pause & exit /b 1)

echo 🏗️ Compilando con npx (sin depender del script)...
npx --yes vite@latest build || (echo ❌ Error al compilar con vite. & pause & exit /b 1)

echo ✅ Build OK. Carpeta "dist" creada.
pause
