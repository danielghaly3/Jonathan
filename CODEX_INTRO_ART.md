You are generating 4 image assets for a luxury Coptic Orthodox baptism invitation website (Next.js project in this folder). Generate images only. Do NOT edit any code, config, or existing files. The site auto-detects these exact filenames.

Save everything into: public/intro/

Shared art direction (applies to every image):
- Mood: sacred, airy, serene, luxurious, contemporary. A quiet Coptic Orthodox sanctuary at golden hour. Respectful, never kitsch, no cartoons.
- Palette only: warm ivory #FAF6EE, parchment #F2EBDD, dusty baby blue #9FB4C5, antique gold #A8843F, soft highlight gold #C9A766. Muted burgundy #6B2A36 only as a tiny accent, if at all.
- Light: soft diffused sunlight from high windows, gentle god-rays, low contrast, creamy highlights, no harsh shadows.
- Never include: people, faces, hands, readable text, letters, numbers, logos, watermarks, signatures, frames or borders, saints' faces or readable icons, modern objects, neon, saturated colors, Latin-style crucifix with a body.

1) public/intro/sanctuary-wide.jpg (2400 x 1350, 16:9, JPEG quality ~82, under 600 KB)
   Interior of a Coptic Orthodox church seen straight-on, symmetrical. Center: a tall rounded iconostasis arch in warm ivory stone with delicate carved geometric lattice (interlocking lozenges and small equal-armed crosses) and thin antique-gold trim. Below the arch, an alabaster baptismal font with still, softly glowing water. Light rays fall diagonally from high windows; a faint haze of dust in the light. Heavy shallow depth of field: the whole scene is softly out of focus (like f/1.4 bokeh) so text can sit on top. Keep the central 40% of the frame calm, bright and uncluttered (the site places a cross, a photo and the name there). Slight warm vignette at the edges.

2) public/intro/sanctuary-tall.jpg (1350 x 2400, 9:16, JPEG quality ~82, under 600 KB)
   The same scene recomposed for phones: the arch fills the upper two-thirds, the font and glowing water sit at the bottom. Same blur, same calm bright center. Must look like the same place as image 1.

3) public/intro/dove-gold.png (1024 x 1024, PNG with a real transparent background, no white box)
   A dove of the Holy Spirit descending: seen from the front, wings spread wide and slightly raised, head tilted gently down, tail feathers fanned below. Rendered as antique gold leaf with fine engraved line detail, in the style of a Coptic illuminated manuscript; subtle warm sheen, no glow baked in, no halo, no rays, no background. Centered with about 8% padding on every side. Clean anti-aliased edges, no fringe.

4) public/intro/paper-texture.jpg (1024 x 1024, JPEG quality ~80, under 250 KB)
   A seamless, tileable texture of warm ivory handmade paper (#F6F0E5 base) with very subtle fibers and grain. Extremely low contrast: it must read as nearly flat ivory from a distance. No stains, folds, edges, text or vignette. Must tile without visible seams on all four sides.

After generating:
- Verify each file exists at the exact path, has the exact pixel size, and (for the dove) a transparent alpha channel. Use `sips -g pixelWidth -g pixelHeight -g hasAlpha <file>` on macOS.
- Verify the paper texture tiles: place it 2x2 and check for seams; regenerate if seams show.
- Compress the JPEGs to the size budgets above without visible banding.
- Report the four file paths and their dimensions. Do not change any other file.
