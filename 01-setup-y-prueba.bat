@echo off
setlocal
title (1) Setup y prueba: GitHub + Vercel
color 0E
cd /d "%~dp0"

set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "DEFAULT_BRANCH=main"
set "VERCEL_PROJECT=galicia2025"

echo === VERSIONES ===
where git   || (echo ❌ Falta Git & pause & exit /b 1)
where node  || (echo ❌ Falta Node & pause & exit /b 1)
where npm   || (echo ❌ Falta npm & pause & exit /b 1)
where vercel>nul 2>nul || (echo ⚠ Instalando Vercel CLI... & npm i -g vercel >nul 2>&1)

echo.
echo === GIT CONFIG (usuario/email) ===
for /f "delims=" %%i in ('git config user.name 2^>nul') do set GUSER=%%i
for /f "delims=" %%i in ('git config user.email 2^>nul') do set GMAIL=%%i
if "%GUSER%"=="" git config user.name "Galicia2025-Auto"
if "%GMAIL%"=="" git config user.email "auto@local"

echo.
echo === REPO LOCAL ===
if not exist .git ( git init & git branch -M %DEFAULT_BRANCH% )
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 ( git remote add origin %REPO_URL% ) else ( git remote set-url origin %REPO_URL% )
git remote -v

echo.
echo === PRUEBA DE ACCESO A GITHUB ===
git ls-remote origin >nul 2>&1
if %errorlevel% neq 0 (
  echo ❌ GitHub pide login. Se abrira el prompt del Credential Manager en el primer push.
  echo Si te pregunta usuario/clave, usa tu cuenta de GitHub (recomendado PAT).
) else (
  echo ✓ Acceso a GitHub OK.
)

echo.
echo === VERCEL LOGIN ===
vercel whoami
if %errorlevel% neq 0 (
  echo ❌ No has iniciado sesion en Vercel. Se abrira el navegador para login...
  vercel login || (echo ✋ Cancela y vuelve a lanzar este bat tras loguearte. & pause & exit /b 1)
)

echo.
echo === VINCULAR PROYECTO VERCEL ===
vercel link --yes --project %VERCEL_PROJECT%

echo.
echo ✅ Setup verificado. Ahora ejecuta: 02-push-y-deploy.bat
pause
