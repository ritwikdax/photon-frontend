#!/bin/bash

# Google Authentication Setup Script for Photon Frontend
# This script will guide you through setting up Google authentication

echo "🔐 Photon Authentication Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 1
    fi
fi

echo "📦 Step 1: Installing next-auth..."
npm install next-auth@beta

if [ $? -ne 0 ]; then
    echo "❌ Failed to install next-auth. Please run manually:"
    echo "   npm install next-auth@beta"
    exit 1
fi

echo "✅ next-auth installed successfully!"
echo ""

echo "🔑 Step 2: Setting up environment variables..."
echo ""
echo "Please provide the following information:"
echo ""

# Get Google Client ID
read -p "Google Client ID: " GOOGLE_CLIENT_ID

# Get Google Client Secret
read -sp "Google Client Secret: " GOOGLE_CLIENT_SECRET
echo ""

# Generate AUTH_SECRET
echo ""
echo "🔐 Generating AUTH_SECRET..."
AUTH_SECRET=$(openssl rand -base64 32)

# Get NEXTAUTH_URL
read -p "App URL (default: http://localhost:3000): " NEXTAUTH_URL
NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}

# Create .env.local
cat > .env.local << EOF
# Google OAuth Configuration
GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

# NextAuth Configuration
AUTH_SECRET=$AUTH_SECRET

# App URL
NEXTAUTH_URL=$NEXTAUTH_URL
EOF

echo ""
echo "✅ .env.local created successfully!"
echo ""

echo "📋 Configuration Summary:"
echo "========================"
echo "Google Client ID: ${GOOGLE_CLIENT_ID:0:20}..."
echo "Google Client Secret: ***hidden***"
echo "AUTH_SECRET: ***generated***"
echo "NEXTAUTH_URL: $NEXTAUTH_URL"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Make sure you've configured Google OAuth redirect URI:"
echo "   $NEXTAUTH_URL/api/auth/callback/google"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Visit $NEXTAUTH_URL"
echo ""
echo "For detailed instructions, see GOOGLE_AUTH_SETUP.md"
