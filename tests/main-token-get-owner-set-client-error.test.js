import { test } from "./main.js";

// Verify client errors are not retried when getting a token for a user or organization.
await test((mockPool) => {
  process.env.INPUT_OWNER = "smockle";
  delete process.env.INPUT_REPOSITORIES;

  mockPool
    .intercept({
      path: "/users/smockle/installation",
      method: "GET",
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": "actions/create-github-app-token",
        // Intentionally omitting the `authorization` header, since JWT creation is not idempotent.
      },
    })
    .reply(
      403,
      { message: "Forbidden" },
      { headers: { "content-type": "application/json" } },
    );
});
