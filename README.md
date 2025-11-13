# Facebook Share Count Example App

This repository contains a lightweight Express.js application that demonstrates how to look up Facebook share metrics for any public URL. It exposes a JSON API and ships with a simple front-end so you can try it out in the browser.

> ⚠️ The Facebook Graph API increasingly enforces authentication. For production usage you may need to supply an `access_token` with the required permissions. This demo relies on the public endpoint and is intended for experimentation only.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (bundled with Node.js)

### Installation

```bash
npm install
```

### Running the app

```bash
npm run start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. Enter a URL, hit **Lookup**, and the app will display the normalized URL and share count returned by Facebook.

For hot reloading during development, use:

```bash
npm run dev
```

## Project Structure

- `src/facebook.js` — wrapper around the Facebook Graph API.
- `src/server.js` — Express server exposing the `/api/shares` endpoint and serving static assets.
- `public/index.html` — minimal UI for experimenting with the API.
- `getfacebook.js` — original Google Apps Script function preserved for reference.

## Troubleshooting

- **Rate limits or auth errors**: The Graph API may respond with errors if you exceed rate limits or the URL requires a token. Inspect the JSON payload shown in the UI or the server logs for details.
- **Invalid URL**: The API normalizes URLs by prepending `https://` when no protocol is provided. Ensure the address resolves publicly.

## License

MIT
