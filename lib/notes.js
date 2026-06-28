import { connectToDB } from "@lib/db";
import Note from "@models/notes";
import { DEFAULT_NOTE_COLOR, isValidNoteId } from "@lib/note-validation";
import { isNoteOwner } from "@lib/note-ownership";

export { isNoteOwner } from "@lib/note-ownership";

function serializeNote(note) {
  return JSON.parse(JSON.stringify(note));
}

export async function getNotesByUserId(userId, { isDeleted = false } = {}) {
  await connectToDB();

  const notes = await Note.find({ creator: userId, isDeleted })
    .populate("creator")
    .sort({ updatedAt: -1 })
    .lean();

  return notes.map(serializeNote);
}

export async function getNoteById(noteId) {
  if (!isValidNoteId(noteId)) {
    return null;
  }

  await connectToDB();

  const note = await Note.findById(noteId).populate("creator").lean();

  return note ? serializeNote(note) : null;
}

export async function createNote({ userId, noteTitle, noteBody, bgColor }) {
  await connectToDB();

  const note = await Note.create({
    creator: userId,
    noteTitle,
    noteBody,
    bgColor: bgColor ?? DEFAULT_NOTE_COLOR,
  });

  return serializeNote(note.toObject());
}

export async function updateNote(noteId, { noteTitle, noteBody, bgColor, isDeleted }) {
  if (!isValidNoteId(noteId)) {
    return null;
  }

  await connectToDB();

  const $set = {};
  if (noteTitle !== undefined) $set.noteTitle = noteTitle;
  if (noteBody !== undefined) $set.noteBody = noteBody;
  if (bgColor !== undefined) $set.bgColor = bgColor;
  if (isDeleted !== undefined) $set.isDeleted = isDeleted;

  const note = await Note.findByIdAndUpdate(noteId, { $set }, {
    new: true,
    runValidators: true,
  });

  return note ? serializeNote(note.toObject()) : null;
}

export async function deleteNote(noteId) {
  if (!isValidNoteId(noteId)) {
    return false;
  }

  await connectToDB();
  await Note.findByIdAndDelete(noteId);
  return true;
}
