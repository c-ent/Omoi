"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <header className="nav_bar">
      <nav className="nav_inner" aria-label="Main">
        <Link href="/" className="nav_brand">
          <Image
            src="/assets/images/logo.svg"
            alt=""
            width={30}
            height={30}
            className="shrink-0 object-contain"
          />
          <span className="logo_text">Omoi</span>
        </Link>

        <div className="nav_actions">
          {session?.user ? (
            <>
              <Link href="/notes" className="outline_btn hidden sm:inline-flex">
                Notes
              </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">
                Sign out
              </button>
              {session.user.image && (
                <Image
                  src={session.user.image}
                  width={36}
                  height={36}
                  className="nav_profile"
                  alt=""
                />
              )}
            </>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.id}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign in
              </button>
            ))
          )}
        </div>
      </nav>
    </header>
  );
}
