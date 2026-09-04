# 🎓 ogeduAI — Technical Project Details & Portfolio Alignment

## 📄 Consolidated Project Summary (Aligned with Job Profile)
**ogeduAI** (deployed at https://ogedu-portal.vercel.app/) is a high-performance, responsive full-stack web application built using **React.js, Vite, and Node.js/Express.js** that streamlines academic logistics and student onboarding. On the frontend, it delivers a mobile-first, glassmorphic UI featuring a real-time countdown timer, an interactive document checklist, and a responsive C/C++ lecture notes reader. The backend is structured around modular REST APIs and microservice-like endpoints, integrating **MongoDB Atlas** for database persistence, **Firebase JWT token authentication** for secure route guards, and a **Cheerio-based scraping engine** optimized with a **Redis caching layer** to achieve sub-100ms response times. Demonstrating strong software engineering and algorithmic principles, the system implements a custom passing criteria calculator that acts as a fintech-style rule engine, a multi-word search search-expansion algorithm for schedule queries, and robust security middleware including `mongo-sanitize` for NoSQL injection protection, **Helmet** secure headers, and API rate-limiting.

---

## 🛠️ Tech Stack Overview

- **Frontend**: React.js (v18), Vite, TypeScript, Vanilla CSS (Glassmorphic Design), HTML5, JavaScript (ES6+), Firebase Client SDK.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose ORM), Redis Caching, Firebase Admin SDK.
- **Performance & Security**: Cheerio (web scraping), Express-Rate-Limit, Helmet (secure headers), Mongo-Sanitize, Winston (daily rotating logger), Sentry (error tracking), Prometheus (metrics collection).
- **Deployment & Architecture**: Vercel Serverless Routing, Docker, Docker Compose, Nginx Proxy.

---

## 💼 Core Alignment with Job Profile Responsibilities

### 1. Building Responsive, High-Performance Web Interfaces
- **Responsive & Mobile-First Design**: Developed multiple highly responsive web clients (Freshers Portal, Seniors Portal, CUET Predictor, Laptop Finder) using fluid grid layouts, flexbox, CSS variables, and media queries tailored for mobile devices.
- **High-Performance Rendering**: Utilized React 18 with Vite for instant page loads, fast hot module replacement (HMR), and code splitting, ensuring a Lighthouse performance score exceeding 90.
- **Dynamic Elements**: Programmed complex interactive elements including a real-time countdown timer, dynamic on-campus reporting roadmaps, and collapsible FAQ accordions with smooth animations.

### 2. Converting UI/UX Designs into Interactive Features
- **Interactive Checklist**: Built an admission document checklist that dynamically adjusts items based on the student's admission category.
- **Interactive Course Notes Reader**: Created a custom, high-fidelity markdown parser that renders complex lecture materials (like C/C++ programming units) with rich formatting, styling, and syntax highlighting on the client side.
- **Interactive Calculators**: Coded a passing criteria calculator implementing custom multi-stage rule-checking algorithms.

### 3. API Integration & Server-Side Logic Collaboration
- **Dynamic State Synchronization**: Connected the frontend client with the Express.js backend to enable seamless saving, retrieving, and synchronization of checklist state using MongoDB Atlas under the student's unique ID.
- **Auth Guard Integration**: Integrated Firebase JWT authentication middleware on both client and server side. Restricts access to student portals based on their registration ID batches.
- **Academic Scrapers & Caching**: Engineered a backend scraper controller using Cheerio to extract course catalog data and notes from external portals, serving them through optimized REST APIs and caching them to avoid redundant network overhead.

### 4. Microservices & API Implementations
- **Modular Services Design**: Structured the backend routes into clean, single-responsibility micro-modules:
  - **Diagnostic Service**: Health checks and database connection status APIs.
  - **Freshers Service**: Academic schedules and registration checklist endpoints.
  - **Seniors Service**: Passing criteria calculations and feedback APIs.
  - **Scraper & Caching Service**: Content proxies and Redis/File-based caching.
- **Middleware Infrastructure**: Implemented enterprise-grade middlewares including request sanitization (`mongo-sanitize`), rate limiting, Winston logging, and Sentry monitoring to ensure robust API resilience.

### 5. Fintech Ecosystem Modularity & Analogy
While built for academic logistics, the underlying system design directly mirrors core Fintech application patterns:
- **Calculation Rule Engine**: The Passing Criteria Calculator mimics complex fintech interest or credit risk evaluation engines. It calculates overall scores based on weighted continuous assessments, mid-terms, and final exam marks, evaluating them against strict conditional thresholds.
- **Atomic State Sync**: The document checklist state tracking mirrors ledger balance synchronization. State transitions (checked/unchecked) are transmitted securely and updated atomically in the database to prevent write conflicts.
- **Rate-Limiting & Security**: Essential security mechanisms (helmet headers, input sanitization, API rate-limiting) replicate transaction-security protocols required to defend financial applications against injection and DDoS attacks.
- **Distributed Caching**: Redis-based caching handles data-intensive syllabus scraping queries, resembling the caching of high-frequency market or account balance data in payment networks to guarantee sub-100ms response times.

### 6. Version Control & Modular Delivery
- Maintained a clean project structure utilizing standard Git practices, segregating frontend applications, backend services, and static portals into clear directory trees.
- Allowed independent local execution and isolated production deployments via modular package configurations.
