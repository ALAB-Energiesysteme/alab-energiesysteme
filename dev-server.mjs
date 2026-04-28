import { execFileSync } from "child_process";
const port = process.env.PORT || 3000;
execFileSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "--port", String(port)],
  { stdio: "inherit", cwd: import.meta.dirname }
);
