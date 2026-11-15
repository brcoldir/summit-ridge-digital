// Interaction parity check against the live site. The contact endpoint is intercepted, so nothing is really submitted.
import { chromium } from "@playwright/test";

const LIVE = process.env.LIVE_URL || "https://summitridgedigital.com";
const LOCAL = process.env.LOCAL_URL || "http://localhost:4173";
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });

async function run(base) {
  const out = {};
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  let payload = null;
  await page.route("**/summitridgecontactstage/contact", async (route) => {
    payload = JSON.parse(route.request().postData() || "{}");
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}", headers: { "access-control-allow-origin": "*" } });
  });
  await page.goto(base + "/?utm_source=test&utm_campaign=parity", { waitUntil: "networkidle" });
  await page.click(".menu-button");
  out.menuOpen = await page.getAttribute("#primary-navigation", "class");
  await page.click("#primary-navigation a[href='/#about']");
  out.menuAfterClick = await page.getAttribute("#primary-navigation", "class");
  out.faqInitiallyOpen = await page.$$eval(".faq-item", (els) => els.map((e) => e.getAttribute("aria-expanded")).join(","));
  await page.click(".faq-item >> nth=2");
  out.faqAfterClick = await page.$$eval(".faq-item", (els) => els.map((e) => e.getAttribute("aria-expanded")).join(","));
  const form = page.locator("#contact form");
  await form.locator("button").click();
  out.invalidMessage = await form.locator(".form-note.error").textContent().catch(() => null);
  await form.locator("input[name=name]").fill("Parity Test");
  await form.locator("input[name=email]").fill("parity@example.com");
  await form.locator("input[name=company]").fill("Test Co");
  await form.locator("textarea[name=challenge]").fill("Testing");
  await form.locator("button").click();
  await page.waitForSelector(".form-success", { timeout: 5000 }).catch(() => null);
  out.success = await page.locator(".form-success").textContent().catch(() => null);
  if (payload) {
    payload.submission_id = payload.submission_id?.startsWith("lead_") ? "lead_<id>" : payload.submission_id;
  }
  out.payload = payload;
  await page.goto(base + "/ai-lead-systems", { waitUntil: "networkidle" });
  await page.click(".campaign-faq-item >> nth=1 >> button");
  out.campaignFaq = await page.$$eval(".campaign-faq-item button", (els) => els.map((e) => e.getAttribute("aria-expanded") + ":" + e.getAttribute("aria-controls")).join(","));
  out.campaignFormRows = await page.getAttribute(".campaign-form-wrap textarea", "rows");
  await ctx.close();
  return out;
}
const live = await run(LIVE);
const local = await run(LOCAL);
let ok = true;
for (const key of Object.keys(live)) {
  const same = JSON.stringify(live[key]) === JSON.stringify(local[key]);
  ok &&= same;
  console.log(same ? "SAME" : "DIFF", key, same ? JSON.stringify(live[key]) : `\n  live:  ${JSON.stringify(live[key])}\n  local: ${JSON.stringify(local[key])}`);
}
await browser.close();
process.exit(ok ? 0 : 1);
