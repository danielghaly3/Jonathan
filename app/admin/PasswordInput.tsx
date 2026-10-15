"use client";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";

/** Password field with a show / hide toggle. */
export function PasswordInput() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id="password"
        name="password"
        type={show ? "text" : "password"}
        required
        autoFocus
        autoComplete="current-password"
        className="min-h-12 w-full rounded-2xl border border-gold/45 bg-[#fffaf0]/80 pr-12 pl-4 font-sans"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
        className="absolute inset-y-0 right-0 grid w-12 cursor-pointer place-items-center text-ink-soft hover:text-accent"
      >
        {show ? <EyeSlash size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
