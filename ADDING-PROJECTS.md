# Adding a New Project to the Portfolio

## Required fields in `src/data/projects.js`

Add a new object to the `projects` array:

| Field | Description |
|---|---|
| `id` | Unique slug, e.g. `'my-new-project'` |
| `title` | `{ en: '...', nl: '...' }` |
| `subtitle` | `{ en: '...', nl: '...' }` |
| `year` | e.g. `'2026'` |
| `role` | `{ en: '...', nl: '...' }` |
| `status` | `'completed'` or `'in-progress'` |
| `tags` | Array of tech tags, e.g. `['React', 'TypeScript']` |
| `thumbnail` | Path to desktop icon image |
| `image` | Path to hero/header image |
| `overview` | `{ en: '...', nl: '...' }` |
| `iconPosition` | `{ x: '50%', y: '50%' }` — position on the desktop |

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
| `galleryImages` | Array of `{ src, alt, caption? }` |
| `galleryVideos` | Array of `{ src, poster, vertical? }` — add `vertical: true` for portrait videos |
| `youtubeEmbed` | YouTube embed URL |
| `pdfUrl` | Link to a PDF document |
| `pdfLabel` | `{ en: '...', nl: '...' }` |
| `period` | `{ en: '...', nl: '...' }` — use instead of `year` for date ranges |
| `researchQuestion` | `{ en: '...', nl: '...' }` |
| `currentStatus` | `{ en: '...', nl: '...' }` — shown when `status: 'in-progress'` |

## Image specifications

| Asset | Size | Format | Location |
|---|---|---|---|
| Desktop icon | **512 × 512px** | PNG or SVG | `public/images/projects/icons/` |
| Hero/header image | **1280 × 480px** | PNG or JPG | `public/images/projects/` |
| Gallery images | Any — scale automatically | PNG or JPG | `public/images/projects/` |
| Gallery videos | Any aspect ratio — add `vertical: true` for portrait | MP4 | `public/images/projects/` |
