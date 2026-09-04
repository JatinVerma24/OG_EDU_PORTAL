# 🚀 Complete Deployment Guide: From Scratch to Vercel

This guide assumes you have the code on your computer but haven't put it on GitHub or Vercel yet.

## Phase 1: GitHub Setup (Put your code online)

1.  **Create a GitHub Repository**:
    *   Go to [github.com/new](https://github.com/new).
    *   Repository Name: `reappear-checker`.
    *   Visibility: **Public** (easier) or Private.
    *   **Do NOT** initialize with README, .gitignore, or License (keep it empty).
    *   Click **Create repository**.

2.  **Push Code from your Computer**:
    *   Open your terminal (Command Prompt or PowerShell) in the project folder: `C:\Users\Jatin\Desktop\REAPPEAR CHECKER`.
    *   Run these commands one by one:
        ```bash
        git init
        git add .
        git commit -m "Initial commit"
        git branch -M main
        # Replace URL below with YOUR repository URL from step 1
        git remote add origin https://github.com/YOUR_USERNAME/reappear-checker.git
        git push -u origin main
        ```
    *   *Refresh your GitHub page. You should see your code there.*

---

## Phase 2: Deploy Backend (The Server)

1.  **Log in to Vercel**:
    *   Go to [vercel.com](https://vercel.com) and log in with **GitHub**.

2.  **Import Project**:
    *   Click **"Add New..."** -> **"Project"**.
    *   Find `reappear-checker` in the list and click **Import**.

3.  **Configure Backend**:
    *   **Project Name**: `reappear-checker-server`.
    *   **Root Directory**: Click **Edit** and select the `server` folder. **(CRITICAL STEP)**.
    *   Leave other settings as default.
    *   Click **Deploy**.

4.  **Get the URL**:
    *   Once deployed, copy the **Domain** (link) provided by Vercel (e.g., `https://reappear-checker-server.vercel.app`).
    *   **Save this URL**, you need it for the next step.

---

## Phase 3: Deploy Frontend (The Website)

1.  **Import Project Again**:
    *   Go back to Vercel Dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import the **same** `reappear-checker` repository again.

2.  **Configure Frontend**:
    *   **Project Name**: `reappear-checker-client` (or just `reappear-checker`).
    *   **Root Directory**: Click **Edit** and select the `client` folder. **(CRITICAL STEP)**.
    *   **Framework Preset**: It should say `Vite` automatically.

3.  **Connect to Backend** (Environment Variable):
    *   Scroll down to **Environment Variables**.
    *   **Key**: `VITE_API_URL`
    *   **Value**: The Backend URL you copied in Phase 2 (e.g., `https://reappear-checker-server.vercel.app`). *Make sure there is NO slash `/` at the very end.*
    *   Click **Add**.

4.  **Deploy**:
    *   Click **Deploy**.

## 🎉 Success!
Vercel will give you a link to your live website. Share it with everyone!
