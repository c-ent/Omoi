"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <nav className={`justify-between flex w-full mb-6 pt-5 ${pathname === "/" ? "px-6" : ""}`}>
      <Link href="/notes" className="flex gap-2 items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Omoi logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Omoi</p>
      </Link>

      <div>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            {session.user.image && (
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile"
              />
            )}
          </div>
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
  );
}
