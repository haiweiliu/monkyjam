#!/bin/bash

# Make this script executable with: chmod +x deploy.sh

echo "MonkyJam AI Music Generator Deployment Script"
echo "============================================="
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed or not in PATH"
    exit 1
fi

# Check if the current directory is a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    echo "Error: This directory is not a git repository"
    exit 1
fi

# Menu for deployment options
echo "Select deployment option:"
echo "1) Deploy to Render (recommended)"
echo "2) Deploy using Docker"
echo "3) Prepare for manual deployment"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "Deploying to Render..."
        echo "Make sure you've connected your GitHub repository to Render"
        echo "and have set up your environment variables."
        
        read -p "Do you want to commit and push your changes? (y/n): " push_changes
        if [[ $push_changes == "y" ]]; then
            git add .
            read -p "Enter commit message: " commit_message
            git commit -m "$commit_message"
            git push
            echo "Changes pushed to GitHub. Go to Render dashboard to deploy."
        else
            echo "No changes pushed. Remember to push your changes to deploy."
        fi
        ;;
    
    2)
        echo "Deploying using Docker..."
        
        # Check if Docker is available
        if ! command -v docker &> /dev/null; then
            echo "Error: Docker is not installed or not in PATH"
            exit 1
        fi
        
        # Check if Docker Compose is available
        if ! command -v docker-compose &> /dev/null; then
            echo "Error: Docker Compose is not installed or not in PATH"
            exit 1
        fi
        
        # Build and start the Docker containers
        echo "Building and starting Docker containers..."
        docker-compose up -d --build
        
        echo "Deployment complete. The application is running at:"
        echo "- Frontend: http://localhost:3001"
        echo "- Backend API: http://localhost:8000"
        ;;
    
    3)
        echo "Preparing for manual deployment..."
        
        # Backend preparation
        echo "Building backend..."
        cd backend
        pip install -r requirements.txt
        cd ..
        
        # Frontend preparation
        echo "Building frontend..."
        cd frontend
        npm install
        npm run build
        cd ..
        
        echo "Preparation complete. To deploy manually:"
        echo "1. Backend: Run 'uvicorn main:app --host 0.0.0.0 --port 8000' in the backend directory"
        echo "2. Frontend: Run 'npm start' in the frontend directory"
        ;;
    
    4)
        echo "Exiting..."
        exit 0
        ;;
    
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "Thank you for using MonkyJam AI Music Generator!" 