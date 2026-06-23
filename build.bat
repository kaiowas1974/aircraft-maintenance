@echo off
setlocal
echo Starting aircraft maintenance database stack...

:: Check and create network if not present
docker network inspect aircraft-net >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Creating network aircraft-net...
    docker network create aircraft-net
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to create network aircraft-net.
        pause
        exit /b %ERRORLEVEL%
    )
)

docker compose up -d

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