import { test } from "./main.js";

// Verify transient network errors are retried when getting a repository token.
await test((mockPool) => {
  process.env.INPUT_OWNER = "actions";
  process.env.INPUT_REPOSITORIES = "network-repo";
  const owner = process.env.INPUT_OWNER;
  const repo = process.env.INPUT_REPOSITORIES;
  const mockInstallationId = "123456";
  const mockAppSlug = "github-actions";

  mockPool
    .intercept({
      path: `/repos/${owner}/${repo}/installation`,
      method: "GET",
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": "actions/create-github-app-token",
        // Intentionally omitting the `authorization` header, since JWT creation is not idempotent.
      },
    })
    .replyWithError(new TypeError("fetch failed"));

  mockPool
    .intercept({
      path: `/repos/${owner}/${repo}/installation`,
      method: "GET",
      headers: {
        accept: "application/vnd.github.v3+json",
        "user-agent": "actions/create-github-app-token",
        // Intentionally omitting the `authorization` header, since JWT creation is not idempotent.
      },
    })
    .reply(
      200,
      { id: mockInstallationId, app_slug: mockAppSlug },
      { headers: { "content-type": "application/json" } },
    );
});
