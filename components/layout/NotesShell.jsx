"use client";

import Sidebar from "@components/layout/Sidebar";
import { NoteModalProvider } from "@components/notes/NoteModalProvider";

export default function NotesShell({ children }) {
  return (
    <NoteModalProvider>
      <div className="notes_shell">
        <div className="notes_mobile_topbar md:hidden" aria-hidden="true" />
        <Sidebar />
        <main className="notes_main">
          <div className="notes_main_inner">{children}</div>
        </main>
      </div>
    </NoteModalProvider>
  );
}
