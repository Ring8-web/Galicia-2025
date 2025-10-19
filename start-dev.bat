@echo off
title Galicia 2025 - Servidor local (Vite)
echo =============================================
echo   ▶ Iniciando servidor local (npm run dev)
echo =============================================

REM Instalar deps si no existen node_modules
if not exist node_modules (
  echo 📦 Instalando dependencias (npm install)...
  npm install
)

REM Abrir navegador tras un pequeño retardo
start "" cmd /c "ping 127.0.0.1 -n 3 >nul && start http://localhost:5173"

npm run dev
