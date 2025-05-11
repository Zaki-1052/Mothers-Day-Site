#!/bin/bash
# start.sh - Script to start both frontend and backend servers

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo -e "${BOLD}🎀 Mother's Day Carousel - Startup Script 🎀${NC}\n"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}ERROR: npm is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Function to install dependencies if node_modules doesn't exist
install_dependencies() {
    local dir=$1
    local name=$2
    
    echo -e "${BLUE}Checking ${name} dependencies...${NC}"
    
    if [ ! -d "$dir/node_modules" ]; then
        echo -e "${YELLOW}Installing ${name} dependencies...${NC}"
        (cd "$dir" && npm install)
        if [ $? -ne 0 ]; then
            echo -e "${YELLOW}Failed to install ${name} dependencies. Please check errors and try again.${NC}"
            exit 1
        fi
        echo -e "${GREEN}${name} dependencies installed successfully!${NC}"
    else
        echo -e "${GREEN}${name} dependencies already installed.${NC}"
    fi
}

# Install server dependencies if needed
install_dependencies "server" "Backend"

# Install frontend dependencies if needed
install_dependencies "src" "Frontend"

echo -e "\n${BOLD}Starting servers...${NC}"
echo -e "${BLUE}Backend will run on http://localhost:3001${NC}"
echo -e "${BLUE}Frontend will run on http://localhost:5173${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Start both servers in parallel
# Use concurrently if available, otherwise use background processes
if command -v npx &> /dev/null && npm list -g concurrently &> /dev/null; then
    npx concurrently \
        "cd server && npm start" \
        "cd src && npm run dev"
else
    # Start backend in background
    (cd server && npm start) &
    SERVER_PID=$!
    
    # Wait a bit for the server to start
    sleep 3
    
    # Start frontend
    (cd src && npm run dev) &
    FRONTEND_PID=$!
    
    # Handle script termination
    trap "kill $SERVER_PID $FRONTEND_PID; exit" INT TERM
    
    # Wait for processes to finish
    wait $SERVER_PID $FRONTEND_PID
fi