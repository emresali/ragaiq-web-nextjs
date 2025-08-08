# scripts/dev.ps1
param(
    [Parameter(Position=0)]
    [string]$Command = "start"
)

$ErrorActionPreference = "Stop"

function Start-Dev {
    Write-Host "Starting development environment..." -ForegroundColor Green
    
    # Start PostgreSQL container
    docker-compose -f docker-compose.dev.yml up -d
    
    # Wait for PostgreSQL to be ready
    Write-Host "Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
    $maxAttempts = 30
    $attempt = 0
    
    while ($attempt -lt $maxAttempts) {
        $result = docker exec ragaiq-postgres-dev pg_isready -U ragaiq -d ragaiq_db 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "PostgreSQL is ready!" -ForegroundColor Green
            break
        }
        Write-Host "." -NoNewline
        Start-Sleep -Seconds 1
        $attempt++
    }
    
    if ($attempt -eq $maxAttempts) {
        Write-Host "`nPostgreSQL failed to start" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "`nRunning database migrations..." -ForegroundColor Yellow
    npx prisma migrate dev
    
    Write-Host "Seeding database..." -ForegroundColor Yellow
    npx prisma db seed
    
    Write-Host "`nDevelopment environment is ready!" -ForegroundColor Green
    Write-Host "You can now run 'npm run dev' to start the application" -ForegroundColor Cyan
}

function Stop-Dev {
    Write-Host "Stopping development environment..." -ForegroundColor Yellow
    docker-compose -f docker-compose.dev.yml down
    Write-Host "Development environment stopped" -ForegroundColor Green
}

function Reset-Dev {
    Write-Host "Resetting development environment..." -ForegroundColor Yellow
    docker-compose -f docker-compose.dev.yml down -v
    Start-Dev
}

function Show-Logs {
    docker-compose -f docker-compose.dev.yml logs -f
}

# Main execution
switch ($Command) {
    "start" { Start-Dev }
    "stop" { Stop-Dev }
    "reset" { Reset-Dev }
    "logs" { Show-Logs }
    default {
        Write-Host "Usage: ./scripts/dev.ps1 [start|stop|reset|logs]" -ForegroundColor Yellow
        Write-Host "  start - Start PostgreSQL and run migrations"
        Write-Host "  stop  - Stop PostgreSQL"
        Write-Host "  reset - Reset database and start fresh"
        Write-Host "  logs  - Show PostgreSQL logs"
    }
}