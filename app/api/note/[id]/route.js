import { requireAuth } from "@lib/api-auth";
import { getNoteById, updateNote, deleteNote, isNoteOwner } from "@lib/notes";
import { jsonError } from "@lib/api-errors";
import {
  validateNoteFields,
  validateBgColor,
  validateIsDeleted,
  sanitizeBgColor,
  isValidNoteId,
  invalidNoteIdResponse,
} from "@lib/note-validation";

export async function GET(request, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  if (!isValidNoteId(id)) return invalidNoteIdResponse();

  try {
    const note = await getNoteById(id);

    if (!note) {
      return jsonError("Note not found", 404);
    }

    if (!isNoteOwner(note, session.user.id)) {
      return jsonError("Forbidden", 403);
    }

    return Response.json(note);
  } catch {
    return jsonError("Failed to fetch note", 500);
  }
}

export async function PATCH(request, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  if (!isValidNoteId(id)) return invalidNoteIdResponse();

  const { noteTitle, noteBody, bgColor, isDeleted } = await request.json();
  const validationError =
    validateNoteFields({ noteTitle, noteBody }) ??
    validateBgColor(bgColor) ??
    validateIsDeleted(isDeleted);

  if (validationError) {
    return jsonError(validationError, 400);
  }

  try {
    const existingNote = await getNoteById(id);

    if (!existingNote) {
      return jsonError("Note not found", 404);
    }

    if (!isNoteOwner(existingNote, session.user.id)) {
      return jsonError("Forbidden", 403);
    }

    const updatedNote = await updateNote(id, {
      noteTitle,
      noteBody,
      bgColor: sanitizeBgColor(bgColor),
      isDeleted,
    });

    return Response.json(updatedNote);
  } catch {
    return jsonError("Failed to update note", 500);
  }
}

export async function DELETE(request, { params }) {
  const { session, error } = await requireAuth();
  if (error) return error;

  const { id } = await params;
  if (!isValidNoteId(id)) return invalidNoteIdResponse();

  try {
    const existingNote = await getNoteById(id);

    if (!existingNote) {
      return jsonError("Note not found", 404);
    }

    if (!isNoteOwner(existingNote, session.user.id)) {
      return jsonError("Forbidden", 403);
    }

    await deleteNote(id);
    return Response.json({ message: "Note deleted" });
  } catch {
    return jsonError("Failed to delete note", 500);
  }
}
