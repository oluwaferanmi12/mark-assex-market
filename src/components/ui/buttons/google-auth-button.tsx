"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: any;
  }
}

type Props = {
  text?: string;
  className?: string;
  // If you want to hook into loading/errors:
  onReady?: () => void;
  onError?: (err: unknown) => void;
};

export default function GoogleAuthButton({
  text = "Continue with Google",
  className,
  onReady,
  onError,
}: Props) {
  const [ready, setReady] = useState(false);
  const codeClientRef = useRef<any>(null);

  // REQUIRED: set these in your .env.* (client-side)
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google/callback`;

  // Initialize after script loads
  const initCodeClient = () => {
    try {
      if (!window.google || !CLIENT_ID || !REDIRECT_URI) return;

      codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: "openid email profile",
        ux_mode: "redirect", // opens Google chooser, then redirects
        redirect_uri: REDIRECT_URI,
        state: crypto.randomUUID(), // CSRF protection / pass metadata if you like
        // prompt: "select_account", // uncomment to always force chooser
        // hd: "yourcompany.com",    // uncomment to restrict to a GSuite domain
      });

      setReady(true);
      onReady?.();
    } catch (e) {
      onError?.(e);
    }
  };

  const handleClick = () => {
    if (!ready) return;
    codeClientRef.current?.requestCode();
    console.log('test here')
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initCodeClient}
        onError={onError}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!ready}
        className={className}
        aria-disabled={!ready}
      >
        {text}
      </button>
    </>
  );
}
