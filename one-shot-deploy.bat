@echo off
title Galicia 2025 - Deploy manual (una vez)
echo =============================================
echo   🚀 Commit + Push (deploy en Vercel)
echo =============================================

git add .
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set FECHA=%%a-%%b-%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set HORA=%%a-%%b
git commit -m "Deploy manual %FECHA% %HORA%"
git push
if %errorlevel% neq 0 (
  echo ❌ Error al hacer push.
  pause
  exit /b
)
echo ✅ Listo. Revisa tu proyecto en Vercel.
pause
