@echo off
setlocal
title (1) Setup: GitHub + Vercel
color 0E
cd /d "%~dp0"

set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "DEFAULT_BRANCH=main"
set "VERCEL_PROJECT=galicia2025"

where git   || (echo ❌ Falta Git & pause & exit /b 1)
where node  || (echo ❌ Falta Node & pause & exit /b 1)
where npm   || (echo ❌ Falta npm & pause & exit /b 1)
where vercel>nul 2>nul || (echo ⚠ Instalando Vercel CLI... & npm i -g vercel >nul 2>&1)

if not exist .git ( git init & git branch -M %DEFAULT_BRANCH% )
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 ( git remote add origin %REPO_URL% )

vercel whoami || vercel login
vercel link --yes --project %VERCEL_PROJECT%
echo ✅ Setup OK. Ahora ejecuta: 02-deploy.bat
pause
