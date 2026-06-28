import { requireAuth } from "@lib/api-auth";
import { createNote } from "@lib/notes";
import { jsonError } from "@lib/api-errors";
import {
  validateNoteFields,
  validateBgColor,
  sanitizeBgColor,
} from "@lib/note-validation";

export async function POST(req) {
  const { session, error } = await requireAuth();
  if (error) return error;

  const { noteTitle, noteBody, bgColor } = await req.json();
  const validationError =
    validateNoteFields({ noteTitle, noteBody, requireBoth: true }) ??
    validateBgColor(bgColor);

  if (validationError) {
    return jsonError(validationError, 400);
  }

  try {
    const newNote = await createNote({
      userId: session.user.id,
      noteTitle,
      noteBody,
      bgColor: sanitizeBgColor(bgColor),
    });

    return Response.json(newNote, { status: 201 });
  } catch {
    return jsonError("Failed to create note", 500);
  }
}
