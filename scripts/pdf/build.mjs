// Builds the PDFs in public/downloads with Chrome's built-in "print to PDF".
// No npm packages needed.
//
//   node scripts/pdf/build.mjs                 sample handover documents
//   node scripts/pdf/build.mjs http://host:port  also the capability statement,
//                                              printed from that running site
//
// Set CHROME to Chrome's path if it is not in the default Windows location.
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, "../../public/downloads");
const chrome = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
mkdirSync(out, { recursive: true });

function print(url, file) {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=8000",
      // Analytics keeps the page busy and stops Chrome from printing; block it.
      "--host-resolver-rules=MAP cloud.umami.is ~NOTFOUND, MAP gateway.umami.is ~NOTFOUND",
      `--print-to-pdf=${join(out, file)}`,
      url,
    ],
    { stdio: "ignore", timeout: 120000 },
  );
  console.log("wrote", file);
}

for (const name of [
  "sample-cable-test-report",
  "sample-labelling-scheme",
  "sample-as-built-drawing",
  "sample-handover-checklist",
]) {
  print(pathToFileURL(join(here, `${name}.html`)).href, `${name}.pdf`);
}

const site = process.argv[2];
if (site)
  print(`${site.replace(/\/$/, "")}/capability-statement`, "apexon-capability-statement.pdf");
