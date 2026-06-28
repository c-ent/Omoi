"use client";

import { useEffect, useState } from "react";
import Sidebar from "@components/layout/Sidebar";
import { NoteModalProvider } from "@components/notes/NoteModalProvider";

export default function NotesShell({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <NoteModalProvider>
      <div className={`notes_shell ${scrolled ? "notes_shell_scrolled" : ""}`}>
        <div className="notes_mobile_topbar md:hidden" aria-hidden="true" />
        <Sidebar />
        <main className="notes_main">
          <div className="notes_main_inner">{children}</div>
        </main>
      </div>
    </NoteModalProvider>
  );
}
