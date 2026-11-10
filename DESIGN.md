---
name: Choco Portfolio
description: A portfolio that begins in darkness. The visitor kindles a bonfire, and its light reveals the person behind it.
colors:
  soot: "#0c0a08"
  char: "#14100c"
  stone: "#1d1813"
  stone-2: "#2a221b"
  iron: "#3b3128"
  bone: "#e9dfcd"
  ash: "#b0a493"
  ash-dim: "#8a7e70"
  ember: "#ff6a1f"
  flame: "#ffa646"
  gilt: "#d2ab62"
  rust: "#8c3f1c"
typography:
  display:
    fontFamily: "IM Fell English SC, Georgia, serif"
    fontSize: "clamp(3rem, 1.4rem + 7.4vw, 7.2rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "IM Fell English SC, Georgia, serif"
    fontSize: "clamp(2.4rem, 1.6rem + 3.4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  title:
    fontFamily: "IM Fell English SC, Georgia, serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 1.05
  inscription:
    fontFamily: "IM Fell English, Georgia, serif"
    fontSize: "clamp(1.15rem, 1rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 0.98rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Alegreya Sans, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.07em"
rounded:
  plate: "2px"
  control: "3px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 4.5vw, 56px)"
  section-top: "clamp(96px, 16vh, 180px)"
  section-bottom: "clamp(72px, 10vh, 120px)"
  head-gap: "clamp(48px, 8vh, 88px)"
  row: "22px"
  control-gap: "10px"
components:
  action-fire:
    backgroundColor: "{colors.ember}"
    textColor: "#1a0b03"
    rounded: "{rounded.control}"
    padding: "0.65em 1.15em"
    height: "48px"
  action-fire-hover:
    backgroundColor: "{colors.flame}"
  action:
    backgroundColor: "rgba(20, 16, 12, 0.72)"
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    padding: "0.65em 1.15em"
    height: "48px"
  action-hover:
    backgroundColor: "rgba(42, 34, 27, 0.9)"
  action-icon:
    backgroundColor: "rgba(20, 16, 12, 0.72)"
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    width: "48px"
    height: "48px"
  text-link:
    textColor: "{colors.flame}"
  spine-novel:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.gilt}"
    rounded: "{rounded.plate}"
    width: "50px"
    height: "236px"
  cosmere-panel:
    backgroundColor: "{colors.stone}"
    padding: "26px 28px 28px"
---

# Design System: Choco Portfolio

## Overview

**Creative North Star: "The Kindled Path"**

A dark world lit by one living fire. The page opens in near-total darkness: a few embers on charred logs that react to the cursor, which is itself a small live coal. When the visitor kindles the bonfire, a real rendered fire (Three.js WebGPU compute particles, WebGL2 fallback, a 2D canvas underneath) rises and settles at the foot of the hero. From then on it is the page's only light source. Each section is a place that light reaches as you travel: the path of bonfires, the works, the journal, the Cosmere shelf, and the final fire where every contact action waits.

The register is medieval fantasy held to professional restraint. The display voice is an old letterpress face set like an inscription. The ground is warm soot, the fire runs from ember through amber to old gilt, and smoke is the only gradient. Nothing is outlined in glow: light falls on things from below, as a fire would light them. Recruiters must still read who Choco is, what he does now and how to reach him within one viewport, so the fantasy is never allowed to cost legibility.

**Key Characteristics:**
- A warm soot ground (never blue-black), with grain and faint smoke in the air below the hero.
- One fire as the single light source, a fixed canvas behind content, with a hearth glow at the viewport foot whose strength follows the section.
- IM Fell English SC inscriptions over a humanist sans (Alegreya Sans) body.
- Rasters are lit from below and dimmed so no image outshines the fire.
- Drawn line sigils (24px grid, 1.5 stroke) for navigation; no icon fonts, no emoji, no brand glyphs.
- Every interaction has a tap or keyboard equivalent, and reduced motion gets a still, lit page.

## Colors

Fire on soot: four warm darks, three bone-to-ash text tones, and a fire ramp from ember to gilt.

