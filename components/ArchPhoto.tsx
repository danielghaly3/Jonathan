import Image from "next/image";
import type { Photo } from "@/invitation.config";
import { Lozenge } from "./Ornaments";

const RATIO = { "4:5": "aspect-[4/5]", "1:1": "aspect-square", "3:4": "aspect-[3/4]" } as const;
// Outer/inner radii per shape; the inner is smaller by the frame padding so the curves stay parallel.
const SHAPE = {
  arch: ["arch", "rounded-[999px_999px_26px_26px]"],
  soft: ["rounded-[32px]", "rounded-[26px]"],
} as const;

type Props = {
  photo: Photo;
  ratio: keyof typeof RATIO;
  shape?: keyof typeof SHAPE;
  hint?: string; // shown on the placeholder only
  sizes: string;
  preload?: boolean;
  className?: string;
};

/** Photo in a soft gold frame: an iconostasis arch or a rounded card. Empty `src` renders a placeholder. */
export function ArchPhoto({ photo, ratio, shape = "soft", hint, sizes, preload = false, className = "" }: Props) {
  const [outer, inner] = SHAPE[shape];
  return (
    <figure className={`relative ${className}`}>
      {shape === "arch" && (
        <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" className="absolute -top-7 left-1/2 -translate-x-1/2 text-gold" stroke="currentColor" strokeWidth="1" fill="none">
          <Lozenge x={10} />
        </svg>
      )}
      <div className={`${outer} frame bg-bg/60 p-1.5 sm:p-2`}>
        <div className={`${inner} ${RATIO[ratio]} relative overflow-hidden bg-panel`}>
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              className="object-cover"
              {...(preload ? { loading: "eager", fetchPriority: "high" } : {})}
            />
          ) : (
            <Placeholder ratio={ratio} hint={hint} />
          )}
        </div>
      </div>
    </figure>
  );
}

function Placeholder({ ratio, hint }: { ratio: string; hint?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-panel to-bg-tint text-blue-ink" role="img" aria-label="Photo placeholder">
      <svg aria-hidden className="absolute inset-0 h-full w-full text-blue opacity-40">
        <defs>
          <pattern id={`ph-${ratio.replace(":", "")}`} width="36" height="36" patternUnits="userSpaceOnUse">
            <g stroke="currentColor" strokeWidth="0.6" fill="none">
              <Lozenge x={18} y={18} s={0.9} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ph-${ratio.replace(":", "")})`} />
      </svg>
      {hint && (
        <div className="relative rounded-full bg-bg/85 px-5 py-2.5 text-center shadow-[0_8px_24px_-12px_rgb(80_60_30/0.35)]">
          <p className="label">{hint}</p>
          <p className="mt-0.5 font-sans text-[0.68rem] tracking-wide text-ink-soft">{ratio} · invitation.config.ts</p>
        </div>
      )}
    </div>
  );
}
