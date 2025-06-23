# Deployment Guide for Canadian Solutions

## Prerequisites

1. **MongoDB Atlas Account**: Create a free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
3. **GitHub Repository**: Your code should be pushed to GitHub

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/CanadianSolutions?retryWrites=true&w=majority`)
6. Replace `<password>` with your actual password
7. Save this connection string - you'll need it for deployment

## Step 2: Prepare Your Environment Variables

You'll need these environment variables for deployment:

```
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=a-very-long-random-secret-key-for-jwt-tokens
NODE_ENV=production
```

**Generate a strong JWT secret**: Use a tool like [randomkeygen.com](https://randomkeygen.com/) or run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 3: Deploy on Render (Recommended - Free Tier)

### Deploy Full-Stack on Render:

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

   - **Name**: `canadian-solutions`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run clientinstall && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables:

   - Click "Environment" tab
   - Add your variables:
     ```
     MONGODB_URI=mongodb+srv://safiuddinahmedmohammad:Ishaal@2507@cluster0.pb6taif.mongodb.net/CanadianSolutions?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=178e55205b5e27cfb0ce7754491ebb687823e9b5a2a6b64b15a92592bed034ae41af1ac3492a65b8ad37e72ac82d0842352c8b9f7f1c067f1edb32c8bb7d9e43
     NODE_ENV=production
     NODE_OPTIONS=--openssl-legacy-provider
     ```

6. Click "Create Web Service"

### Deploy Frontend:

1. In Render dashboard, click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure:

   - **Name**: `canadian-solutions-app`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`

4. Add Environment Variable:

   - `REACT_APP_API_URL=https://your-backend-url.onrender.com`

5. Click "Create Static Site"

## Step 4: Update Client API Calls (if needed)

If your React app makes API calls to localhost, you may need to update them to use the production API URL.

## Alternative: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect it's a Node.js app
6. Add environment variables in the Variables tab
7. Your app will be deployed automatically

## Alternative: Deploy Full-Stack on Render

You can also deploy both frontend and backend as a single service:

1. Create a Web Service on Render
2. Use these settings:
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `npm start`
3. Add all environment variables
4. The backend will serve the built React app

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:

   - Check your connection string
   - Ensure your IP is whitelisted in MongoDB Atlas (or use 0.0.0.0/0 for all IPs)

2. **Build Fails**:

   - Check that all dependencies are in package.json
   - Ensure Node.js version compatibility

3. **Environment Variables Not Working**:

   - Double-check variable names (case-sensitive)
   - Restart the service after adding variables

4. **CORS Issues**:
   - Update CORS settings in server.js if needed
   - Ensure frontend URL is allowed

### Logs and Debugging:

- Check deployment logs in Render dashboard
- Use `console.log()` statements for debugging
- Monitor MongoDB Atlas logs for database issues

## Post-Deployment

1. Test all functionality:

   - User registration/login
   - Creating businesses/posts
   - Navigation between pages

2. Set up monitoring (optional):

   - Use Render's built-in monitoring
   - Set up MongoDB Atlas alerts

3. Custom Domain (optional):
   - Add your custom domain in Render settings
   - Update DNS records as instructed

## Cost Breakdown (Free Tier)

- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (750 hours/month, sleeps after 15min inactivity)
- **Total**: $0/month

Your app will "sleep" after 15 minutes of inactivity on the free tier, taking ~30 seconds to wake up on the first request.
