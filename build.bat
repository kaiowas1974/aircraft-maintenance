@echo off
setlocal
echo Starting aircraft maintenance database stack...

docker compose up -d --build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to start docker-compose stack.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [SUCCESS] Stack started in detached mode.
echo.
echo To view the logs, use: docker compose logs -f
echo.
pause
endlocal