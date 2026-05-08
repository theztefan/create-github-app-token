import { DEFAULT_ENV } from "./main.js";

// Verify `main` exits with an error when `enterprise` is used with `owner` input.
// Set up environment with enterprise and owner set
for (const [key, value] of Object.entries(DEFAULT_ENV)) {
  process.env[key] = value;
}

process.env.INPUT_ENTERPRISE = "test-enterprise";
process.env.INPUT_OWNER = "test-owner";

const { default: promise } = await import("../main.js");
await promise;
