@echo off
setlocal
title Deploy UNICO v2 (build fijo + GitHub + Vercel)
color 0B
cd /d "%~dp0"

set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "DEFAULT_BRANCH=main"
set "VERCEL_PROJECT=galicia2025"
set "PROD_URL=https://galicia2025.vercel.app"
set "COMMIT_MSG=Deploy v2 (build fijo + vercel)"

where git   >nul 2>nul || (echo ❌ Falta Git. & pause & exit /b 1)
where node  >nul 2>nul || (echo ❌ Falta Node.js. & pause & exit /b 1)
where npm   >nul 2>nul || (echo ❌ Falta npm. & pause & exit /b 1)
where vercel>nul 2>nul || (echo ⚠ Instalando Vercel CLI... & npm i -g vercel >nul 2>&1)

:: ===== Build FIJO (igual que el anterior, por si te saltas el paso 1) =====
del /q package-lock.json 2>nul
rmdir /s /q node_modules 2>nul
npm install --force || (echo ❌ Error en npm install. & pause & exit /b 1)

for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyyMMddHHmmss\")"') do set "VITE_BUILD_ID=%%i"
echo 🏗️ Compilando con npx vite...
npx --yes vite@latest build || (echo ❌ Error en la compilacion. & pause & exit /b 1)

:: ===== GitHub =====
if not exist .git ( git init & git branch -M %DEFAULT_BRANCH% )
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 ( git remote add origin %REPO_URL% ) else ( git remote set-url origin %REPO_URL% )

git add .
if exist public\fotos\ ( git add -f public/fotos/* & git add -f public/fotos/**/* )
if exist public\audios\ ( git add -f public/audios/* & git add -f public/audios/**/* )

for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyy-MM-dd_HH-mm-ss\")"') do set "TS=%%i"
git commit -m "%COMMIT_MSG% %TS%" >nul 2>&1
git push -u origin %DEFAULT_BRANCH% --force >nul 2>&1

:: ===== Vercel directo desde /dist =====
vercel link --yes --project %VERCEL_PROJECT% >nul 2>&1
vercel deploy dist --prod --yes --confirm --env VITE_BUILD_ID=%VITE_BUILD_ID%

start "" "%PROD_URL%"
echo ✅ Publicado en: %PROD_URL%
pause
