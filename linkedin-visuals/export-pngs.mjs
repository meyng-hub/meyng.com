import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const visuals = [
  {
    file: "01-personal-banner.html",
    name: "01-personal-banner",
    width: 1584,
    height: 396,
    selector: ".banner",
  },
  {
    file: "02-company-logo.html",
    name: "02-company-logo",
    width: 300,
    height: 300,
    selector: ".logo-box",
  },
  {
    file: "03-company-cover.html",
    name: "03-company-cover",
    width: 1128,
    height: 191,
    selector: ".cover",
  },
  {
    file: "04-post-launch.html",
    name: "04-post-launch",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "05-post-sangoai.html",
    name: "05-post-sangoai",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "06-post-stats.html",
    name: "06-post-stats",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "07-post-tech-stack.html",
    name: "07-post-tech-stack",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "08-post-community.html",
    name: "08-post-community",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "09-post-quote.html",
    name: "09-post-quote",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "10-post-story-map.html",
    name: "10-post-story-map",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "11-post-obetrack.html",
    name: "11-post-obetrack",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "12-post-endara.html",
    name: "12-post-endara",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "13-post-connectz.html",
    name: "13-post-connectz",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "14-post-pwa-feature.html",
    name: "14-post-pwa-feature",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "15-post-ai-access.html",
    name: "15-post-ai-access",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "16-post-monthly-recap.html",
    name: "16-post-monthly-recap",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "17-post-language-extinction.html",
    name: "17-post-language-extinction",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "18-post-serverless.html",
    name: "18-post-serverless",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "19-post-lessons.html",
    name: "19-post-lessons",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "20-post-endara-vision.html",
    name: "20-post-endara-vision",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "21-post-poll.html",
    name: "21-post-poll",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "22-post-pm-to-builder.html",
    name: "22-post-pm-to-builder",
    width: 1200,
    height: 627,
    selector: ".card",
  },
  {
    file: "23-post-myth-unconnected.html",
    name: "23-post-myth-unconnected",
    width: 1200,
    height: 627,
    selector: ".card",
  },
];

const outputDir = path.join(__dirname, "png");

async function exportAll() {
  // Create output directory
  const fs = await import("fs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const visual of visuals) {
    const page = await browser.newPage();

    // Set viewport large enough to render the visual at full size
    await page.setViewport({
      width: visual.width + 200,
      height: visual.height + 200,
      deviceScaleFactor: 2, // 2x for retina-quality PNGs
    });

    const filePath = `file://${path.join(__dirname, visual.file).replace(/\\/g, "/")}`;
    await page.goto(filePath, { waitUntil: "networkidle0", timeout: 15000 });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    // Extra wait for any CSS transitions
    await new Promise((r) => setTimeout(r, 1000));

    // Screenshot just the visual element
    const element = await page.$(visual.selector);
    if (element) {
      const outputPath = path.join(outputDir, `${visual.name}.png`);
      await element.screenshot({ path: outputPath, type: "png" });
      const stats = fs.statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(
        `  ${visual.name}.png (${visual.width}x${visual.height} @2x) — ${sizeKB} KB`,
      );
    } else {
      console.log(
        `  WARNING: Could not find ${visual.selector} in ${visual.file}`,
      );
    }

    await page.close();
  }

  await browser.close();
  console.log(`\nDone! ${visuals.length} PNGs exported to: ${outputDir}`);
}

exportAll().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
