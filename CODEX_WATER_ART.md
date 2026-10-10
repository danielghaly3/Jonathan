You are generating 2 water images for a luxury Coptic Orthodox baptism invitation website (Next.js project in this folder). Generate images only. Do NOT edit any code, config, or existing files. The site auto-detects these exact filenames.

Save into: public/water/   (create the folder if it does not exist)

Before you start, open public/intro/sanctuary-wide.jpg (the sanctuary with its baptismal font) and public/signs/water.png, and match their warm golden-hour light, palette and refinement. The water is the holy water of the baptismal font: clear, calm, luminous, tender. Not the sea, not a swimming pool, nothing dark or stormy.

Palette: clear pale aqua (#DCE8EE, #C4D6E0) catching warm ivory and antique-gold light (#FFFAF0, #F3DFB4, #C9A766). No saturated blue.

1) public/water/pool.png  (1400 x 500, PNG with a real transparent background)
   A small, shallow oval pool of still, clear holy water seen in gentle perspective from slightly above, like looking into a wide baptismal font. Two or three very soft concentric ripple rings spreading from the centre, a few tiny golden light glints on the surface, a faint reflection of warm candlelight. NO basin, NO rim, NO stone, NO objects: only the water surface. The edges of the oval fade softly and naturally into full transparency (feathered over the outer ~15%), so it can sit on any background. Centered, filling about 90% of the width.

2) public/water/light.png  (2048 x 512, PNG with a real transparent background, SEAMLESS horizontally)
   A delicate overlay of light dancing on a water surface: soft, thin, wavy caustic highlights and gentle horizontal ripple glints in warm white and pale gold, on a fully transparent background, as if sunlight were reflecting off still water. Very subtle and airy: mostly transparent, highlights covering no more than ~25% of the area, densest in the top third and thinning toward the bottom. The left and right edges must tile seamlessly (it slides sideways in a loop).

Rules for both:
- No text, letters, numbers, logos, watermarks, people, objects, frames or borders.
- No visible box, halo, or hard edge anywhere; check by placing each on a warm parchment background (#EFE6D6) and on a white background.
- Keep each file under 800 KB (lossless PNG optimization is fine).

After generating:
- Verify: `sips -g pixelWidth -g pixelHeight -g hasAlpha public/water/*.png` shows the exact sizes and hasAlpha: yes.
- For light.png, place two copies side by side and confirm there is no visible seam; regenerate if there is.
- Report both paths and dimensions. Do not change any other file.
