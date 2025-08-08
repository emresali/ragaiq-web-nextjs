#!/bin/bash
# scripts/dev.sh

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}Docker is not running. Please start Docker first.${NC}"
        exit 1
    fi
}

# Function to wait for PostgreSQL
wait_for_postgres() {
    echo -e "${YELLOW}Waiting for PostgreSQL to be ready...${NC}"
    for i in {1..30}; do
        if docker exec ragaiq-postgres-dev pg_isready -U ragaiq > /dev/null 2>&1; then
            echo -e "${GREEN}PostgreSQL is ready!${NC}"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    echo -e "${RED}PostgreSQL failed to start${NC}"
    return 1
}

case "$1" in
    "start")
        echo -e "${GREEN}Starting development environment...${NC}"
        check_docker
        
        # Start containers
        docker-compose -f docker/docker-compose.dev.yml up -d
        
        # Wait for PostgreSQL
        if wait_for_postgres; then
            echo -e "${GREEN}Running database migrations...${NC}"
            npx prisma db push
            
            echo -e "${GREEN}Seeding database...${NC}"
            npx prisma db seed
            
            echo -e "${GREEN}Development environment is ready!${NC}"
            echo -e "${YELLOW}PostgreSQL: postgresql://ragaiq:ragaiq123@localhost:5432/ragaiq_db${NC}"
            echo -e "${YELLOW}PgAdmin: http://localhost:5050 (admin@ragaiq.local / admin123)${NC}"
        fi
        ;;
        
    "stop")
        echo -e "${YELLOW}Stopping development environment...${NC}"
        docker-compose -f docker/docker-compose.dev.yml down
        echo -e "${GREEN}Development environment stopped.${NC}"
        ;;
        
    "reset")
        echo -e "${RED}Resetting development environment...${NC}"
        docker-compose -f docker/docker-compose.dev.yml down -v
        rm -rf docker/postgres-data docker/pgadmin-data
        
        # Restart
        $0 start
        ;;
        
    "logs")
        docker-compose -f docker/docker-compose.dev.yml logs -f
        ;;
        
    "db:studio")
        echo -e "${GREEN}Opening Prisma Studio...${NC}"
        npx prisma studio
        ;;
        
    *)
        echo "Usage: $0 {start|stop|reset|logs|db:studio}"
        echo ""
        echo "  start     - Start PostgreSQL and PgAdmin containers"
        echo "  stop      - Stop all containers"
        echo "  reset     - Reset database and restart"
        echo "  logs      - Show container logs"
        echo "  db:studio - Open Prisma Studio"
        exit 1
        ;;
esac