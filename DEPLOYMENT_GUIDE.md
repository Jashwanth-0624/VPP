# VPP Nexus Deployment Guide

## Prerequisites

Before deploying VPP Nexus, you need to install Node.js and npm:

### Install Node.js

1. **Download Node.js**
   - Go to [nodejs.org](https://nodejs.org/)
   - Download the LTS version (recommended)
   - Choose the Windows Installer (.msi) for your system

2. **Install Node.js**
   - Run the downloaded installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation

3. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Render Deployment

### Method 1: Automatic Deployment (Recommended)

1. **Prepare Your Repository**
   - Push your code to GitHub
   - Ensure all files are committed

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `vpp-nexus`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`
   - Click "Create Static Site"

3. **Wait for Deployment**
   - Render will automatically build and deploy
   - You'll get a URL like `https://vpp-nexus.onrender.com`

### Method 2: Manual Deployment

If you prefer to deploy manually:

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload to Hosting Provider**
   - Upload the contents of the `dist` folder
   - Configure your hosting provider for SPA routing

## Alternative: Static HTML Version

If you don't want to use Node.js, you can use the static HTML version:

1. **Download the static files**
2. **Upload to any web hosting service**
3. **Configure for SPA routing** (redirect all routes to index.html)

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**
   - Node.js is not installed or not in PATH
   - Reinstall Node.js and ensure "Add to PATH" is checked

2. **Build fails**
   - Check Node.js version (should be 16+)
   - Clear cache: `npm cache clean --force`
   - Delete node_modules and reinstall

3. **Deployment fails on Render**
   - Check build command is correct
   - Verify publish directory is `dist`
   - Check Render logs for specific errors

### Performance Tips

- Enable gzip compression on your hosting provider
- Set up CDN for static assets
- Configure proper caching headers

## Environment Variables

For production deployment, you can set these environment variables:

- `NODE_ENV=production`
- `VITE_APP_TITLE=VPP Nexus`
- `VITE_APP_VERSION=1.0.0`

## Security Considerations

- The application is client-side only
- No sensitive data should be stored in the frontend
- Use HTTPS in production
- Consider implementing authentication if needed

## Support

If you encounter issues:
1. Check the console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility
4. Check Render deployment logs

---

**Ready to deploy?** Follow the Render deployment steps above and your VPP Nexus dashboard will be live in minutes!
