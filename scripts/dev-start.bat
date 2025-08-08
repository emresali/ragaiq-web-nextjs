# scripts/dev-start.bat
@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0dev.ps1" start
pause

# scripts/dev-stop.bat
@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0dev.ps1" stop
pause

# scripts/dev-reset.bat
@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0dev.ps1" reset
pause