"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, getProviders } from "next-auth/react";

export default function SignInPrompt({ message = "Sign in to add Notes" }) {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <Image
        src="/assets/images/blob.svg"
        alt="Omoi"
        width={40}
        height={40}
        className="object-contain"
      />
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.id}
            onClick={() => signIn(provider.id)}
            className="font-semibold mt-4"
          >
            {message}
          </button>
        ))}
    </div>
  );
}
