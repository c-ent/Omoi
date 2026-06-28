import { describe, expect, it } from "vitest";
import { isNoteOwner } from "@lib/note-ownership";

const USER_ID = "507f1f77bcf86cd799439011";
const OTHER_USER_ID = "507f1f77bcf86cd799439012";

describe("isNoteOwner", () => {
  it("matches when creator is a string id", () => {
    expect(isNoteOwner({ creator: USER_ID }, USER_ID)).toBe(true);
    expect(isNoteOwner({ creator: OTHER_USER_ID }, USER_ID)).toBe(false);
  });

  it("matches when creator is a populated object", () => {
    expect(isNoteOwner({ creator: { _id: USER_ID } }, USER_ID)).toBe(true);
    expect(isNoteOwner({ creator: { _id: OTHER_USER_ID } }, USER_ID)).toBe(false);
  });

  it("matches when creator is an object without _id", () => {
    expect(isNoteOwner({ creator: { toString: () => USER_ID } }, USER_ID)).toBe(true);
  });
});
