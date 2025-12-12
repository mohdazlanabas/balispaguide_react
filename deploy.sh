#!/bin/bash
# Deployment script for DigitalOcean Droplet
# Usage: ./deploy.sh <droplet-ip>

if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh <droplet-ip>"
    echo "Example: ./deploy.sh 157.230.xxx.xxx"
    exit 1
fi

DROPLET_IP=$1

echo "🚀 Deploying to DigitalOcean Droplet: $DROPLET_IP"
echo "================================================"

ssh root@$DROPLET_IP << ENDSSH
    echo "📥 Pulling latest code from GitHub..."
    cd /root/balispaguidw_react
    git pull

    echo "🔧 Updating backend dependencies..."
    cd backend
    npm ci --omit=dev

    echo "🔄 Restarting backend with pm2..."
    pm2 restart bali-backend
    pm2 save

    echo "🏗️  Building frontend..."
    cd ../frontend
    npm ci
    VITE_API_BASE=http://$DROPLET_IP npm run build

    echo "📦 Deploying frontend to web root..."
    rsync -a --delete dist/ /var/www/balispaguide/

    echo "♻️  Reloading Nginx..."
    systemctl reload nginx

    echo "✅ Deployment complete!"
    echo ""
    echo "🔍 Running smoke tests..."
    echo "Backend API:"
    curl -s http://127.0.0.1:4000/api/filters | head -c 100
    echo ""
    echo ""
    echo "pm2 status:"
    pm2 status
ENDSSH

echo ""
echo "================================================"
echo "✅ Deployment finished!"
echo "🌐 Visit: http://$DROPLET_IP"
echo "================================================"
