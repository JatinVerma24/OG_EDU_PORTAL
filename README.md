# 🎓 ogeduAI — Unified LPU Induction & Educational Portal

[![Node.js Version](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-v18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

**ogeduAI** (formerly LPU Induction & Educational Portal) is a unified, high-performance web platform designed to assist incoming freshers and senior students at Lovely Professional University (LPU). Developed to replace legacy fragmented systems, the portal features real-time induction schedules, dynamic checklists, passing criteria calculators, study materials readers, and automated academic scrapers.

> [!NOTE]
> Created, designed, and maintained by **Jatin Verma** (Full Stack Developer, Creator, and Influencer).
> Project Repository: [OG_EDU_PORTAL](https://github.com/JatinVerma24/OG_EDU_PORTAL)

---

## 🗺️ Table of Contents
- [🌟 Key Features](#-key-features)
  - [1. Freshers Induction Guide \& Scheduler](#1-freshers-induction-guide--scheduler)
  - [2. Seniors Portal](#2-seniors-portal)
  - [3. Integrated Mini-Portals](#3-integrated-mini-portals)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🔌 REST API Reference](#-rest-api-reference)
  - [Diagnostic \& Database API](#diagnostic--database-api)
  - [Freshers App API](#freshers-app-api)
  - [Seniors App API](#seniors-app-api)
  - [Academic Scraper \& Cache API (LPU Notes)](#academic-scraper--cache-api-lpu-notes)
- [⚙️ Setup \& Installation](#%EF%B8%8F-setup--installation)
  - [Prerequisites](#prerequisites)
  - [1. Clone \& Install All Dependencies](#1-clone--install-all-dependencies)
  - [2. Configure Database Connection](#2-configure-database-connection)
  - [3. Local DNS Workaround (Crucial for Windows/Local Runs)](#3-local-dns-workaround-crucial-for-windowslocal-runs)
  - [4. Running Locally](#4-running-locally)
- [🚀 Deployment](#-deployment)
  - [Vercel Deployment Routing (`vercel.json`)](#vercel-deployment-routing-verceljson)
- [✒️ Credits](#%EF%B8%8F-credits)

---

## 🌟 Key Features

### 1. Freshers Induction Guide & Scheduler
* ⏱️ **Live Countdown Timer:** Visual timer tracking the exact countdown to upcoming induction phases.
* 📍 **On-Campus Reporting Roadmap:** Interactive step-by-step roadmap guiding students through arrival, OTP verification, document stamping, and hostel check-in.
* 📋 **Dynamic Document Checklist:** Custom checklist generation based on admission categories. States are saved, serialized, and synchronized dynamically using MongoDB Atlas under the student's ID.
* 🔍 **Programme Database:** Quick-filter and search schedules across faculties, blocks, and disciplines.

### 2. Seniors Portal
* 🧮 **Passing Criteria Calculator:** Checks academic pass/fail status against LPU's weightage policies (Attendance, CA, Mid-Term Exam, and End-Term Exam) for both regular and reappear subjects.
* 📖 **Interactive Notes Reader:** Renders C and C++ course units natively from raw Markdown source files in a fluid, readable format.
* ⚡ **Study Catalog Scraper & Proxy API:** Scrapes syllabus, MCQs, and notes from external student portals and caches them in `data/lpu_cache` to accelerate subsequent page loading.

### 3. Integrated Mini-Portals
* 🐍 **Python Notes Course (`/python-notes`):** Interactive 9-unit Python programming curriculum complete with examples, compiled statically.
* 🎓 **CUET College Predictor (`/cuet`):** Single-page score-matching algorithm that predicts admissions targets.
* 💻 **Laptop Finder (`/findoglaptop`):** A custom survey questionnaire recommending ideal laptops based on college branch requirements (CSE, Mech, Biotech, etc.).

---

## 📂 Project Directory Structure

```text
├── controllers/                  # Backend Express controllers
│   ├── lpuNotesController.js     # Scraping, caching, parsing notes & MCQs from external sources
│   └── resourceController.js     # Resources seeder & MongoDB catalog fetcher
├── models/                       # Mongoose schemas
│   └── resourceModel.js          # Resource catalog database schema
├── data/                         # Persistent & parsed JSON storage
│   ├── lpu_catalog.json          # Cached course and subject directory
│   └── lpu_cache/                # Cached html pages scraped via REST controllers
├── landing/                      # Static landing pages (About, Resources, LPU Notes index)
├── frontend/                     # Freshers App (React + Vite, deployed to /fresher)
│   ├── src/                      # Source code (Components, Pages, Assets)
│   └── vite.config.js            # Build configuration for Freshers sub-project
├── senior_portal/                # Seniors Portal
│   ├── client/                   # Seniors App (React + Vite, deployed to /senior)
│   ├── notes/                    # Raw Markdown C/C++ lecture notes
│   └── DEPLOYMENT_GUIDE.md       # Specific deployment instructions for the Senior application
├── findoglaptop/                 # Laptop Finder static single-page application
├── cuet/                         # CUET Predictor static single-page application
├── python-notes/                 # Python Course website & compilation scripts
├── server.js                     # Root Express.js server (Database, APIs, static routing)
├── app.js                        # Client-side JavaScript for the root freshers dashboard
├── index.html                    # Root dashboard HTML served at '/'
├── index.css                     # Premium Glassmorphic style sheet for root dashboard
├── package.json                  # Root configurations and command script mappings
├── vercel.json                   # Vercel Serverless routing config
└── data.json                     # Static programs schedule JSON
```

---

## 🔌 REST API Reference

### Diagnostic & Database API

#### Get Database Connection Status
* **Endpoint:** `GET /api/db-status`
* **Response:**
  ```json
  {
    "readyState": 1,
    "statusText": "connected",
    "error": null,
    "vercelEnv": "production"
  }
  ```

#### Force Data and Session Clear
* **Endpoint:** `GET /clear-data`
* **Description:** Renders a clean UI loading screen while executing client-side scripts to clear `localStorage`, `sessionStorage`, cookies, and unregister stale Service Workers.

---

### Freshers App API

#### Get All Programmes
* **Endpoint:** `GET /api/programmes`
* **Response:** List of academic induction schedules from `data.json`.

#### Retrieve Student Document Checklist
* **Endpoint:** `GET /api/checklists/:studentId`
* **Response:**
  ```json
  {
    "studentId": "12345678",
    "checklist": {
      "Admit Card": true,
      "10th Marksheet": false
    }
  }
  ```

#### Save Student Document Checklist
* **Endpoint:** `POST /api/checklists/:studentId`
* **Request Body:**
  ```json
  {
    "checklist": {
      "Admit Card": true,
      "10th Marksheet": true
    }
  }
  ```

---

### Seniors App API

#### Check Academic Passing Criteria
* **Endpoint:** `POST /api/check`
* **Request Body:**
  ```json
  {
    "attendance": { "obtained": 5, "max": 5 },
    "ca": { "obtained": 25, "max": 30 },
    "mte": { "obtained": 18, "max": 30 },
    "ete": { "obtained": 24, "max": 50 },
    "subjectType": "theory",
    "examType": "regular"
  }
  ```
* **Response:**
  ```json
  {
    "status": "PASS",
    "details": {
      "rule1": {
        "passed": true,
        "description": "Min Marks Criteria (30%)",
        "reason": "ETE is 48.0% (>= 30%)"
      },
      "rule2": {
        "passed": true,
        "description": "Overall Weightage Criteria (40%)",
        "reason": "Overall Score is 62.6% (>= 40%)",
        "score": "62.6"
      }
    }
  }
  ```

#### Submit Feedback
* **Endpoint:** `POST /api/feedback`
* **Request Body:** `{ "name": "Jatin", "email": "jatin@example.com", "score": "5", "message": "Love it!" }`

#### Get C/C++ Lecture Units Metadata
* **Endpoint:** `GET /api/notes`
* **Response:** List of units metadata (IDs, filenames, titles, icons, and theme colors).

#### Get Raw Notes for a Unit
* **Endpoint:** `GET /api/notes/:unitId`
* **Response:** Detailed JSON payload containing the parsed Markdown content of the requested unit file.

#### Get Seeder Academic Resources
* **Endpoint:** `GET /api/resources`
* **Description:** Retrieves curated resources. If the connected MongoDB collection is empty, automatically seeds it with default values.

---

### Academic Scraper & Cache API (LPU Notes)

#### Get Catalog list
* **Endpoint:** `GET /api/lpu-notes/catalog`
* **Description:** Retrieves the scraped course index from `data/lpu_catalog.json`.

#### Get Subject Units Details
* **Endpoint:** `GET /api/lpu-notes/subject?sem=<semester>&code=<subject_code>`
* **Description:** Fetches credits, summary, and units list from the scraping targets. Uses cached files if available under `data/lpu_cache/`.

#### Get Scraping Unit Notes Content
* **Endpoint:** `GET /api/lpu-notes/notes?sem=<semester>&code=<subject_code>&unit=<unit_number>`
* **Description:** Extracts raw markdown notes content blocks from cached HTML or direct proxy queries.

#### Get Scraping Unit MCQs
* **Endpoint:** `GET /api/lpu-notes/mcq?sem=<semester>&code=<subject_code>&unit=<unit_number>`
* **Description:** Parses options, Correct Answers, Katex equations, and Explanations for mock tests.

---

## ⚙️ Setup & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 18 or above recommended)
* A [MongoDB Atlas](https://www.mongodb.com/atlas) cloud database instance

### 1. Clone & Install All Dependencies
Open your workspace terminal and install dependencies for the root, fresher frontend, and senior portal concurrently using:
```bash
npm run install-all
```

### 2. Configure Database Connection
Set up your MongoDB cloud URI in `server.js` or through environment configurations:
```javascript
const MONGO_URI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/ogedu_portal';
```

### 3. Local DNS Workaround (Crucial for Windows/Local Runs)
Some Windows machines suffer from local SRV lookup issues connecting to MongoDB Atlas clusters, returning errors such as `ECONNREFUSED`. 

To combat this, `server.js` has a built-in resolver that overrides system DNS settings to Google Public DNS when running locally (i.e. `process.env.VERCEL` is not set):
```javascript
if (!process.env.VERCEL) {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
        console.log('Local DNS servers set to Google DNS (8.8.8.8, 8.8.4.4)');
    } catch (dnsErr) {
        console.warn('Failed to set custom DNS servers:', dnsErr.message);
    }
}
```

### 4. Running Locally
Launch the backend server, the freshers client, and the seniors client simultaneously:
```bash
npm run dev
```
Open your browser to:
* **Landing Page & Root Dashboard:** [http://localhost:5000/](http://localhost:5000/)
* **Freshers Dashboard App:** [http://localhost:5173/fresher](http://localhost:5173/fresher)
* **Seniors App:** [http://localhost:5174/senior](http://localhost:5174/senior)
* **Mini-Portals:** `/python-notes`, `/cuet`, `/findoglaptop` on port 5000.

---

## 🚀 Deployment

The portal is designed for native deployment to **Vercel** with zero-configuration serverless backend support.

To build both React application bundles:
```bash
npm run build
```
This builds static assets to `/frontend/dist` and `/senior_portal/client/dist` respectively.

### Vercel Deployment Routing (`vercel.json`)
The application relies on `vercel.json` to handle routes, static directories, and fallbacks:
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server.js" },
    { "src": "/fresher/(.*)", "dest": "server.js" },
    { "src": "/senior/(.*)", "dest": "server.js" },
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

---

## ✒️ Credits
* **Jatin Verma** — Full Stack Developer & Creator.
* **Support Contact:** Reach out via GitHub issues on [OG_EDU_PORTAL](https://github.com/JatinVerma24/OG_EDU_PORTAL).
