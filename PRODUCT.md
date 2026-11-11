# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Currently static HTML/CSS/JS (`index.html`, `assets/`, plus `reforest-ai/`), hosted on GitHub Pages. Confirmed for the redesign (2026-11-09): Next.js (App Router, TypeScript) with static export, deployed to GitHub Pages. The owner prefers lightweight output (GUIDE.md §10), so client JS stays minimal and every dependency needs a reason. The bonfire renderer is hybrid: a tiny canvas draws the dormant embers instantly, and Three.js WebGPU (TSL, with automatic WebGL2 fallback) loads lazily for kindling and fire. 21st.dev components may be adapted where they help. The site is bilingual (English at `/`, Spanish at `/es/`); every content string in `content/*.ts` carries both. The home page focuses on hero, path and projects; the journal/records and the Cosmere reading path are side pages (`/journal/`, `/reading/`) reached from two quiet links (owner decision, 2026-11-10). The bonfire is a 3D object: `public/models/bonfire.glb` when present (the owner chose the CC BY 4.0 Sketchfab model "Dark Souls - Bonfire" by UselessViking, credited in the footer), otherwise a built-in model. The full redesign brief is in `GUIDE.md`.

## Users

- Recruiters and hiring engineers scanning for a software/AI engineering candidate.
- Game developers and studios evaluating graphics, engine, and gameplay skills.
- Peers and the wider community following personal content (a blog is planned).

## Product Purpose

Personal portfolio of Fernando Rojas ("Choco"), a Paraguayan CSIE student (UPTP, with an exchange at NTUST, Taiwan). Current status (2026-11): working full time at Dualtti as a Software Developer, also handling client accounts and their Meta Ads campaigns; one final course next semester before graduating. The status must be easy to update. The site presents education, experience, skills, interests, projects, a journal, achievements, and his Cosmere reading journey, and makes contacting him easy. Success: recruiters, game devs, and peers can quickly see what he has built and get in touch.

## Positioning

He builds things from scratch: a custom 3D Java engine on LWJGL3 and GLSL, C++/SFML games, a BCI-to-Unity control pipeline, and his own ML and RAG pipelines. A template portfolio cannot truthfully claim this.

## Operating Context

Visitors arrive from resumes, applications, and links, and scan for projects and contact. Projects link out to source repos or reports; a dedicated Reforest AI page exists. The About section is interactive (hover icons for education, experience, skills, interests).

## Capabilities and Constraints

- Sections: home/intro with Hire me and Resume actions, about (education, experience, skills, interests), a "Blog coming soon" area (journey/Mistborn, media content, future goals), projects, contact.
- Projects: BCI for Game Control, Reforest AI, SigmaChat, 3D Java Game Engine, SkyLimit, Tower of the Forest.
- Experience: Cast S.A. (RASA conversational agents), REEKON (RAG pipeline, Docling), International Games System (arcade game stage with boss fight and weather).
- Contact must stay effortless: email (rojasmfer@proton.me), WhatsApp (wa.me/595981133155), resume download (`assets/media/resume.pdf`), LinkedIn (fernando-rojaschoco), GitHub (chocoff).
- Blog/journal content is not written yet. The Cosmere reading list and its order come from GUIDE.md §8.2; completed and current states need the owner's confirmation and must not be invented.
- Must keep working as a static GitHub Pages site until the Next.js migration lands.

## Brand Commitments

Name shown as "Fernando Rojas | Choco"; the logo/wordmark is "Choco." Voice is first-person, direct, and modest. Type should read professional, not medieval (owner feedback, 2026-11-10). Interests (souls-like games, fantasy books such as Mistborn, graphics, low-level programming) are part of the persona.

## Evidence on Hand

Real project list with stack tags and links, three internships, an education record, a resume (`assets/media/resume.pdf`), a BCI report PDF, and Reforest AI case-study pages with figures. Verified press: Diario HOY, 16 Jun 2026, "Estudiante paraguayo ingresa a firma líder de videojuegos en Taiwán" (https://www.hoy.com.py/nacionales/2026/06/16/estudiante-paraguayo-ingresa-a-firma-lider-de-videojuegos-en-taiwan), about his IGS internship via the UPTP/Taiwan Tech program. The capstone award is unverified until the owner supplies sources. There are no testimonials, metrics, or published blog posts. Do not fabricate any.

## Product Principles

1. Show the work first: projects are the proof, so reaching them stays fast.
2. Serve three audiences at once (recruiter, game dev, peer) without diluting the "builds from scratch" claim.
3. Stay personal and honest; no invented credentials or metrics.
4. Keep the path to contact (Hire me, Resume) always within reach.
5. Placeholder sections (blog) signal intent but must not read as broken.

## Accessibility & Inclusion

No product-specific requirement established. Hover-only reveals in About need a non-hover (touch and keyboard) equivalent.
