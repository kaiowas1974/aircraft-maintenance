@echo off
setlocal
echo Stopping and removing aircraft maintenance stack (containers and volumes)...

docker compose down -v

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to destroy the docker-compose stack.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [SUCCESS] Stack and volumes have been removed.
echo.
pause
endlocal