/**
 * scripts/sync-next-assets.js
 * Synchronizes freshly built Next.js artifacts (.next/static, .next/server/app/...)
 * into landing/ so Express and Vercel can serve them statically with 100% matched hashes.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const NEXT_STATIC = path.join(ROOT_DIR, '.next', 'static');
const LANDING_STATIC = path.join(ROOT_DIR, 'landing', '_next', 'static');

const NEXT_APP_SERVER = path.join(ROOT_DIR, '.next', 'server', 'app');
const LANDING_DIR = path.join(ROOT_DIR, 'landing');

function copyRecursiveSync(src, dest, filterExt = null) {
  const exists = fs.existsSync(src);
  if (!exists) return;

  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), filterExt);
    });
  } else {
    if (filterExt && !src.endsWith(filterExt)) {
      return; // Skip non-matching extension
    }
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

console.log('🔄 Starting Next.js to Landing synchronization...');

// 1. Sync .next/static -> landing/_next/static (all chunks, manifests, etc.)
if (fs.existsSync(NEXT_STATIC)) {
  console.log(`📁 Syncing static chunks: ${NEXT_STATIC} -> ${LANDING_STATIC}`);
  cleanDir(LANDING_STATIC);
  copyRecursiveSync(NEXT_STATIC, LANDING_STATIC);
  console.log('✅ Static chunks synchronized successfully.');
} else {
  console.warn('⚠️ .next/static does not exist. Did next build run?');
}

// 2. Sync youtube-study-hub.html
const nextHubHtml = path.join(NEXT_APP_SERVER, 'youtube-study-hub.html');
const landingHubHtml = path.join(LANDING_DIR, 'youtube-study-hub.html');
if (fs.existsSync(nextHubHtml)) {
  fs.copyFileSync(nextHubHtml, landingHubHtml);
  console.log(`✅ Synced ${nextHubHtml} -> ${landingHubHtml}`);
}

// 3. Sync all pre-rendered subject HTML pages under youtube-study-hub/
const nextHubDir = path.join(NEXT_APP_SERVER, 'youtube-study-hub');
const landingHubDir = path.join(LANDING_DIR, 'youtube-study-hub');
if (fs.existsSync(nextHubDir)) {
  console.log(`📁 Syncing pre-rendered subject HTML pages: ${nextHubDir} -> ${landingHubDir}`);
  copyRecursiveSync(nextHubDir, landingHubDir, '.html');
  console.log('✅ Pre-rendered subject HTML pages synced.');
}

// 4. Sync midterm HTML pages if present
const nextMidtermHtml = path.join(NEXT_APP_SERVER, 'midterm.html');
const landingMidtermDir = path.join(LANDING_DIR, 'midterm');
if (fs.existsSync(nextMidtermHtml)) {
  fs.copyFileSync(nextMidtermHtml, path.join(landingMidtermDir, 'index.html'));
  console.log('✅ Synced midterm.html -> landing/midterm/index.html');
}
const nextMidtermDir = path.join(NEXT_APP_SERVER, 'midterm');
if (fs.existsSync(nextMidtermDir)) {
  copyRecursiveSync(nextMidtermDir, landingMidtermDir, '.html');
  console.log('✅ Synced midterm HTML subpages to landing/midterm');
}

console.log('🎉 Next.js assets synchronization complete!');
