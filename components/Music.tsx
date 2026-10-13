"use client";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useState } from "react";

const ID = "bg-music";

/** Call from the "Open the invitation" click: browsers only allow sound to start from a tap. */
export function startMusic() {
  const a = document.getElementById(ID) as HTMLAudioElement | null;
  if (!a) return;
  a.volume = 0.6;
  a.play().catch(() => {}); // blocked or missing file: the invitation still opens silently
}

/** Background hymn, looped. Shows a small sound toggle once playing (guests must be able to stop audio). */
export function Music({ src }: { src: string }) {
  const [playing, setPlaying] = useState<boolean | null>(null); // null: not started yet
  if (!src) return null;
  return (
    <>
      <audio id={ID} src={src} loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      {playing !== null && (
        <button
          type="button"
          onClick={() => (playing ? (document.getElementById(ID) as HTMLAudioElement).pause() : startMusic())}
          aria-label={playing ? "Pause the music" : "Play the music"}
          className="fixed top-[max(1rem,env(safe-area-inset-top))] right-4 z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-gold/45 bg-panel/90 text-accent shadow-[0_10px_30px_-12px_rgb(107_42_54/0.5)] transition active:scale-95"
        >
          {playing ? <SpeakerHigh size={20} /> : <SpeakerSlash size={20} />}
        </button>
      )}
    </>
  );
}
