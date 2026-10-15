"use client";
import { Trash } from "@phosphor-icons/react";

/** Submits the surrounding form only after the admin confirms. */
export function RemoveButton({ name }: { name: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => !confirm(`Remove the reply from ${name}? This can't be undone.`) && e.preventDefault()}
      aria-label={`Remove the reply from ${name}`}
      className="grid size-10 cursor-pointer place-items-center rounded-full text-ink-soft transition hover:bg-accent/10 hover:text-accent"
    >
      <Trash size={18} />
    </button>
  );
}
