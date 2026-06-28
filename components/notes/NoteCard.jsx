"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { getColorClass } from "@lib/note-validation";
import { getCreatorId } from "@lib/note-ownership";

export default function NoteCard({
  note,
  isSelected,
  onToggleSelect,
  handleEdit,
  handleDelete,
  handleRestore,
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isOwner = session?.user?.id === getCreatorId(note.creator);
  const isTrashPage = pathname === "/notes/trash";
  const isNotesPage = pathname === "/notes";
  const showActions = isNotesPage || (isOwner && isTrashPage);
  const actionsVisible = (isHovered || isSelected) && showActions;

  return (
    <article
      className={`note_card ${getColorClass(note.bgColor)} ${
        isSelected ? "note_card_selected" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label
        className={`note_card_checkbox ${isHovered || isSelected ? "note_card_checkbox_visible" : ""}`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="sr-only"
        />
        <Image
          src={isSelected ? "/assets/icons/checked.svg" : "/assets/icons/uncheck.svg"}
          alt="Select note"
          width={24}
          height={24}
          className="object-contain"
        />
      </label>

      <h2 className="note_heading line-clamp-2">{note.noteTitle}</h2>
      <p className="note_body">{note.noteBody}</p>

      {showActions && (
        <div className={`note_card_actions ${actionsVisible ? "note_card_actions_visible" : ""}`}>
          {isNotesPage && handleEdit && (
            <button type="button" onClick={handleEdit} className="note_card_action" title="Edit">
              <Image src="/assets/icons/pen.svg" alt="" width={18} height={18} />
            </button>
          )}
          {isOwner && isTrashPage && (
            <>
              <button type="button" onClick={handleRestore} className="note_card_action" title="Restore">
                <Image src="/assets/icons/restore.svg" alt="" width={18} height={18} />
              </button>
              <button type="button" onClick={handleDelete} className="note_card_action note_card_action_danger" title="Delete">
                <Image src="/assets/icons/delete.svg" alt="" width={18} height={18} />
              </button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
