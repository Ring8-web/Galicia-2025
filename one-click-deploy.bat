@echo off
setlocal enabledelayedexpansion
title Galicia 2025 - One Click Deploy
echo =============================================
echo   🚀 One Click Deploy para Galicia 2025
echo =============================================

REM ---- CONFIG ----
set REPO_URL=https://github.com/Ring8-web/galicia2025.git
set DEFAULT_BRANCH=main
set VERCEL_URL=https://galicia2025.vercel.app

REM Mensaje de commit opcional por argumento
set COMMIT_MSG=Deploy automatico
if not "%~1"=="" set COMMIT_MSG=%~1

REM ---- Checks basicos ----
where git >nul 2>nul || (echo ❌ Git no esta instalado o no esta en PATH. && pause && exit /b 1)
where node >nul 2>nul || (echo ❌ Node.js no esta instalado o no esta en PATH. && pause && exit /b 1)
where npm  >nul 2>nul || (echo ❌ npm no esta instalado. && pause && exit /b 1)

REM ---- Inicializar repo si no existe ----
if not exist .git (
  echo 🧰 Inicializando repositorio Git...
  git init || (echo ❌ No se pudo iniciar Git. && pause && exit /b 1)
  git branch -M %DEFAULT_BRANCH%
)

REM ---- Configurar remoto origin si falta ----
for /f "tokens=2" %%i in ('git remote -v ^| findstr /i "^origin" ^| findstr /i "(push)"') do set ORIGIN_URL=%%i
if "%ORIGIN_URL%"=="" (
  echo 🔗 Configurando remoto origin -> %REPO_URL%
  git remote add origin %REPO_URL% || (echo ❌ No se pudo agregar remoto. && pause && exit /b 1)
)

REM ---- Instalar dependencias si faltan ----
if not exist node_modules (
  echo 📦 Instalando dependencias (npm install)...
  npm install || (echo ❌ Error en npm install. && pause && exit /b 1)
)

REM ---- Build local ----
echo 🔧 Compilando proyecto (npm run build)...
npm run build
if %errorlevel% neq 0 (
  echo ❌ Error en la compilacion. Corrige los errores antes del deploy.
  pause
  exit /b 1
)

REM ---- Preparar commit ----
echo 📝 Creando commit...
git add .
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set FECHA=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set HORA=%%a-%%b
git commit -m "%COMMIT_MSG% %FECHA% %HORA%"
if %errorlevel% neq 0 (
  echo (Puede que no haya cambios nuevos que commitear; continuando...)
)

REM ---- Push (set upstream si es necesario) ----
echo 🌍 Subiendo a GitHub...
git push -u origin %DEFAULT_BRANCH%
if %errorlevel% neq 0 (
  echo ⚠️ Intentando configurar upstream...
  git push -u origin %DEFAULT_BRANCH%
  if %errorlevel% neq 0 (
    echo ❌ Error al hacer push. Revisa autenticacion/red o si el repo existe.
    echo Si el repo remoto tiene commits (README), ejecuta una vez:
    echo    git fetch origin %DEFAULT_BRANCH%
    echo    git merge --allow-unrelated-histories origin/%DEFAULT_BRANCH%
    echo    git push -u origin %DEFAULT_BRANCH%
    pause
    exit /b 1
  )
)

echo.
echo ✅ ¡Deploy iniciado! Vercel publicara automaticamente.
echo 🌐 Produccion: %VERCEL_URL%
echo (Puedes actualizar la pagina en 1-2 minutos para ver los cambios.)
echo.
pause
