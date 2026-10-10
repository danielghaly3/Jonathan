# Jonathan · Baptism Invitation · DESIGN.md

## Design read
Editorial-luxury invitation for family and parish guests, heritage-manuscript language: Coptic iconography (cross, iconostasis arch, textile lattice) set with the restraint of a modern luxury print piece. Airy, respectful, gentle.

Dials: `DESIGN_VARIANCE 4` · `MOTION_INTENSITY 7` · `VISUAL_DENSITY 2` (v2: client asked for a fully centered layout, more animation and more category graphics).

### Deliberate overrides (and why)
| Default / tool pick | Override | Reason |
|---|---|---|
| UI UX Pro Max: purple + Inter/Playfair | Ivory, dusty blue, antique gold, muted burgundy | Palette is named in the brief. |
| Taste skill: no warm ivory + gold | Kept | Named in the brief; heritage/liturgical identity genuinely calls for it. |
| Taste skill: serif discouraged | Cormorant Garamond display | Manuscript/heritage brief; Garamond lineage suits liturgical print. Not Playfair (overused), not Fraunces/Instrument. |
| Taste skill: no centered hero | Centered stack, split on desktop | An invitation is a manifesto piece: the name *is* the design. |
| Taste skill: no hand-rolled SVG | Cross, lattice band, arch are hand-built | The brief asks for these exact marks; they are simple geometry. UI icons use Phosphor. |

### References (principles only, no brand copying)
- **Bugatti**: uppercase display at regular weight, emphasis from size + tracking, never bold; long section rhythm (~120px).
- **Wired**: serif display + quiet sans metadata duet; print-magazine restraint.
- **Apple**: photography carries emotion; chrome recedes.

## Tokens (CSS variables in `app/globals.css`)
| Token | Light | Dark ("vigil") | Use |
|---|---|---|---|
| `--bg` | `#FAF6EE` warm ivory | `#14181E` | page |
| `--bg-tint` | `#F2EBDD` | `#1A1F27` | section tint |
| `--panel` | `#E4EAEF` dusty blue mist | `#1D2530` | details panel |
| `--ink` | `#3B302B` | `#EDE4D3` | body text |
| `--ink-soft` | `#6A5D55` | `#B9AF9F` | secondary text |
| `--gold` | `#A8843F` | `#C9A766` | ornaments, hairlines (decorative only) |
| `--gold-ink` | `#7E6129` | `#D4B57A` | small gold text (AA) |
| `--blue` | `#9FB4C5` | `#6F889C` | placeholders, motifs |
| `--blue-ink` | `#4C6376` | `#A9BDCD` | labels |
| `--burgundy` | `#6B2A36` | `#D29AA2` | name, primary button |

One accent family: gold for ornament, burgundy for the single interactive emphasis. No other hues.

## Type
- Display: **Cormorant Garamond** 300/400/500 + italic. `JONATHAN` uppercase, weight 300, tracking `0.14em`.
- Labels/meta: **Jost** 400/500, uppercase, tracking `0.24em`, 11-12px. Rationed: hero + details only.
- Body: Cormorant 20-22px, leading 1.5, max 34ch.
- Italic descenders: leading >= 1.15.

## Grid & spacing
- Mobile-first single column, 20px gutters. `max-w-6xl` container.
- Section rhythm: 96px mobile, 144px desktop.
- Shape lock (v3, "all-soft"): arches with a 32px base for photos and the details panel, a round medallion for the 1:1 photo, 32-36px cards, 16px inputs, pill buttons. One elevation style: `.frame` (hairline gold ring + warm lifted shadow). Full-width ornaments fade out at the edges (`.fade-x`). Tinted sections fade in/out instead of hard bands.

## Motifs
- **Coptic cross**: equal arms, three-pointed terminals (12 points), center ring. Gold stroke on ivory fill.
- **Lattice band**: lozenge + small cross unit (textile/iconostasis woodwork), framed by hairlines.
- **Gold divider**: fading hairline, lozenge-cross at center.
- **Arch**: semicircular iconostasis door, inset gold frame, small cross keystone.

