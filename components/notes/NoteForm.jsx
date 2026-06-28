"use client";

import { useState, useEffect } from "react";
import LoadingDots from "@components/ui/LoadingDots";
import { NOTE_COLOR_KEYS, DEFAULT_NOTE_COLOR, getColorClass } from "@lib/note-validation";
export default function NoteForm({ type, note, setNote, handleSubmit, submitting, onCancel }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(note.bgColor || DEFAULT_NOTE_COLOR);

  useEffect(() => {
    if (note.bgColor) {
      setSelectedColor(note.bgColor);
    }
  }, [note.bgColor]);

  const handleColorSelect = (colorKey) => {
    setSelectedColor(colorKey);
    setNote({ ...note, bgColor: colorKey });
    setIsMenuOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`note_form ${getColorClass(note.bgColor || selectedColor)}`}
    >
      <textarea
        rows="2"
        className="note_form_title"
        value={note.noteTitle}
        onChange={(e) => setNote({ ...note, noteTitle: e.target.value })}
        placeholder="Title..."
        required
        autoFocus
      />
      <textarea
        rows="6"
        className="note_form_body"
        placeholder="Take a note..."
        value={note.noteBody}
        onChange={(e) => setNote({ ...note, noteBody: e.target.value })}
        required
      />
      <div className="note_form_footer">
        <div className="relative">
          <button
            type="button"
            className="note_form_color_btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Choose note color"
            aria-expanded={isMenuOpen}
          >
            <span className="note_form_color_dot" aria-hidden="true">
              <span className="bg-yellow-200" />
              <span className="bg-red-200" />
              <span className="bg-blue-200" />
              <span className="bg-green-200" />
            </span>
          </button>

          {isMenuOpen && (
            <div className="note_form_color_menu" role="listbox" aria-label="Note colors">
              {NOTE_COLOR_KEYS.map((colorKey) => (
                <button
                  key={colorKey}
                  type="button"
                  role="option"
                  aria-selected={selectedColor === colorKey}
                  className={`note_form_color_option ${
                    selectedColor === colorKey ? "note_form_color_option_selected" : ""
                  }`}
                  onClick={() => handleColorSelect(colorKey)}
                  aria-label={`Select ${colorKey}`}
                >
                  <div className={`h-full w-full ${getColorClass(colorKey)}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="note_form_actions">
          {onCancel && (
            <button type="button" onClick={onCancel} className="outline_btn">
              Cancel
            </button>
          )}
          <button type="submit" className="black_btn" disabled={submitting} aria-busy={submitting}>
            {submitting ? <LoadingDots variant="button" /> : type === "Create" ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
}
