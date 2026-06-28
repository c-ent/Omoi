import mongoose from "mongoose";
import { jsonError } from "@lib/api-errors";

export const NOTE_COLOR_KEYS = ["yellow", "red", "blue", "green"];
export const DEFAULT_NOTE_COLOR = "yellow";

export const NOTE_COLOR_CLASSES = {
  yellow: "bg-yellow-200",
  red: "bg-red-200",
  blue: "bg-blue-200",
  green: "bg-green-200",
};

export function isValidColorKey(value) {
  return NOTE_COLOR_KEYS.includes(value);
}

export function getColorClass(colorKey) {
  return NOTE_COLOR_CLASSES[colorKey] ?? NOTE_COLOR_CLASSES[DEFAULT_NOTE_COLOR];
}

export function isValidNoteId(id) {
  return Boolean(id && mongoose.isValidObjectId(id));
}

export function invalidNoteIdResponse() {
  return jsonError("Invalid note ID", 400);
}

export function validateNoteFields({ noteTitle, noteBody, requireBoth = false }) {
  if (requireBoth) {
    if (!noteTitle?.trim() || !noteBody?.trim()) {
      return "Title and body are required";
    }
    return null;
  }

  if (noteTitle !== undefined && !noteTitle?.trim()) {
    return "Title cannot be empty";
  }
  if (noteBody !== undefined && !noteBody?.trim()) {
    return "Body cannot be empty";
  }
  return null;
}

export function validateBgColor(bgColor) {
  if (bgColor === undefined) return null;
  if (!isValidColorKey(bgColor)) {
    return "Invalid note color";
  }
  return null;
}

export function validateIsDeleted(isDeleted) {
  if (isDeleted === undefined) return null;
  if (typeof isDeleted !== "boolean") {
    return "isDeleted must be a boolean";
  }
  return null;
}

export function sanitizeBgColor(bgColor) {
  if (bgColor === undefined) return undefined;
  return isValidColorKey(bgColor) ? bgColor : DEFAULT_NOTE_COLOR;
}
