# Adding a New Project to the Portfolio

## Required fields in `src/data/projects.js`

Add a new object to the `projects` array:

| Field | Description |
|---|---|
| `id` | Unique slug, e.g. `'my-new-project'` — becomes the URL `/projects/my-new-project` |
| `category` | `'engineering'` (numbered case-study list) or `'design'` (Design & media grid) |
| `title` | `{ en: '...', nl: '...' }` |
| `subtitle` | `{ en: '...', nl: '...' }` |
| `year` | e.g. `'2026'` |
| `role` | `{ en: '...', nl: '...' }` |
| `status` | `'completed'` or `'in-progress'` |
| `tags` | Array of tech tags, e.g. `['React', 'TypeScript']` — shown on the home page row and project header |
| `image` | Path to hero/header image (also used as list thumbnail) |
| `overview` | `{ en: '...', nl: '...' }` |

Projects appear on the home page in array order, so put the strongest work first.

## Optional fields

| Field | Description |
|---|---|
| `liveUrl` | Link to live app |
| `githubUrl` | Link to GitHub repo |
| `features` | `{ en: [...], nl: [...] }` — bullet list |
| `approach` | `{ en: [...], nl: [...] }` — paragraphs array |
| `challenge` | `{ en: '...', nl: '...' }` |
| `results` | `{ en: '...', nl: '...' }` |
| `techStack` | Array of `{ layer: '...', tech: '...' }` rows |
| `skillTags` | Array of skill/tool strings shown at the bottom of the case study |
| `galleryImages` | Array of `{ src, alt, caption? }` |
| `galleryVideos` | Array of `{ src, poster, vertical? }` — add `vertical: true` for portrait videos |
| `youtubeEmbed` | YouTube embed URL |
| `pdfUrl` | Link to a PDF document |
| `pdfLabel` | `{ en: '...', nl: '...' }` |
| `period` | `{ en: '...', nl: '...' }` — use instead of `year` for date ranges |
| `researchQuestion` | `{ en: '...', nl: '...' }` |
| `currentStatus` | `{ en: '...', nl: '...' }` — shown when `status: 'in-progress'` |

Legacy fields from the old desktop-OS design (`thumbnail`, `iconPosition`) are ignored and can be left in place or removed.

## Image specifications

| Asset | Size | Format | Location |
|---|---|---|---|
| Hero/header image | **1280 × 480px** (or wider, ~16:6–16:9) | PNG or JPG | `public/images/projects/` |
| Gallery images | Any — scale automatically | PNG or JPG | `public/images/projects/` |
| Gallery videos | Any aspect ratio — add `vertical: true` for portrait | MP4 | `public/images/projects/` |

## Preview and deploy

```bash
npm run dev     # preview at http://localhost:5173
npm run build   # must pass before pushing
```

Push to `main` and GitHub Actions deploys to dinanddap.nl automatically.
