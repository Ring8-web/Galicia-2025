@echo off
setlocal DisableDelayedExpansion
title Galicia 2025 - Deploy revista

set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "DEFAULT_BRANCH=main"
set "VERCEL_URL=https://galicia2025.vercel.app"
set "COMMIT_MSG=Deploy revista (descargable)"

cd /d "%~dp0"
if not exist .git (
  git init
  git branch -M %DEFAULT_BRANCH%
  git remote add origin %REPO_URL%
)
if not exist node_modules npm install
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMddHHmmss\")"') do set "VITE_BUILD_ID=%%i"
npm run build || (echo ❌ Error en build & pause & exit /b 1)
git add .
if exist public\fotos\ (git add -f public/fotos/* & git add -f public/fotos/**/*)
if exist public\audios\ (git add -f public/audios/* & git add -f public/audios/**/*)
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyy-MM-dd_HH-mm-ss\")"') do set "TS=%%i"
git commit -m "%COMMIT_MSG% %TS%"
git push -u origin %DEFAULT_BRANCH%
start "" "%VERCEL_URL%"
echo ✅ Deploy iniciado
pause
