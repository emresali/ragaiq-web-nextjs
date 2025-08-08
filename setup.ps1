# setup.ps1
Write-Host "=== RagAI-Q Development Setup ===" -ForegroundColor Cyan

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Please install Node.js 20+" -ForegroundColor Red
    exit 1
}

# Check if Docker is installed
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Please install Docker Desktop" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "`n1. Installing dependencies..." -ForegroundColor Yellow
npm install

# Generate Prisma client
Write-Host "`n2. Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Start database
Write-Host "`n3. Starting PostgreSQL database..." -ForegroundColor Yellow
& .\scripts\dev.ps1 start

# Start development server
Write-Host "`n4. Starting Next.js development server..." -ForegroundColor Yellow
Write-Host "Access the application at: http://localhost:3000" -ForegroundColor Green
Write-Host "Login with: demo@demo-corp.com / demo123" -ForegroundColor Green
npm run dev