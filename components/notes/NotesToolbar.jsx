"use client";

export default function NotesToolbar({
  selectedCount,
  selectAll,
  onSelectAll,
  actions = [],
}) {
  return (
    <div className="notes_toolbar">
      <span className="notes_toolbar_count">
        {selectedCount} selected
      </span>
      <button type="button" onClick={onSelectAll} className="black_btn">
        {selectAll ? "Deselect all" : "Select all"}
      </button>
      {selectedCount > 0 &&
        actions.map(({ label, onClick, variant = "black" }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className={variant === "danger" ? "danger_btn" : "black_btn"}
          >
            {label}
          </button>
        ))}
    </div>
  );
}
