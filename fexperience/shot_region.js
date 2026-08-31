const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.evaluate(() => { const el = document.querySelector(".fixed.inset-0.z-\\[100\\]"); if (el) el.style.display = "none"; });
  await page.waitForTimeout(500);
  await page.evaluate(() => { document.querySelector(".region-selector").scrollIntoView({ block: "center" }); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "C:\\Users\\Charki\\AppData\\Local\\Temp\\opencode\\region_v3.png", clip: await page.evaluate(() => { const r = document.querySelector(".region-selector").getBoundingClientRect(); return { x: r.x, y: r.y - 120, width: r.width, height: r.height + 200 }; }) });
  await browser.close();
  console.log("shot saved");
})();