## Motion (Motion library; reduced motion = instant, loops removed)
| Element | Motion | Why |
|---|---|---|
| Royal doors | iconostasis doors swing open in 3D on "Open the invitation" | Entering the sanctuary; the invitation's opening ritual |
| Hero cross + olive wreath | cross strokes draw, branches grow, leaves bud one by one | Peace and the oil of anointing |
| Name | letters rise out of a blur in sequence | The climax of the hero |
| Fixed backdrop | light rays sway; gold motes rise; giant cross watermark turns with scroll; lattice columns at the edges (desktop) | A sticky, living "church interior" behind the page |
| Water | a drop falls into the font, ripples spread (loop) | Baptism by water |
| Photos | scroll parallax at different depths | Depth while reading |
| Countdown | digits roll on change | Anticipation |
| RSVP | form cross-fades to a thank-you | Feedback |

## Components
`CopticCross`, `LatticeBand`, `GoldDivider`, `ArchPhoto`, `Reveal`, page sections, `/print` card.

## Do / Don't
- Do keep ornaments thin (1-1.25px), gold, and sparse.
- Do let whitespace carry luxury.
- Don't use cartoons, emoji, glows, gradients on text, drop shadows.
- Don't use em-dashes anywhere.
- Don't invent event facts; all are in `invitation.config.ts`.

## Verified facts
- Coptic Orthodox baptism is administered together with chrismation (Holy Myron); copy refers only to "Baptism" to stay safe.
- Scripture default: Galatians 3:27 (NKJV), "For as many of you as were baptized into Christ have put on Christ."
- Venue (client-provided): The Trinity Hall, Canadian Coptic Centre, 1245 Eglinton Ave W, Mississauga, ON L5V 2M4. Address matches public listings for the Canadian Coptic Centre (Virgin Mary & St. Athanasius); the "Trinity Hall" name was not independently verified.
- Date (client-provided): 2026-11-14, following the Divine Liturgy.

## v5 redesign: "From the Font to the Feast"
One continuous scroll through the day, all centered, parchment palette from the intro.
1. Cover: intro sanctuary (masked fade), gold dove, Jonathan in the arch, name across its base, date pill.
2. Scripture on still water (large slow ripples behind the verse).
3. The signs of baptism: pinned scroll story (Water, Holy Myron, White Garment, Red Sash) in a turning gold halo; text in `invitation.config.ts` → `signs`, emblems in `public/signs/` (see CODEX_SIGNS_ART.md). Wording to be confirmed with the family's priest.
4. Family: invitation words + one feature photo (arch outline draws in, zoom settles, glint).
5. Save the day: date medallion (weekday/month/year circling the day, turning with scroll), venue, Maps/Calendar pills, countdown halos.
6. Reply: two-choice RSVP; a floating "Reply" pill follows the guest and hides at the form.

## v6: flight and order
- One heading system (`SectionHeading`): gold lozenge-cross, display title with an italic burgundy word, optional italic line. Used by every section; one rhythm (py-28 / sm:py-36).
- Desktop section guide (xl+): lozenges on the right, current section named.
- Scroll dove (`FlyingDove`): spring-follows a weaving path through the margins, leans into turns, flaps faster while scrolling, steps aside at the reply form. Side-view frames (`public/dove/fly-up.png`, `fly-down.png`, see CODEX_DOVE_FLIGHT.md) give a real wingbeat and turn to face its direction; without them the front dove squeezes its wings.
- Reply by dove (`Courier`): form becomes a wax-sealed envelope, a dove swoops in, takes it and flies off (3.6 s), then the thank-you. Skipped under reduced motion.

## v7: the invitation as a book
The long scroll is replaced by `Book`: one calm page at a time, always starting at the cover (scroll restoration off, hash cleared).
Pages: Welcome (cover) · The verse · The sacrament (tap-to-read emblems, auto-cycling until touched) · The family · The day (medallion + countdown) · The place · Your reply · Blessing.
Turning: page bar (prev / lozenges / next + label), swipe, arrow keys, mouse wheel (long pages scroll first). Pages cross-fade with a soft slide and blur; a gold dove crosses the screen in the direction of travel on every turn.
Background cross watermark is static. Every page fits 375x667 without scrolling.

