You are generating 4 emblem images for a luxury Coptic Orthodox baptism invitation website (Next.js project in this folder). Generate images only. Do NOT edit any code, config, or existing files. The site auto-detects these exact filenames.

Save everything into: public/signs/   (create the folder if it does not exist)

They must look like ONE matching set, and match the existing file public/intro/dove-gold.png (open it first and copy its style exactly): antique gold leaf with fine engraved line detail, soft warm sheen, Coptic illuminated-manuscript feeling, front-facing, symmetrical, calm.

Rules for every emblem:
- 1024 x 1024 PNG with a real transparent background (alpha channel). No white or black box, no background color, no shadow baked in, no glow, no halo, no rays, no frame or circle around it.
- Single centered object, about 10% padding on every side, same visual weight and size across all four.
- Gold only (#A8843F to #C9A766 range). Exception: the sash in emblem 4 is muted burgundy #6B2A36 with gold edging.
- No people, faces, hands, text, letters, numbers, logos or watermarks.
- Clean anti-aliased edges, no color fringe.

1) public/signs/water.png
   A shallow round baptismal font (basin on a short pedestal) seen slightly from above, with three small water droplets falling into it and two gentle ripple rings on the water surface. Water lines engraved in gold.

2) public/signs/myron.png
   A small elegant oil flask (ampulla) with a rounded body, slim neck and stopper, a single drop of oil at its lip, and one small olive sprig with three leaves resting against its base.

3) public/signs/garment.png
   A small white baptismal robe for an infant, neatly folded, rendered in gold-leaf outline with ivory-gold fill, with a small equal-armed Coptic cross (three points at each arm end) embroidered at the chest.

4) public/signs/sash.png
   A long ribbon sash in muted burgundy (#6B2A36) with fine gold edging, crossed over itself in an X / cross shape with softly flowing ends, like a sash tied crosswise over a child's chest. No body, just the ribbon.

After generating:
- Verify each file exists at the exact path, is exactly 1024 x 1024, and has alpha: `sips -g pixelWidth -g pixelHeight -g hasAlpha public/signs/*.png`.
- Put all four side by side and check they read as one consistent set (same gold, same line weight, same size). Regenerate any that do not match.
- Keep each file under 900 KB (optimize the PNG losslessly if needed).
- Report the four file paths and their dimensions. Do not change any other file.
