You are generating 2 animation frames of a flying dove for a luxury Coptic Orthodox baptism invitation website (Next.js project in this folder). Generate images only. Do NOT edit any code, config, or existing files. The site auto-detects these exact filenames and alternates them to make the dove flap its wings.

Save into: public/dove/   (create the folder if it does not exist)

Style: open public/intro/dove-gold.png and public/signs/water.png first and match them exactly: antique gold leaf (#A8843F to #C9A766), fine engraved feather lines, soft warm sheen, Coptic illuminated-manuscript feeling. Same dove, same gold, same line weight.

Both frames:
- 1024 x 1024 PNG with a real transparent background (alpha). No background, no shadow, no glow, no halo, no rays, no frame, no text.
- The dove is seen from the SIDE, flying to the RIGHT (beak pointing right), body horizontal, tail fanned behind on the left, legs tucked.
- IMPORTANT registration: the body, head, beak and tail must be in the EXACT same position, size and angle in both frames. Only the wings change. Center the body; leave about 12% padding on every side so the raised and lowered wings both fit inside the canvas.

1) public/dove/fly-up.png
   Wings raised high above the back in a graceful upstroke, primary feathers spread like fingers.

2) public/dove/fly-down.png
   Wings swept down below the body in a full downstroke, feathers slightly curved by the air.

After generating:
- Verify both files: exact 1024 x 1024, alpha present: `sips -g pixelWidth -g pixelHeight -g hasAlpha public/dove/*.png`.
- Overlay the two frames at 50% opacity and confirm the body, head and tail line up exactly; regenerate if they drift.
- Keep each under 900 KB (lossless PNG optimization).
- Report both paths and dimensions. Do not change any other file.
