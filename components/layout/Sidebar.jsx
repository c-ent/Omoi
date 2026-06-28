"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useNoteModal } from "@components/notes/NoteModalProvider";

const NAV_ITEMS = [
  { href: "/notes", label: "Notes", icon: "/assets/icons/note.svg" },
  { href: "/notes/trash", label: "Trash", icon: "/assets/icons/trash.svg" },
];

function NavLink({ href, label, icon, isActive }) {
  return (
    <Link href={href} className={`sidebar_link ${isActive ? "sidebar_link_active" : ""}`} title={label}>
      <Image src={icon} alt="" width={22} height={22} className="shrink-0 object-contain" />
      <span className="sidebar_link_label">{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { openCreateNote } = useNoteModal();
  const [expanded, setExpanded] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <>
      <button
        type="button"
        className="sidebar_mobile_toggle md:hidden"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <Image src="/assets/icons/sidemenu.svg" alt="" width={24} height={24} />
      </button>

      {expanded && (
        <button
          type="button"
          className="sidebar_overlay md:hidden"
          onClick={() => setExpanded(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`sidebar ${expanded ? "sidebar_expanded" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar_inner">
          <Link href="/notes" className="sidebar_brand" onClick={() => setExpanded(false)}>
            <Image src="/assets/images/logo.svg" alt="Omoi" width={28} height={28} />
            <span className="sidebar_brand_text">Omoi</span>
          </Link>

          <nav className="sidebar_nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                isActive={
                  item.href === "/notes"
                    ? pathname === "/notes"
                    : pathname === item.href
                }
              />
            ))}
          </nav>

          <button
            type="button"
            className="sidebar_create_btn"
            onClick={() => {
              setExpanded(false);
              if (pathname === "/notes") {
                openCreateNote();
              } else {
                router.push("/notes?new=1");
              }
            }}
          >
            <span className="sidebar_create_icon" aria-hidden="true">+</span>
            <span className="sidebar_create_label">New note</span>
          </button>

          <div className="sidebar_footer">
            {session?.user ? (
              <>
                <div className="sidebar_user">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={36}
                      height={36}
                      className="rounded-full shrink-0"
                    />
                  )}
                  <div className="sidebar_user_info">
                    <p className="sidebar_user_name">{session.user.name}</p>
                    <p className="sidebar_user_email">{session.user.email}</p>
                  </div>
                </div>
                <button type="button" onClick={() => signOut()} className="sidebar_signout">
                  Sign out
                </button>
              </>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn w-full"
                >
                  Sign in
                </button>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
