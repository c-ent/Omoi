import { describe, expect, it } from "vitest";
import { jsonError } from "@lib/api-errors";

describe("jsonError", () => {
  it("returns a JSON body with the error message", async () => {
    const response = jsonError("Something went wrong", 418);
    expect(response.status).toBe(418);
    await expect(response.json()).resolves.toEqual({ error: "Something went wrong" });
  });

  it("defaults to status 500", () => {
    expect(jsonError("Server error").status).toBe(500);
  });
});
