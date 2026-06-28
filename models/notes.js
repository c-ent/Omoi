import { Schema, model, models } from "mongoose";
import { NOTE_COLOR_KEYS, DEFAULT_NOTE_COLOR } from "@lib/note-validation";

const NoteSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    noteTitle: {
      type: String,
      required: [true, "Title is required"],
    },
    noteBody: {
      type: String,
      required: [true, "Body is required"],
    },
    bgColor: {
      type: String,
      enum: NOTE_COLOR_KEYS,
      default: DEFAULT_NOTE_COLOR,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);

export default Note;
