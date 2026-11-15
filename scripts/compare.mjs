// Visual and text comparison of a local build against the live site.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/compare.mjs [outDir]
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const LIVE = process.env.LIVE_URL || "https://summitridgedigital.com";
const LOCAL = process.env.LOCAL_URL || "http://localhost:4173";
const OUT = process.argv[2] || "compare-output";
const ROUTES = ["/", "/ai-automation", "/ai-lead-systems", "/ai-websites", "/privacy", "/terms", "/this-page-does-not-exist"];
const VIEWPORTS = { desktop: { width: 1280, height: 900 }, mobile: { width: 390, height: 844 } };

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const results = [];

async function capture(page, url, file) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // let entrance animations finish
  await page.screenshot({ path: file, fullPage: true });
  return page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
    text: document.body.innerText.replace(/\s+/g, " ").trim(),
    links: [...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).join(" "),
  }));
}

function diff(aFile, bFile, outFile) {
  const a = PNG.sync.read(fs.readFileSync(aFile));
  const b = PNG.sync.read(fs.readFileSync(bFile));
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const pad = (img) => {
    const out = new PNG({ width, height });
    out.data.fill(255);
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const pa = pad(a), pb = pad(b), d = new PNG({ width, height });
  const changed = pixelmatch(pa.data, pb.data, d.data, width, height, { threshold: 0.1 });
  fs.writeFileSync(outFile, PNG.sync.write(d));
  return { changed, ratio: changed / (width * height), sizes: `${a.width}x${a.height} vs ${b.width}x${b.height}` };
}

for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const route of ROUTES) {
    const slug = route === "/" ? "home" : route.slice(1);
    const liveFile = path.join(OUT, `${slug}-${vpName}-live.png`);
    const localFile = path.join(OUT, `${slug}-${vpName}-local.png`);
    const live = await capture(page, LIVE + route, liveFile);
    const local = await capture(page, LOCAL + route, localFile);
    const pixels = diff(liveFile, localFile, path.join(OUT, `${slug}-${vpName}-diff.png`));
    results.push({
      route,
      viewport: vpName,
      sameTitle: live.title === local.title,
      sameDescription: live.description === local.description,
      sameText: live.text === local.text,
      sameLinks: live.links === local.links,
      textLength: [live.text.length, local.text.length],
      ...pixels,
    });
    if (live.text !== local.text) {
      fs.writeFileSync(path.join(OUT, `${slug}-${vpName}-text.json`), JSON.stringify({ live: live.text, local: local.text }, null, 2));
    }
  }
  await context.close();
}
await browser.close();
fs.writeFileSync(path.join(OUT, "results.json"), JSON.stringify(results, null, 2));
console.table(results.map(({ route, viewport, sameTitle, sameDescription, sameText, sameLinks, ratio, sizes }) => ({ route, viewport, sameTitle, sameDescription, sameText, sameLinks, diffPct: (ratio * 100).toFixed(3), sizes })));
