---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface brief: Home (portfolio journey)

Scope: the whole one-page portfolio (intro, hero, path, projects, journal, Cosmere path, close) plus `/projects/reforest-ai`. Mode: Experience, with contact as the conversion. Code-led (no image generation).

Audience and job: recruiters, game devs and peers arriving from resume and links. In 10 seconds they should know who Choco is, his current role at Dualtti, that he builds from scratch, and how to reach him (email, WhatsApp, resume, LinkedIn, GitHub always within one action).

Content: PRODUCT.md and GUIDE.md. Verified records: GEN reel (1 Apr 2026, UPTP programming contest win), Diario HOY (16 Jun 2026), GEN reel (17 Jun 2026), LinkedIn post (IGS internship wrap-up). Cosmere read list confirmed by the owner 2026-11-09; Wind and Truth is the latest flame.

Resolved: Dualtti website is https://dualtti.com/, verified 2026-11-09 (its own page describes a Paraguayan Meta Ads agency, matching the owner's role). Journal ships as a shelf structure: Records and Reading are filled; Notes, Build logs, University and Reflections are marked "First entry coming" until the owner writes posts in content/journal.ts. Open: optional crackle sound, not built.

## Direction contract

THESIS: A journey that begins with a single spark. The page is a dark world lit by one living fire. It refuses the standard portfolio stack of hero, about cards and project grid: every section is a place the fire's light reaches as you travel.

OWN-WORLD: Soot ground (warm near-black), charred stone and ash greys, firelight orange through amber to an old-gilt gold; smoke as the only gradient. A pinned fantasy display face set like a carved inscription, with a quiet humanist body face. Iron-thin rules, no glowing outlines; light falls on things rather than outlining them. Sigils as drawn SVG line marks.

STORY: The visitor kindles the bonfire, meets Choco by its light, walks the path of bonfires (UPTP to Dualtti), sees the works he forged, reads his records and journal, follows his Cosmere trail, and rests at the final fire where every contact action waits.

FIRST VIEWPORT: Full black. A small ember cluster at center, reacting to the cursor or finger; "Kindle the flame" set small beneath it; a quiet "Skip" link at the bottom. On kindling, the fire rises at center-bottom and the name "Fernando Rojas", with "Choco" beneath it, is revealed above it in large display type. The status line and contact rail (Email, WhatsApp, Resume) sit under the name.

FORM: pinned by GUIDE.md, seed: none (pinned). "The primary visual inspiration should be the atmosphere and visual identity of FromSoftware's Dark Souls series, particularly its bonfires." and "a professional portfolio that begins in darkness, invites the visitor to kindle a bonfire, and gradually reveals my professional journey". Signature interaction: kindling the bonfire, after which the fire persists as the page's light source, and its warmth follows scroll position. Motion grammar: slow ember drift, exponential ease-out reveals as light reaches each section; reduced motion gives a still, lit page.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance


## Revision 2026-11-10 (owner feedback)

- Bonfire becomes a real 3D model that moves and rotates with scroll; the owner supplies a CC BY Sketchfab model as `public/models/bonfire.glb`, a built-in model stands in until then.
- Home narrows to hero, about (pinned, facets change as the model turns), path (pinned, walks horizontally), works, contact. Journal/records and the Cosmere shelf move to side pages behind two quiet doors.
- Type relaxed from IM Fell English to Marcellus + Hanken Grotesk.
- Spanish version at `/es/` with an EN / ES toggle.
- Not re-reviewed by the finish reviewer after this revision.
