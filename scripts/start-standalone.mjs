import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, ".next", "standalone");
const publicSrc = path.join(projectRoot, "public");
const publicDest = path.join(standaloneDir, "public");
const staticSrc = path.join(projectRoot, ".next", "static");
const staticDest = path.join(standaloneDir, ".next", "static");

await fs.mkdir(publicDest, { recursive: true });
await fs.cp(publicSrc, publicDest, { recursive: true, force: true });

await fs.mkdir(staticDest, { recursive: true });
await fs.cp(staticSrc, staticDest, { recursive: true, force: true });

const serverEntrypoint = path.join(standaloneDir, "server.js");

const child = spawn(process.execPath, [serverEntrypoint], {
  stdio: "inherit",
  env: process.env,
});

child.on("error", (error) => {
  console.error(`[start-standalone] Failed to start server: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
