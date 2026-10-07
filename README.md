# kiki-creative-portfolio

Creative portfolio for Karis Ruth Jumawan: motion design, SaaS explainer
videos, kinetic typography, and visual assets, presented as video embeds, a
showreel, breakdown frames, and short client briefs.

Split out of the original unified portfolio (`kiki-portfolio`). Its sibling is
`kiki-tech-portfolio` (engineering case studies).

## Run it

```bash
npm install
npm run dev   # http://localhost:3001
```

The tech portfolio runs on :3000, so both can be open side by side and the
cross-links work locally.

## Adding a project

1. Put the master in `public/video/work/<slug>.mp4` (H.264, 1080p, "faststart"
   so it streams before it fully downloads).
2. Export 4 key frames as `public/work/<slug>-0.jpg` … `-3.jpg` (1280×720).
   Frame 0 is also the poster.
3. Add an entry to [`lib/work.ts`](lib/work.ts):

| Field | Renders as |
| --- | --- |
| `summary` | Card text and the page intro |
| `brief.challenge` / `approach[]` / `deliverables[]` | The brief |
| `frames[]` | Breakdown grid |
| `role[]`, `tools[]` (optional) | Credits. Only list tools you actually used |
| `outcome` (optional) | Results: views, launch, client feedback. Leave out rather than guess |

Cards play a muted preview on hover, and nothing but the poster downloads
until then.

## Deploy (Vercel)

Set `NEXT_PUBLIC_TECH_URL` to the tech site's URL (see `.env.example`).
