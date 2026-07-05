"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, getProviders } from "next-auth/react";

export default function SignInPrompt({ message = "Sign in to view and manage your notes" }) {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <div className="sign_in_prompt">
      <Image
        src="/assets/images/logobw.svg"
        alt=""
        width={48}
        height={48}
        className="object-contain opacity-40"
      />
      <p className="sign_in_prompt_text">{message}</p>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="black_btn mt-6"
          >
            Sign in with Google
          </button>
        ))}
    </div>
  );
}
