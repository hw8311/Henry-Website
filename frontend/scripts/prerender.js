/**
 * Build-time prerendering for Henry Wilke portfolio (CRA).
 *
 * After `craco build`, this script:
 *   1. Starts a local static file server serving ./build
 *   2. Visits every public route in a headless Chromium
 *   3. Waits for React to render + the FAQ JSON-LD to be injected
 *   4. Saves the resulting HTML to build/<route>/index.html
 *
 * Result: Google/Bing/LLM crawlers receive fully-rendered HTML on first request,
 * while interactive clients still hydrate normally (see src/index.js).
 *
 * The script is intentionally non-blocking: if Chromium is unavailable in the
 * build environment, prerendering is skipped and the app still ships as a
 * regular SPA (no regression).
 */

const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.resolve(__dirname, "..", "build");
const PORT = 4173;

// Public routes that should be prerendered. Admin is intentionally excluded.
const ROUTES = [
  "/",
  "/leistungen",
  "/referenzen",
  "/blog",
  "/blog/ki-automatisierung-kmu",
  "/blog/produktivitaet-ki-erkenntnisse",
  "/blog/neurodivergent-ki-partnerschaft",
  "/ueber-mich",
  "/automatisierung",
  "/faq",
  "/whitepaper",
  "/kontakt",
  "/impressum",
  "/agb",
  "/datenschutz",
];

const log = (msg) => console.log(`[prerender] ${msg}`);

function startServer() {
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".txt": "text/plain",
    ".xml": "application/xml",
  };

  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(BUILD_DIR, urlPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback: serve index.html for unknown routes so React Router takes over
    const fallback = path.join(BUILD_DIR, "index.html");
    if (fs.existsSync(fallback)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      fs.createReadStream(fallback).pipe(res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, "127.0.0.1", () => {
      log(`static server listening on http://127.0.0.1:${PORT}`);
      resolve(server);
    });
  });
}

async function findExecutable() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
  ].filter(Boolean);

  for (const exe of candidates) {
    if (fs.existsSync(exe)) return exe;
  }
  return null;
}

async function prerender(browser, route) {
  const page = await browser.newPage();
  const url = `http://127.0.0.1:${PORT}${route}`;

  // Force German locale so prerendered snapshots ship the primary content language
  await page.evaluateOnNewDocument(() => {
    try {
      window.localStorage.setItem("preferred-language", "de");
    } catch (e) {
      /* ignore */
    }
  });
  await page.setExtraHTTPHeaders({ "Accept-Language": "de-DE,de;q=0.9" });

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

    // Give React a moment for any post-mount useEffect (e.g. JSON-LD injection on /faq)
    await new Promise((r) => setTimeout(r, 800));

    // Mark this HTML as prerendered so we can debug it later if needed
    const html = await page.content();

    // Write to build/<route>/index.html
    const outDir = path.join(BUILD_DIR, route === "/" ? "" : route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

    log(`  ✓ ${route}`);
  } catch (err) {
    log(`  ✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    log("build/ folder not found — skip prerendering");
    return;
  }

  const exe = await findExecutable();
  if (!exe) {
    log("no Chromium/Chrome executable available — skip prerendering (app still ships as SPA)");
    return;
  }
  log(`using browser: ${exe}`);

  let puppeteer;
  try {
    puppeteer = require("puppeteer-core");
  } catch (e) {
    log("puppeteer-core not installed — skip prerendering");
    return;
  }

  const server = await startServer();
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: exe,
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    log(`prerendering ${ROUTES.length} routes…`);
    for (const route of ROUTES) {
      // eslint-disable-next-line no-await-in-loop
      await prerender(browser, route);
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  log("done");
}

main().catch((err) => {
  log(`fatal: ${err.message}`);
  // Don't fail the overall build — SPA still works
  process.exit(0);
});
