@echo off
setlocal
title Diagnostico Galicia 2025 (NO cambia nada)
color 0E

echo === RUTA PROYECTO ===
cd /d "%~dp0"
cd

echo.
echo === ARCHIVOS CLAVE ===
if exist package.json (echo ✓ package.json) else (echo ❌ Falta package.json)
if exist public\\fotos\\ (echo ✓ public\\fotos) else (echo ❌ Falta public\\fotos)
dir /-c public\\fotos\\

echo.
echo === VERSIONES ===
where git   || echo ❌ Falta Git
where node  || echo ❌ Falta Node
where npm   || echo ❌ Falta npm
where vercel|| echo ⚠ Vercel CLI no encontrada
node -v & npm -v

echo.
echo === GIT REMOTO ===
if not exist .git (echo (No hay repo .git todavia)) else (
  git remote -v
  git status
)

echo.
echo === VERCEL ===
vercel whoami
echo (Ignora si no has iniciado sesion aun.)
echo.
echo ✅ Diagnostico listo. No se ha modificado nada.
pause
