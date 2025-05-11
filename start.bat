@echo off
echo 🎀 Mother's Day Carousel - Startup Script 🎀
echo.

:: Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed. Please install Node.js and npm first.
    exit /b 1
)

:: Check and install backend dependencies if needed
echo Checking backend dependencies...
if not exist "server\node_modules" (
    echo Installing backend dependencies...
    cd server && npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install backend dependencies.
        exit /b 1
    )
    echo Backend dependencies installed successfully!
    cd ..
) else (
    echo Backend dependencies already installed.
)

:: Check and install frontend dependencies if needed
echo Checking frontend dependencies...
if not exist "src\node_modules" (
    echo Installing frontend dependencies...
    cd src && npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install frontend dependencies.
        exit /b 1
    )
    echo Frontend dependencies installed successfully!
    cd ..
) else (
    echo Frontend dependencies already installed.
)

echo.
echo Starting servers...
echo Backend will run on http://localhost:3001
echo Frontend will run on http://localhost:5173
echo Press Ctrl+C to stop the servers
echo.

:: Try to use concurrently if available
where npx >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    npx concurrently "cd server && npm start" "cd src && npm run dev"
) else (
    :: Start backend in one window
    start cmd /k "cd server && npm start"
    
    :: Wait a bit for the server to start
    timeout /t 3 /nobreak >nul
    
    :: Start frontend in another window
    start cmd /k "cd src && npm run dev"
)