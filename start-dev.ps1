Write-Host "Starting PostgreSQL..." -ForegroundColor Green
docker-compose -f docker-compose.dev.yml up -d

Write-Host "Waiting for DB..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Running migrations..." -ForegroundColor Yellow
npx prisma db push

Write-Host "Seeding database..." -ForegroundColor Yellow
npx prisma db seed

Write-Host "`nReady! Login: demo@demo-corp.com / demo123" -ForegroundColor Green