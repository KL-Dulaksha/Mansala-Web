@echo off
title Mansala - Local Server
cd /d "%~dp0"

echo ========================================================
echo   Mansala - Local Development Preview Server
echo   Faculty of Science Students' Union - Univ. of Ruhuna
echo ========================================================
echo.

echo Checking port 8080 availability...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-Process -Id (Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue" >nul 2>&1

echo Starting local web server on http://localhost:8080 ...
echo.

:: Automatically open browser to login.html after 1.5 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8080/login.html"

:: Check if Node is available (recommended, non-blocking HTTP server)
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo Launching via Node.js...
  node server.js
  goto :end
)

:: Fallback to Python if Node is not available
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo Launching via Python...
  python -m http.server 8080
  goto :end
)

where py >nul 2>&1
if %ERRORLEVEL% equ 0 (
  echo Launching via py launcher...
  py -m http.server 8080
  goto :end
)

echo [ERROR] Neither Node.js nor Python was found on your system PATH!
echo Please install Node.js (https://nodejs.org) or Python (https://python.org).
echo.
pause

:end
