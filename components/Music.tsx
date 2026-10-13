"use client";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type YTPlayer = { playVideo(): void; pauseVideo(): void; unMute(): void; setVolume(v: number): void };
declare global {
  interface Window { YT?: { Player: new (el: HTMLElement, o: object) => YTPlayer }; onYouTubeIframeAPIReady?: () => void }
}

let player: YTPlayer | null = null;
let wanted = false; // tapped "Open" before the player finished loading
let notify: (playing: boolean) => void = () => {};

/** Call from the "Open the invitation" click: browsers only allow sound to start from a tap. */
export function startMusic() {
  wanted = true;
  if (!player) return;
  player.unMute();
  player.setVolume(60);
  player.playVideo();
}

/**
 * Background hymn from YouTube, loaded hidden on page load so it can start the instant the invitation is opened.
 * Shows a small sound toggle once playing (guests must be able to stop audio).
 */
export function Music({ youtubeId }: { youtubeId: string }) {
  const [playing, setPlaying] = useState<boolean | null>(null); // null: not started yet

  useEffect(() => {
    if (!youtubeId) return;
    notify = setPlaying;
    const create = () => {
      const el = document.getElementById("yt-music");
      if (!el || !window.YT) return;
      new window.YT.Player(el, {
        videoId: youtubeId,
        playerVars: { playsinline: 1, loop: 1, playlist: youtubeId, controls: 0, disablekb: 1 },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            player = e.target;
            if (wanted) startMusic();
          },
          onStateChange: (e: { data: number }) => (e.data === 1 ? notify(true) : e.data === 2 && notify(false)),
        },
      });
    };
    if (window.YT?.Player) create();
    else {
      window.onYouTubeIframeAPIReady = create;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.append(s);
    }
  }, [youtubeId]);

  if (!youtubeId) return null;
  return (
    <>
      {/* Kept in the page (not display:none) so mobile browsers will play it. */}
      <div aria-hidden className="pointer-events-none fixed bottom-0 left-0 -z-20 h-px w-px overflow-hidden opacity-0">
        <div id="yt-music" />
      </div>
      {playing !== null && (
        <button
          type="button"
          onClick={() => (playing ? player?.pauseVideo() : startMusic())}
          aria-label={playing ? "Pause the music" : "Play the music"}
          className="fixed right-4 bottom-4 z-40 grid size-11 cursor-pointer place-items-center rounded-full border border-gold/45 bg-panel/90 text-accent shadow-[0_10px_30px_-12px_rgb(107_42_54/0.5)] transition active:scale-95"
        >
          {playing ? <SpeakerHigh size={20} /> : <SpeakerSlash size={20} />}
        </button>
      )}
    </>
  );
}
