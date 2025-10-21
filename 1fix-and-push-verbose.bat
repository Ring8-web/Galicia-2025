@echo off
setlocal
title Galicia 2025 - FIX & PUSH (VERBOSO)
color 0A

REM === CONFIG ===
set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "BR=main"
set "COMMIT_MSG=Fix & push (verbose)"

echo.
echo ===============================================
echo     GALICIA 2025  -  SUBIDA A GITHUB MANUAL
echo ===============================================
echo.

where git || (echo ❌ Falta Git. Instala Git y vuelve. & pause & exit /b 1)
where node || (echo ❌ Falta Node.js. Instala Node y vuelve. & pause & exit /b 1)
where npm  || (echo ❌ Falta npm. & pause & exit /b 1)

cd /d "%~dp0"
echo Carpeta actual:
cd
echo.

if not exist .git (
  echo 📁 No hay repo git. Creando...
  git init
  git branch -M %BR%
)
git remote get-url origin >nul 2>nul
if %errorlevel% neq 0 (
  git remote add origin %REPO_URL%
) else (
  git remote set-url origin %REPO_URL%
)
echo 🔗 Remoto configurado: %REPO_URL%

echo.
echo 🧩 Sincronizando con remoto (por si ya existe)...
git fetch origin %BR% 2>nul
git reset --soft origin/%BR% 2>nul

echo.
echo 📸 Agregando cambios y fotos...
git add -A
if exist public\fotos\ (
  git add -f public/fotos/*
  git add -f public/fotos/**/*
)
if exist public\audios\ (
  git add -f public/audios/*
  git add -f public/audios/**/*
)

for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString(\"yyyy-MM-dd HH:mm:ss\")"') do set "TS=%%i"
git commit -m "%COMMIT_MSG% %TS%" >nul 2>&1

echo.
echo 🌍 Subiendo a GitHub...
git push -u origin %BR% --force --verbose || (
  echo ❌ Error al hacer push. Intentando login...
  git credential-manager-core configure
  git push -u origin %BR% --force --verbose
)

echo.
echo ✅ TERMINADO: Verifica en GitHub -> Galicia-2025 -> Main
pause
