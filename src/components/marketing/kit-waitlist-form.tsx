"use client";

import { useEffect, useRef } from "react";

const KIT_SCRIPT_URL =
  "https://novasaas-by-code-with-vanessa.kit.com/2ec0df1d60/index.js";
const KIT_FORM_UID = "2ec0df1d60";

type ScriptLease = {
  script: HTMLScriptElement;
  users: number;
  cleanupToken: number;
};

// Kit owns the markup it injects. Reuse the script for this container so
// Strict Mode does not render the signup form twice in development.
const scriptLeases = new WeakMap<HTMLDivElement, ScriptLease>();

export function KitWaitlistForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lease = scriptLeases.get(container);
    if (!lease) {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.uid = KIT_FORM_UID;
      script.src = KIT_SCRIPT_URL;
      lease = { script, users: 0, cleanupToken: 0 };
      scriptLeases.set(container, lease);
    }

    const activeLease = lease;
    activeLease.users += 1;
    activeLease.cleanupToken += 1;
    if (!activeLease.script.isConnected) {
      container.appendChild(activeLease.script);
    }

    return () => {
      activeLease.users -= 1;
      const cleanupToken = ++activeLease.cleanupToken;
      // Give a replayed effect a chance to reclaim the script before removing it.
      queueMicrotask(() => {
        if (
          activeLease.users === 0 &&
          activeLease.cleanupToken === cleanupToken
        ) {
          activeLease.script.remove();
          scriptLeases.delete(container);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="NovaSaaS Pro waitlist signup form"
      className="w-full max-w-full min-w-0"
      data-testid="kit-waitlist-form"
      role="group"
    />
  );
}
