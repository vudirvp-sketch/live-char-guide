@echo off
REM Build script for Live Char Guide (Windows)

echo ============================================
echo Live Char Guide Build Script v1.0.0
echo ============================================

REM Set UTF-8 code page
chcp 65001 >nul

REM Run build
node src/scripts/build.mjs

if %errorlevel% neq 0 (
  echo [ERROR] Build failed
  exit /b %errorlevel%
)

REM Read hash
if exist build.hash (
  set /p HASH=<build.hash
  echo.
  echo [OK] Build completed successfully
  echo [OK] Build hash: %HASH%
) else (
  echo [ERROR] Build failed - no hash file generated
  exit /b 1
)
