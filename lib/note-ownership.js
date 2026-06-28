export function getCreatorId(creator) {
  if (!creator) return null;
  return typeof creator === "object"
    ? creator._id?.toString() ?? creator.toString()
    : creator.toString();
}

export function isNoteOwner(note, userId) {
  return getCreatorId(note.creator) === userId;
}
