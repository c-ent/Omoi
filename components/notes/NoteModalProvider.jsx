"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import Modal from "@components/ui/Modal";
import CreateNoteForm from "@components/notes/CreateNoteForm";
import EditNoteForm from "@components/notes/EditNoteForm";

const NoteModalContext = createContext(null);

export function NoteModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const onCreatedRef = useRef(null);
  const onUpdatedRef = useRef(null);

  const openCreateNote = useCallback(() => {
    setFormKey((key) => key + 1);
    setModal({ mode: "create" });
  }, []);

  const openEditNote = useCallback((noteId) => {
    setFormKey((key) => key + 1);
    setModal({ mode: "edit", noteId });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const registerOnCreated = useCallback((handler) => {
    onCreatedRef.current = handler;
    return () => {
      if (onCreatedRef.current === handler) onCreatedRef.current = null;
    };
  }, []);

  const registerOnUpdated = useCallback((handler) => {
    onUpdatedRef.current = handler;
    return () => {
      if (onUpdatedRef.current === handler) onUpdatedRef.current = null;
    };
  }, []);

  const handleCreated = (note) => {
    onCreatedRef.current?.(note);
    setModal(null);
  };

  const handleUpdated = (note) => {
    onUpdatedRef.current?.(note);
    setModal(null);
  };

  const isOpen = modal !== null;
  const title = modal?.mode === "edit" ? "Edit note" : "New note";

  return (
    <NoteModalContext.Provider
      value={{
        openCreateNote,
        openEditNote,
        closeModal,
        registerOnCreated,
        registerOnUpdated,
        isOpen,
      }}
    >
      {children}
      <Modal isOpen={isOpen} onClose={closeModal} title={title}>
        {modal?.mode === "create" && (
          <CreateNoteForm
            key={`create-${formKey}`}
            onSuccess={handleCreated}
            onCancel={closeModal}
          />
        )}
        {modal?.mode === "edit" && (
          <EditNoteForm
            key={`edit-${formKey}-${modal.noteId}`}
            noteId={modal.noteId}
            onSuccess={handleUpdated}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </NoteModalContext.Provider>
  );
}

export function useNoteModal() {
  const context = useContext(NoteModalContext);
  if (!context) {
    throw new Error("useNoteModal must be used within NoteModalProvider");
  }
  return context;
}
