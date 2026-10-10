You are generating 4 cloud images for a soft, heavenly Coptic baby-baptism invitation website (warm parchment, antique gold and burgundy palette) (Next.js project in this folder). Generate images only. Do NOT edit any code, config, or existing files. The site auto-detects these exact filenames and uses them everywhere clouds appear (intro curtain, drifting sky layers, under the gold emblems, under the photos).

Save into: public/sky/   (create the folder if it does not exist)

Style for all four (they must look like one matching set):
- Soft, fluffy, dreamy cumulus clouds, like a gentle watercolor-meets-photograph heavenly sky. Tender, airy, luminous. Not stormy, not dramatic, not cartoon, no outlines.
- Color: warm ivory white (#FFFDF7 to #FAF3E6) with soft warm parchment shading on the undersides (#EADCC4), and a glow of antique-gold light on the top edges (#F3DFB4). No blue, no grey storm tones.
- Edges: soft and feathered, fading naturally into transparency. No hard cut-out edges.
- Background: real transparent background (PNG with alpha). No sky color, no blue rectangle, no vignette.
- No birds, no people, no sun, no rays, no text, no logos, no frames.
- Wide horizontal composition, flat-ish base, puffy top. The cloud should fill about 90% of the canvas width with soft transparent margins on all sides.

1) public/sky/cloud-1.png  (1600 x 800) - a long, low cloud with 5 gentle rounded puffs, highest puff slightly left of centre.
2) public/sky/cloud-2.png  (1600 x 800) - a fuller cloud with 3-4 big round puffs, tallest in the centre.
3) public/sky/cloud-3.png  (1600 x 800) - a light, wispy, more transparent cloud (about 70% opacity), slightly stretched, for distant layers.
4) public/sky/cloud-4.png  (1600 x 800) - a soft cloud bank with many small puffs along the top, flat bottom, good for sitting things on.

After generating:
- Verify each file: `sips -g pixelWidth -g pixelHeight -g hasAlpha public/sky/*.png` must show 1600 x 800 and hasAlpha: yes.
- Place each cloud on a warm parchment background (#EFE6D6) and check there is no visible box, halo or hard edge; regenerate if there is.
- Keep each file under 900 KB (lossless PNG optimization is fine).
- Report the four paths and their dimensions. Do not change any other file.
