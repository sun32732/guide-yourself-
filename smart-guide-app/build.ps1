# Build Script for Smart Guide App
# Ensures you are in the correct directory

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Smart Guide Build Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Current directory:" -ForegroundColor Yellow
Write-Host (Get-Location) -ForegroundColor White
Write-Host ""

# Check if logged in
Write-Host "Checking EAS login..." -ForegroundColor Yellow
$whoami = eas whoami 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Logged in as: $whoami" -ForegroundColor Green
} else {
    Write-Host "Not logged in!" -ForegroundColor Red
    Write-Host "Run: eas login" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Starting build..." -ForegroundColor Yellow
Write-Host ""

# Start build
eas build --platform android --profile preview

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Script completed" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
