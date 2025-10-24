@echo off
setlocal
title (2) Build + Push + Deploy
color 0A
cd /d "%~dp0"

set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "DEFAULT_BRANCH=main"
set "VERCEL_PROJECT=galicia2025"
set "PROD_URL=https://galicia2025.vercel.app"

where git   >nul 2>nul || (echo ❌ Falta Git. & pause & exit /b 1)
where node  >nul 2>nul || (echo ❌ Falta Node.js. & pause & exit /b 1)
where npm   >nul 2>nul || (echo ❌ Falta npm. & pause & exit /b 1)
where vercel>nul 2>nul || (echo ⚠ Instalando Vercel CLI... & npm i -g vercel >nul 2>&1)

if not exist public\fotos\ (mkdir public\fotos)
if not exist public\audios\ (mkdir public\audios)
if not exist public\fotos\.gitkeep (echo.> public\fotos\.gitkeep)
if not exist public\audios\.gitkeep (echo.> public\audios\.gitkeep)

if not exist node_modules npm install --force
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMddHHmmss\")"') do set "VITE_BUILD_ID=%%i"
npx --yes vite@latest build || (echo ❌ Error build & pause & exit /b 1)

if not exist .git ( git init & git branch -M %DEFAULT_BRANCH% )
git remote get-url origin >nul 2>nul || git remote add origin %REPO_URL%

git add -A
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyy-MM-dd_HH-mm-ss\")"') do set "TS=%%i"
git commit -m "Deploy %TS%" >nul 2>&1
git push -u origin %DEFAULT_BRANCH% --force || (echo ❌ Push fallo (credenciales?). & pause & exit /b 1)

vercel link --yes --project %VERCEL_PROJECT% >nul 2>&1
vercel deploy dist --prod --yes --confirm --env VITE_BUILD_ID=%VITE_BUILD_ID% || (echo ❌ Deploy fallo. & pause & exit /b 1)

start "" "%PROD_URL%"
echo ✅ Publicado en: %PROD_URL%
pause
