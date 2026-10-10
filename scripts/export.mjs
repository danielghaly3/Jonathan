// Exports the /print card as a 300 dpi PNG (1500 x 2100) and a 5 x 7 in PDF into ./exports.
// Usage: npm run export            (builds, serves on a spare port, exports, stops)
//        npm run export -- <url>   (export from an already running site, e.g. http://localhost:3000)
import { spawn, execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const PORT = 3417;
let base = process.argv[2];
let server;

if (!base) {
  execSync("npx next build", { stdio: "inherit" });
  server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore", detached: true });
  base = `http://localhost:${PORT}`;
  for (let i = 0; ; i++) {
    try { if ((await fetch(base)).ok) break; } catch {}
    if (i > 60) throw new Error("Server did not start");
    await new Promise((r) => setTimeout(r, 500));
  }
}

try {
  mkdirSync("exports", { recursive: true });
  const browser = await chromium.launch();
  // 5 in at 96 css px/in = 480px; scale 3.125 gives 1500 px = 300 dpi.
  const page = await browser.newPage({ viewport: { width: 600, height: 800 }, deviceScaleFactor: 3.125, colorScheme: "light", reducedMotion: "reduce" });
  await page.goto(`${base}/print`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#card").screenshot({ path: "exports/invitation-5x7.png" });
  await page.pdf({ path: "exports/invitation-5x7.pdf", width: "5in", height: "7in", printBackground: true, pageRanges: "1" });
  await browser.close();
  console.log("Saved exports/invitation-5x7.png (1500 x 2100) and exports/invitation-5x7.pdf");
} finally {
  if (server) process.kill(-server.pid);
}