### Primary
- **Ember** (#ff6a1f): the live flame. Primary action fill (Email me), active sigil, lit bonfire marks, the status dot, selection tint.
- **Flame** (#ffa646): the hotter tongue. Links, hover state of primary actions, the "Choco" alias, "Open" shelf states, focus rings.

### Secondary
- **Old Gilt** (#d2ab62): foil and inscription. Role lines on the path, stack lists, minor titles, spine foil, the cosmere panel's top rule.
- **Rust** (#8c3f1c): charred warmth, kept in reserve for fire-lit edges; not used as a fill.

### Neutral
- **Soot** (#0c0a08): page ground, the GPU canvas clear colour, browser theme colour.
- **Char** (#14100c), **Stone** (#1d1813), **Stone 2** (#2a221b): raised surfaces and hairline dividers (Stone 2 is the rule colour between rows).
- **Iron** (#3b3128): borders on secondary actions, the path's dashed trail, logs, scrollbar thumb.
- **Bone** (#e9dfcd): primary text and headings.
- **Ash** (#b0a493): secondary text and ledes.
- **Ash Dim** (#8a7e70): tertiary text, meta, dates.

### Named Rules
**The One Light Rule.** The fire is the only light source. Ember and flame mark what is alive or actionable; they never decorate a static surface.

**The Warm Dark Rule.** Darks carry red-brown warmth. A cool or blue-black neutral breaks the world.

## Typography

**Display Font:** IM Fell English SC (Georgia, serif fallback), self-hosted via next/font
**Inscription Font:** IM Fell English, italic (aliases, prompts, the world labels on the shelf)
**Body Font:** Alegreya Sans (system-ui fallback)

**Character:** The Fell types are 17th-century letterpress, uneven and carved. They give the headings the weight of an inscription in a ruined keep, and Alegreya Sans keeps the reading calm and modern.

### Hierarchy
- **Display** (400, clamp 3–7.2rem, 0.92): the hero name only.
- **Headline** (400, clamp 2.4–4.6rem, 0.98): section titles.
- **Title** (400, clamp 1.6–2.3rem, 1.05): place names on the path, work titles (up to 3.2rem), ledger and shelf names (1.35–1.8rem).
- **Inscription** (italic, clamp 1.15–1.5rem): the intro prompt, the hero alias, interests, world labels.
- **Body** (400, clamp 1.0625–1.1875rem, 1.6): prose, held to a 66ch measure.
- **Label** (0.8rem, uppercase, 0.07em tracking, Ash Dim): field labels inside work facts and skill groups only.

### Named Rules
**The Inscription Rule.** Display type is IM Fell English SC at weight 400. Hierarchy comes from size and colour, never from bolding the display face or adding a third family.

**The No-Eyebrow Rule.** Nothing small sits above a heading. Dates, kinds and meta follow the heading they describe.

## Layout

Single-column journey down a 1240px measure with a fluid gutter (16–56px). Sections open with generous top space (clamp 96–180px) and a heading block capped at 760px. The hero is a centered, full-height column: name, alias, status line, one-sentence detail, contact rail, with the fire's base at 90% of the viewport (80% below 900px, clearing the tab bar).

Each section uses its own structure, so the page never becomes a stack of cards:
- **Path:** a central dashed trail, with stops alternating left and right on desktop and collapsing to a left rail below 800px.
- **Works:** large two-column spreads that alternate image sides, then a ruled list of smaller works.
- **Records:** a ledger of rows with a date column.
- **Journal:** a ruled grid of shelves.
- **Cosmere:** a bookshelf of spines grouped by world. Below 640px it becomes a horizontally scrolling shelf with an edge fade, a swipe cue, and the latest book scrolled into view.

Navigation is a fixed sigil rail at the left on desktop and becomes a labeled bottom tab bar below 900px.

Breakpoints: 1360px (rail label behaviour), 900px (tab bar, works stack), 800px (path rail, about stack), 720px (ledger stacks), 640px (shelf scrolls, small work rows).

## Elevation & Depth

Depth is light, not shadow. Surfaces are flat at rest. Distance is told by how much firelight reaches a thing: the hearth glow at the viewport foot (opacity follows the section), warm under-light overlays on rasters, and a dark scrim that keeps text legible over the fire.

### Shadow Vocabulary
- **Heat rise** (`box-shadow: 0 10px 28px -14px rgba(255,120,40,.55)`): hover on secondary actions.
- **Fire hover** (`box-shadow: 0 12px 32px -12px rgba(255,120,40,.8)`): hover on the primary action.
- **Plate** (`box-shadow: 0 30px 60px -30px rgba(0,0,0,.9)`): featured work images sitting in the dark.
- **Spine lift** (`box-shadow: 0 18px 24px -14px rgba(255,106,31,.5)` with `translateY(-10px)`): the selected book.
- **Lit mark** (`filter: drop-shadow(0 -2px 6px rgba(255,140,50,.7))`): bonfire marks and the active sigil, light thrown upward.

### Named Rules
**The Light-From-Below Rule.** Every glow has an offset and comes from beneath, the way a fire lights a room. Zero-offset halos and glowing outlines are not part of this world.

## Shapes

Hard-edged and old. Images and spines carry a 2px corner, controls 3px, and only the status dot and sigil hit areas are round. Borders are 1px hairlines in Iron or Stone 2. The silhouettes come from drawn things (flame marks, logs, book spines, foil bands), never from geometric masks.

## Components

### Buttons (actions)
- **Shape:** 3px corners, 48px minimum height (54px in the closing rail).
- **Primary (`action--fire`):** Ember fill, near-black text, weight 700. Hover goes to Flame with the fire hover shadow.
- **Secondary (`action`):** 72% Char fill with an Iron hairline. Hover warms the fill and turns the border Gilt.
- **Icon (`action--icon`):** a 48px square fused to the right of the Email action (copy address), with a polite live region confirming the copy.
- **Text links:** Flame with a 35% underline that goes solid on hover. Outbound links carry the drawn arrow.

### Contact rail
Email (mailto) plus copy, WhatsApp and Résumé (download) as actions, then LinkedIn, GitHub and the plain address as a quiet secondary row. It appears identically in the hero and at the close; no other component carries contact.

### Navigation (sigils)
Drawn 24px line sigils, 1.5 stroke: flame, path, anvil, seal, book, lantern. They sit in Ash Dim at rest, warm to Flame with an upward lit-mark on hover or focus, and turn Ember on the active section (`aria-current="location"`). On desktop, labels and a one-line preview slide in on hover or focus; on mobile the labels are always visible in the tab bar.

### Path stop
A bonfire mark on the trail that kindles as it enters view (the flame scales in, then flickers slowly). The official logo comes first as a link, then the place name in Title, the full institution name, the role in Gilt, dates and kind, a summary, and the location with the official domain link.

### Work spread
The image plate is lit from below (sepia and dimming, a multiply top-shadow, a screen under-light). Diagrams on white carry `data-tone="light"` and are dimmed harder. Next to it sit the title, a one-line summary, Problem / Build / Stack facts under a Stone 2 rule, and links.

### Ledger row
Date, then the title linked to its source (the whole row is the hit area), the summary, and the source name in Gilt. Spanish titles carry `lang="es"`.

### Journal shelf
Name, then what it holds, then its state in italic. "Open" in Flame links to a filled section; "First entry coming" stays in Ash Dim until posts exist.

### Signature: Cosmere spine
Bookcloth per world (Scadrial umber, Sel verdigris, Nalthis crimson, Roshar storm slate, Canticle burnt gold) with Gilt foil bands, the title set vertically in the display face, and a small flame above the spine. Novels, novellas and short stories differ in width and height. The latest book's flame burns larger and flickers; a planned book shows an unlit outline. Hover, focus or tap selects a spine and fills the panel below with title, meta, blurb and an official link.

### Signature: the bonfire
There are four states, with motion only where it carries meaning:
- **Dormant:** embers flicker on logs and brighten near the pointer, which is drawn as a small live coal.
- **Kindling:** about 1.7s of embers flaring, sparks rising, and a radial sweep of warm light.
- **Lit:** the fire settles low; the name sharpens out of a blur.
- **Ambient:** sparse motes drift up the page.

The fire canvas hides whenever its loop pauses, so a stale frame never shows. Returning visitors get a one-second relight, deep links and reduced motion land lit, and "Skip intro" and Escape always work.

## Do's and Don'ts

### Do:
- **Do** keep Soot (#0c0a08) as the ground and the fire as the single light source.
- **Do** light every raster from below and dim it until it sits under the fire in brightness.
- **Do** set headings in IM Fell English SC at 400 and let size and Bone/Ash/Gilt carry rank.
- **Do** give every hover a focus and tap equivalent, and every animation a reduced-motion still.
- **Do** keep the contact rail one action away: Email, WhatsApp and Résumé in the hero and at the close.
- **Do** edit content only in `content/*.ts`; the page reads from there.

### Don't:
- **Don't** introduce cool or blue-black neutrals, or a light section.
- **Don't** outline anything in glow or use zero-offset halos; light comes from below.
- **Don't** put an eyebrow, kicker or date above a heading.
- **Don't** use icon fonts, emoji or brand glyphs; draw sigils on the 24px, 1.5-stroke grid, and name brands in words.
- **Don't** let fire particles or sparks pass behind live text without the soot scrim.
- **Don't** use FromSoftware assets or their coiled-sword bonfire; the bonfire here is drawn logs and a rendered fire.
