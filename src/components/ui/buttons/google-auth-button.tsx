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
  loading?: boolean;
  setLoading?: (val: boolean) => void;
};

export default function GoogleAuthButton({
  text = "Continue with Google",
  className,
  onReady,
  onError,
  loading,
  setLoading,
}: Props) {
  const [ready, setReady] = useState(false);
  const codeClientRef = useRef<any>(null);

  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login`;

  
  const initCodeClient = () => {
    try {
      if (!window.google || !CLIENT_ID || !REDIRECT_URI) return;

      codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: "openid email profile",
        ux_mode: "redirect",
        redirect_uri: REDIRECT_URI,
        state: crypto.randomUUID(),
      });

      setReady(true);
      onReady?.();
    } catch (e) {
      onError?.(e);
    }
  };

  const handleClick = () => {
    if (!ready) return;
    if (setLoading) {
      setLoading(true);
    }
    codeClientRef.current?.requestCode();
  };

  return (
    <div className="opacity-0 cursor-pointer absolute w-full">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initCodeClient}
        onError={onError}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!ready || loading}
        className="w-full h-[50px] cursor-pointer"
        aria-disabled={!ready}
      >
        {text}
      </button>
    </div>
  );
}
