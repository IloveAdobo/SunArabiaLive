/**
 * Bakes each template's 3D hero into a transparent WebP for the template cards.
 *
 * Usage:
 *   1. npm run dev            (note the URL, e.g. http://localhost:5173)
 *   2. node scripts/bake-template-heroes.mjs http://localhost:5173 [slug ...]
 *
 * Needs Google Chrome. Set CHROME_PATH if it is not in the default location.
 * Writes src/assets/template-heroes/<slug>.webp
 */
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { templates } from "../src/data/templates.js";

const [base = "http://localhost:5173", ...only] = process.argv.slice(2);
const chrome =
  process.env.CHROME_PATH ??
  {
    win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  }[process.platform] ??
  "google-chrome";
const outDir = join(dirname(fileURLToPath(import.meta.url)), "../src/assets/template-heroes");
mkdirSync(outDir, { recursive: true });

const port = 9400 + Math.floor(Math.random() * 400);
const browser = spawn(chrome, [
  "--headless=new",
  "--use-angle=swiftshader",
  "--enable-unsafe-swiftshader",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "bake-"))}`,
  "about:blank",
]);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let targets;
for (let i = 0; i < 50 && !targets; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  } catch {
    await wait(200);
  }
}
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((resolve) => (ws.onopen = resolve));
let id = 0;
const pending = {};
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  pending[message.id]?.(message);
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    pending[++id] = resolve;
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Emulation.setDeviceMetricsOverride", {
  width: 640,
  height: 640,
  deviceScaleFactor: 1,
  mobile: false,
});

const list = only.length ? templates.filter((t) => only.includes(t.slug)) : templates;
for (const template of list) {
  await send("Page.navigate", { url: `${base}/?bake=${template.slug}#/render/${template.slug}` });
  await wait(3500);
  const { result } = await send("Runtime.evaluate", {
    expression: `document.querySelector("canvas")?.toDataURL("image/webp", 0.86) ?? ""`,
    returnByValue: true,
  });
  const data = result.result.value.split(",")[1];
  if (!data) {
    console.error(`✗ ${template.slug}: no canvas`);
    continue;
  }
  writeFileSync(join(outDir, `${template.slug}.webp`), Buffer.from(data, "base64"));
  console.log(`✓ ${template.slug}`);
}

ws.close();
browser.kill();
process.exit(0);