## v8: Heavenly & Dreamy (current)
Chosen by the client: soft sky, clouds, baby blue and ivory; one long scroll.
- Palette: sky gradient `#c9dcec → #eef2f3 → #f7f2ea` at the top cross-fading to golden light `#f8e9d6 → #f6dfc4` at the end of the page. Ink `#2e3d4c`, soft ink `#5a6876`, gold `#b18d48` / gold text `#7a5c22`, accent deep dusty blue `#3b5874` (replaces burgundy). All text pairs pass AA.
- Type: Cormorant Garamond; the name is set large in light italic ("Jonathan"), labels in Jost caps.
- Sky (`Sky`): fixed, behind all text. Far and near cloud layers rise at different speeds and drift sideways; gold light sparkles; the gold dove flies a weaving path between the layers (never covers text).
- Intro (`Opening`): a curtain of clouds drifts ajar to reveal the dove and the name; "Open the invitation" parts it fully.
- Photos (`CloudPhoto`): christening ovals with a white halo, fine gold inner ring and clouds drifting across the base.
- Signs: gold emblems bobbing on little clouds, meaning beneath each.
- Cards, pills, date medallion and countdown are frosted glass (`.glass`, solid fallback under reduced transparency).
- Clouds are drawn with radial gradients until painted PNGs exist (CODEX_SKY_ART.md).

## v9: Heavenly layout, parchment palette (current)
Client asked to keep the heavenly design but return to the gold-and-burgundy palette.
- Tokens back to the v4 parchment set: bg `#f3ece0`, panel `#faf5eb`, ink `#3b302b`, soft ink `#6a5d55`, gold `#a8843f`, gold text `#7e6129`, accent burgundy `#6b2a36` (AA verified earlier on these tones).
- Sky: the intro's sanctuary light (ivory glow, faint blue haze above, gold warmth below over `#efe6d6 → #f6f0e5`) warming to deep golden light with a hint of burgundy at the end of the page.
- Clouds: warm ivory puffs with parchment shading; glass is ivory-tinted with a gold hairline; wax seal burgundy again.

## v10: Save the day + venue image
- Save the day (`SaveTheDay`): a frosted-glass arch "calendar page" resting on clouds (clouds behind the card), dove perched on top; weekday, month between gold rules, the day large in burgundy over a slowly turning golden halo, year, "Following the Divine Liturgy"; the month grid fades in and the day gets a burgundy disc with a gold ring drawn around it; countdown as a row of rolling numbers with gold dividers; "Add to calendar" lives here now.
- Where we gather: optional arched picture window at the top of the venue card (`photos.venue`, /place/venue.jpg). A real photo of the hall is preferred; CODEX_PLACE_ART.md makes a clearly artistic illustration. Hidden while missing.

## v11: The Sanctuary and the Font (current)
Client feedback: sky and clouds read as a memorial. The site now represents the ceremony itself: the church and the water of the font.
- Backdrop (`Sanctuary`): the painted sanctuary with its baptismal font, veiled in ivory (strongest at the centre for text), candle glows flickering over the painted candles, warm gold deepening toward the end, the dove of the Spirit flying behind the text.
- Intro: the candlelit sanctuary; dove descends, JONATHAN in Cinzel; "Open the invitation" drops a water drop into the font and the ripple opens onto the site (feathered radial mask + gold/blue ripple ring).
- Photos (`ReflectedPhoto`): church arches standing over still water, with a mirrored, fading, shimmering reflection and ripples at the waterline.
- Signs: emblems hover over small pools with ripples. Save the day: arched card between two church candles (sm+). Headings: small gold Coptic cross. Dividers: drifting gold wave line (`WaveLine`). Footer: the dove above the font's water.
- Removed: clouds, sky gradients, cloud art. Palette unchanged (parchment, gold, burgundy); a little water-blue appears only in water.
- v11.1 smoothness: ripples are plain elements with CSS transform/opacity animations (GPU) instead of JS-driven SVG; on phones the dove glides along the right edge with a slow, soft spring and calmer wingbeat, the backdrop does not zoom, and only two candle glows flicker. Measured on a 4x-throttled phone: ~2.6 ms main-thread work per scroll frame.
- Venue art: church beside a still reflecting pool, no clouds (public/place/venue-church.jpg).
