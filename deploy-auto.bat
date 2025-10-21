@echo off
setlocal
title Galicia 2025 - FIX & PUSH (VERBOSO)

REM === CONFIG ===
set "REPO_URL=https://github.com/Ring8-web/Galicia-2025.git"
set "BR=main"
set "COMMIT_MSG=Fix & push (verbose)"

echo.
echo === DIAGNOSTICO INICIAL ===
echo Dir actual:
cd
echo.
where git || (echo ❌ Falta Git. Instala Git. & pause & exit /b 1)
where node || (echo ❌ Falta Node.js. Instala Node. & pause & exit /b 1)
where npm  || (echo ❌ Falta npm. & pause & exit /b 1)

echo.
echo Archivos clave:
if exist package.json (echo ✓ package.json) else (echo ❌ Falta package.json)
if exist public\fotos\ (echo ✓ public\fotos\) else (echo ❌ Falta carpeta public\fotos\)
dir public\fotos\

echo.
echo === ESTADO GIT ===
if not exist .git (
  echo (No hay repo local; creando...)
  git init || (echo ❌ git init fallo & pause & exit /b 1)
  git branch -M %BR%
)
git rev-parse --abbrev-ref HEAD
git remote -v
git status

echo.
echo === CONFIG REMOTO ===
git remote get-url origin || git remote add origin %REPO_URL%
git remote set-url origin %REPO_URL%
git remote -v

echo.
echo === SINCRONIZAR (si hay remoto) ===
git fetch origin %BR%
git log -1 --date=iso --oneline || echo (sin commits locales)
git log origin/%BR% -1 --date=iso --oneline || echo (sin commits remotos o rama vacia)

echo.
echo === AGREGAR CAMBIOS (forzando fotos/audios) ===
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
git commit -m "%COMMIT_MSG% %TS%"
echo.
echo === PUSH (con detalle) ===
git push -u origin %BR% --verbose || (
  echo.
  echo ❌ PUSH FALLÓ. Intento reparar autenticacion...
  git credential-manager-core configure
  git push -u origin %BR% --verbose || (
    echo.
    echo ❌ SIGUE FALLANDO. Como ultimo recurso: force push
    git push -u origin %BR% --force --verbose
  )
)

echo.
echo ✅ LISTO (GitHub). Revisa el repo y la hora del ultimo commit.
pause
