import { describe, expect, it } from "vitest";
import {
  DEFAULT_NOTE_COLOR,
  NOTE_COLOR_KEYS,
  getColorClass,
  invalidNoteIdResponse,
  isValidColorKey,
  isValidNoteId,
  sanitizeBgColor,
  validateBgColor,
  validateIsDeleted,
  validateNoteFields,
} from "@lib/note-validation";

const VALID_OBJECT_ID = "507f1f77bcf86cd799439011";

describe("note-validation", () => {
  describe("isValidColorKey", () => {
    it("accepts known color keys", () => {
      for (const color of NOTE_COLOR_KEYS) {
        expect(isValidColorKey(color)).toBe(true);
      }
    });

    it("rejects unknown colors", () => {
      expect(isValidColorKey("purple")).toBe(false);
    });
  });

  describe("getColorClass", () => {
    it("returns the matching tailwind class", () => {
      expect(getColorClass("red")).toBe("bg-red-200");
    });

    it("falls back to the default color class", () => {
      expect(getColorClass("unknown")).toBe(getColorClass(DEFAULT_NOTE_COLOR));
    });
  });

  describe("isValidNoteId", () => {
    it("accepts a valid MongoDB ObjectId", () => {
      expect(isValidNoteId(VALID_OBJECT_ID)).toBe(true);
    });

    it("rejects invalid ids", () => {
      expect(isValidNoteId("")).toBe(false);
      expect(isValidNoteId("not-an-id")).toBe(false);
      expect(isValidNoteId(null)).toBe(false);
    });
  });

  describe("invalidNoteIdResponse", () => {
    it("returns a JSON error response", async () => {
      const response = invalidNoteIdResponse();
      expect(response.status).toBe(400);
      await expect(response.json()).resolves.toEqual({ error: "Invalid note ID" });
    });
  });

  describe("validateNoteFields", () => {
    it("requires both fields when requireBoth is true", () => {
      expect(validateNoteFields({ noteTitle: "", noteBody: "body", requireBoth: true })).toBe(
        "Title and body are required"
      );
      expect(validateNoteFields({ noteTitle: "title", noteBody: "", requireBoth: true })).toBe(
        "Title and body are required"
      );
      expect(
        validateNoteFields({ noteTitle: "title", noteBody: "body", requireBoth: true })
      ).toBeNull();
    });

    it("validates partial updates", () => {
      expect(validateNoteFields({ noteTitle: "   " })).toBe("Title cannot be empty");
      expect(validateNoteFields({ noteBody: "   " })).toBe("Body cannot be empty");
      expect(validateNoteFields({ noteTitle: "title" })).toBeNull();
    });
  });

  describe("validateBgColor", () => {
    it("allows undefined", () => {
      expect(validateBgColor(undefined)).toBeNull();
    });

    it("rejects invalid colors", () => {
      expect(validateBgColor("pink")).toBe("Invalid note color");
    });
  });

  describe("validateIsDeleted", () => {
    it("allows undefined", () => {
      expect(validateIsDeleted(undefined)).toBeNull();
    });

    it("requires a boolean", () => {
      expect(validateIsDeleted("true")).toBe("isDeleted must be a boolean");
      expect(validateIsDeleted(true)).toBeNull();
    });
  });

  describe("sanitizeBgColor", () => {
    it("returns undefined when color is omitted", () => {
      expect(sanitizeBgColor(undefined)).toBeUndefined();
    });

    it("falls back to the default color", () => {
      expect(sanitizeBgColor("pink")).toBe(DEFAULT_NOTE_COLOR);
    });
  });
});
