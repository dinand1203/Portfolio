# dinanddap.nl

My portfolio: a React site with an AI assistant that answers questions about my work.

**Live at [dinanddap.nl](https://dinanddap.nl)**

## What's in here

The site is a single-page React app with client-side routing. The home page lists my engineering projects and earlier design work; each project has its own case-study page at `/projects/<id>`. All content is bilingual (English and Dutch) and lives in plain data files, so adding a project means editing one array and dropping in an image.

The chat widget in the corner talks to a small Express API (in `chatbot-api/`) that runs on my own VPS and calls the Anthropic API with a system prompt describing my work. The site and the API deploy separately.

## Stack

| Part | Technology |
|---|---|
| Frontend | React 18, React Router, Vite |
| Styling | Plain CSS with design tokens (no framework) |
| Fonts | Instrument Sans, Instrument Serif, JetBrains Mono |
| Chat API | Node.js, Express, Anthropic SDK, Docker |
| Hosting | GitHub Pages (site), self-hosted VPS behind Traefik (API) |

## Development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

The chat widget needs `VITE_CHAT_API_URL` set at build time; without it the input is disabled and the rest of the site works normally.

## Deployment

Every push to `main` triggers a GitHub Actions workflow that builds the site and publishes it to GitHub Pages under the `dinanddap.nl` custom domain. The build copies `index.html` to `404.html` so deep links like `/projects/respondly` survive a hard refresh on GitHub Pages.

The chat API deploys separately: copy `chatbot-api/index.js` to the server and rebuild its Docker container. Pushing to `main` does not update it.

## Project structure

```
src/
├── components/     # Navbar, Footer, ChatWidget
├── pages/          # Home, ProjectPage, NotFound
├── data/
│   ├── projects.js # all project content, bilingual
│   └── site.js     # UI copy, bilingual
├── i18n.jsx        # language context (EN/NL, persisted)
└── index.css       # design tokens and shared styles
chatbot-api/        # Express API for the chat widget
```

## Adding a project

See [ADDING-PROJECTS.md](ADDING-PROJECTS.md) for the fields and image specs.

---

Designed and built by Dinand Dap. Questions? [dinand@dap-group.com](mailto:dinand@dap-group.com), or ask the chatbot on the site.
