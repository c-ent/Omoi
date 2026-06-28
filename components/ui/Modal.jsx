"use client";

import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal_overlay" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className="modal_panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_header">
          {title && (
            <h2 id="modal-title" className="modal_title">
              {title}
            </h2>
          )}
          <button type="button" onClick={onClose} className="modal_close" aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal_body">{children}</div>
      </div>
    </div>
  );
}
