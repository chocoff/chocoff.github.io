# Web Portfolio

Fernando Rojas (Choco). A portfolio that begins in darkness: kindle the bonfire to enter.

Built with Next.js (static export), a 3D bonfire that turns as you scroll (Three.js WebGPU with
TSL compute particles and an automatic WebGL2 fallback), and a 2D canvas for the embers.

## Editing content

Everything that changes over time lives in `content/`. Every text has an English and a
Spanish version, written as `{ en: "...", es: "..." }`. Edit, commit, push, and it deploys.

| What | File |
| --- | --- |
| Current status, intro, skills, interests, contact links | `content/site.ts` |
| Education and work timeline | `content/journey.ts` |
| Projects | `content/projects.ts` |
| Public records (press, posts) | `content/records.ts` |
| Journal posts | `content/journal.ts` |
| Cosmere reading path | `content/cosmere.ts` |
| Buttons, headings and other interface text | `content/i18n.ts` |
| Reforest AI write-up (English only) | `content/reforest.json` |

Adding a Cosmere book: append it to `books` with `status: "latest"` and set the previous
latest to `"read"`.

Pages: `/` (English) and `/es/` (Spanish), each with `/journal/` and `/reading/`.

## The 3D bonfire

The site looks for `public/models/bonfire.glb`. If it is there, that model is used and
credited in the footer; if not, a built-in bonfire is shown. See `public/models/README.md`
for how to download the Sketchfab model.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploying

`.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages on every push to `main`.
One-time setup: in the repository settings, **Pages → Build and deployment → Source: GitHub Actions**.
