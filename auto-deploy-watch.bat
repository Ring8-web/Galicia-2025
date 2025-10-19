@echo off
setlocal enabledelayedexpansion
title Galicia 2025 - Auto Deploy Watch
echo =============================================
echo   👀 Observando cambios y publicando automaticamente
echo   Repo: https://github.com/Ring8-web/galicia2025.git
echo =============================================

REM CONFIG - Cambia el intervalo si quieres (segundos)
set WATCH_INTERVAL_SEC=10

REM Verificar git y remoto
for /f "tokens=2" %%i in ('git remote -v ^| findstr /i "^origin" ^| findstr /i "(push)"') do set ORIGIN_URL=%%i
if "%ORIGIN_URL%"=="" (
    echo ⚠️ No hay remoto 'origin' configurado. Ejecuta set-remote.bat primero.
    pause
    exit /b
)

:loop
REM Detectar cambios sin commitear
for /f "delims=" %%s in ('git status --porcelain') do (
  set CHANGES=1
)

if defined CHANGES (
  set CHANGES=
  echo.
  echo 📝 Cambios detectados. Haciendo commit + push...
  git add .
  for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set FECHA=%%a-%%b-%%c
  for /f "tokens=1-2 delims=: " %%a in ('time /t') do set HORA=%%a-%%b
  git commit -m "Auto: cambios %FECHA% %HORA%"
  if %errorlevel% neq 0 (
    echo (Puede que no haya cambios reales para commitear.)
  )
  git push
  if %errorlevel% neq 0 (
    echo ❌ Error al hacer push. Verifica autenticacion / red.
  ) else (
    echo ✅ Push realizado. Vercel iniciara el deploy en segundos.
  )
)

REM Esperar intervalo
powershell -Command "Start-Sleep -Seconds %WATCH_INTERVAL_SEC%"
goto loop
