@echo off
title Gopika Sadanand Portfolio Server
echo ========================================================
echo   GOPIKA SADANAND - PERSONAL PORTFOLIO WEB SERVER
echo ========================================================
echo.
echo Starting local web server on http://localhost:8080 ...
echo.
echo Opening browser to Login Page: http://localhost:8080/login.html
echo.
start "" "http://localhost:8080/login.html"
npx --yes http-server -p 8080 -c-1
pause
