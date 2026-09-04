# 🚀 Deployment Guide: Backend on Render

This guide explains how to deploy your **Node.js Server** to **Render** and connect it to your Vercel Frontend.

## Phase 1: Prepare the Code (We just did this!)

1.  I have already updated `server/server.js` to use the correct Port settings for Render.
2.  **Push these changes to GitHub** (if you haven't yet, runs these commands in terminal):
    ```bash
    git add .
    git commit -m "Update PORT for Render deployment"
    git push
    ```

## Phase 2: Deploy Backend to Render

1.  **Log in to Render**:
    *   Go to [dashboard.render.com](https://dashboard.render.com/).
    *   Log in with **GitHub**.

2.  **Create New Web Service**:
    *   Click the **"New +"** button and select **"Web Service"**.
    *   Find your `reappear-checker` repository and click **"Connect"**.

3.  **Configure the Service**:
    *   **Name**: `reappear-checker-backend` (or similar).
    *   **Root Directory**: `server` (Important! This tells Render where your backend code lives).
    *   **Runtime**: `Node`.
    *   **Build Command**: `npm install`.
    *   **Start Command**: `node server.js`.
    *   **Plan**: Select **"Free"**.

4.  **Deploy**:
    *   Click **"Create Web Service"**.
    *   Wait for the deployment to finish. You should see "Live" or a green checkmark.

5.  **Get the Backend URL**:
    *   Copy the URL provided by Render at the top left (e.g., `https://reappear-checker-backend.onrender.com`).
    *   **Note:** Render free tier spins down after inactivity. Your first request might take 50 seconds.

## Phase 3: Connect Frontend (Vercel) to Render Backend

Now we need to tell your Vercel frontend to talk to this new Render backend instead of the old Vercel one.

1.  Go to your **Vercel Dashboard** -> Select your Project.
2.  Go to **Settings** -> **Environment Variables**.
3.  Find `VITE_API_URL`.
4.  **Edit** it and paste your **NEW Render Backend URL**.
    *   Example Value: `https://reappear-checker-backend.onrender.com`
    *   (No trailing slash `/` at the end).
5.  Click **Save**.
6.  **Redeploy Frontend**:
    *   Go to the **Deployments** tab.
    *   Click the three dots `...` on the latest deployment -> **Redeploy**.
    *   This is required for the new Environment Variable to take effect.

## 🎉 Done!
Your Frontend is now hosted on Vercel, and your Backend is hosted on Render!
