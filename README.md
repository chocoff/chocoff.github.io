# Web Portfolio

Fernando Rojas (Choco). A portfolio that begins in darkness: kindle the bonfire to enter.

Built with Next.js (static export), a 2D canvas for the embers, and a Three.js WebGPU fire
(TSL compute particles, with an automatic WebGL2 fallback).

## Editing content

Everything that changes over time lives in `content/`. Edit, commit, push, and it deploys.

| What | File |
| --- | --- |
| Current status, intro, skills, interests, contact links | `content/site.ts` |
| Education and work timeline | `content/journey.ts` |
| Projects | `content/projects.ts` |
| Public records (press, posts) | `content/records.ts` |
| Cosmere reading path | `content/cosmere.ts` |
| Reforest AI write-up | `content/reforest.json` |

Adding a Cosmere book: append it to `books` with `status: "latest"` and set the previous
latest to `"read"`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploying

`.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages on every push to `main`.
One-time setup: in the repository settings, **Pages → Build and deployment → Source: GitHub Actions**.
