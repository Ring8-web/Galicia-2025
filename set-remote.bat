@echo off
title Configurar remoto origin (GitHub) — Ring8-web
echo =============================================
echo   🔗 Configurar remoto 'origin' para este proyecto
echo =============================================
echo Se usara por defecto:
echo   https://github.com/Ring8-web/galicia2025.git
set /p REPO_URL=👉 Pega otra URL si quieres usar una distinta (o Enter para usar la anterior): 

if "%REPO_URL%"=="" set REPO_URL=https://github.com/Ring8-web/galicia2025.git

if not exist .git (
  echo Inicializando repositorio...
  git init
)

git branch -M main

git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
  echo ❌ No se pudo agregar el remoto. Revisa la URL.
  pause
  exit /b
)

echo ✅ Remoto 'origin' configurado: %REPO_URL%
echo Si es el primer push, ejecuta:
echo   git add .
echo   git commit -m "init"
echo   git push -u origin main
pause
