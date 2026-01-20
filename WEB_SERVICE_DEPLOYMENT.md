# Web Service Deployment Guide

Your Ekthaa website is now configured to deploy as a **Web Service** on Render.

## What Changed

I've set up your project to run as a Node.js web service that serves your built React app:

1. ✅ Created `server.js` - Express server to serve your built files
2. ✅ Updated `package.json` - Added Express dependency and start script
3. ✅ Updated `render.yaml` - Changed from static site to web service

## Fill Out the Render Form

Now you can complete the Render deployment form with these values:

| Field | Value |
|-------|-------|
| **Name** | `ekthaa-website` |
| **Project** | Leave as is or select a project (optional) |
| **Language** | `Node` ✅ (correct for web service) |
| **Branch** | `main` |
| **Region** | `Singapore (Southeast Asia)` ✅ (good for India) |
| **Root Directory** | Leave **empty** |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

## Add Environment Variables

After filling the form, scroll down to **Environment Variables** and add:

**Variable 1:**
- Key: `VITE_API_BASE_URL`
- Value: `https://ekthaacustomer-955272392528.asia-south1.run.app/api`

**Variable 2:**
- Key: `VITE_CHATBOT_API_URL`
- Value: `https://rag-chatbot-gaef.onrender.com`

## How It Works

1. **Build Phase**: Render runs `npm install && npm run build`
   - Installs all dependencies
   - Builds your Vite app into the `dist` folder

2. **Start Phase**: Render runs `npm start`
   - Starts the Express server (`server.js`)
   - Serves files from the `dist` folder
   - Handles SPA routing (all routes go to `index.html`)

3. **Runtime**: Your app runs on a Node.js server
   - Listens on the port provided by Render (via `PORT` env variable)
   - Serves your React app
   - Handles all routes properly (including `/tracker`)

## Next Steps

1. **Click "Create Web Service"** in Render
2. **Wait for build** - Monitor the logs
3. **Get your URL** - You'll get a URL like `https://ekthaa-website.onrender.com`
4. **Test it** - Visit your site and test all routes

## Commit and Push

Before deploying, commit these changes:

```bash
git add .
git commit -m "Configure for web service deployment"
git push origin main
```

Then proceed with the Render deployment!

## Free Tier Note

Render's free tier for web services:
- ✅ Free hosting
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Takes ~30 seconds to wake up on first request
- ✅ Perfect for testing and small projects

If you need always-on hosting, consider upgrading to a paid plan ($7/month).
