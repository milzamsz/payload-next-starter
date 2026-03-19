import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import process from "node:process";

const mode = process.argv[2];
if (!mode || (mode !== "dev" && mode !== "start")) {
  console.error("Usage: node scripts/next-runner.mjs <dev|start> [next args...]");
  process.exit(1);
}

const passthroughArgs = process.argv.slice(3);
const hasPortFlag = passthroughArgs.some(
  (arg) => arg === "--port" || arg === "-p" || arg.startsWith("--port="),
);
const hasEnvPort = Boolean(process.env.PORT);

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();

    server.on("error", () => resolve(false));
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function findAvailablePort(fromPort, toPort) {
  for (let port = fromPort; port <= toPort; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No available port found between ${fromPort}-${toPort}`);
}

const selectedPort =
  hasEnvPort || hasPortFlag ? null : String(await findAvailablePort(3000, 3010));

if (selectedPort) {
  console.log(`[next-runner] ${mode} on port ${selectedPort}`);
}

const nextCliPath = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const nextArgs = [nextCliPath, mode];

if (selectedPort) {
  nextArgs.push("--port", selectedPort);
}

nextArgs.push(...passthroughArgs);

const child = spawn(process.execPath, nextArgs, {
  stdio: "inherit",
  env: selectedPort ? { ...process.env, PORT: selectedPort } : process.env,
});

child.on("error", (error) => {
  console.error(`[next-runner] Failed to start Next.js: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
