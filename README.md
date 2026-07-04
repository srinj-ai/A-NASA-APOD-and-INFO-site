# NASA APOD Explorer

A lightweight web app that displays [NASA's Astronomy Picture of the Day (APOD)](https://apod.nasa.gov/apod/astropix.html). View today's image or explore a random entry from NASA's archive.

![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

---
<p align="center">
  <img src="dist/assets/Screenshot 2026-07-04 151208.png" alt="TXJ WebOS">
</p>


## Features

- Today's Astronomy Picture of the Day on load
- Random APOD explorer button
- Responsive glassmorphism UI
- Environment-based API key configuration

## Project Structure

```
├── css/
│   └── styles.css       # App styles
├── js/
│   └── app.js           # APOD fetch logic
├── .github/workflows/
│   └── deploy.yml       # GitHub Pages deployment
├── index.html           # Main page
├── .env.example         # API key template (copy to .env)
├── vite.config.js       # Vite build config
└── package.json
```

## Setup

### 1. Get a NASA API key

Sign up for a free key at [api.nasa.gov](https://api.nasa.gov/).

### 2. Configure your API key

Copy the example env file and add your key:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_NASA_API_KEY=your_actual_api_key_here
```

### 3. Install and run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Static files are output to the `dist/` folder.

### OR 

Vsit my site live at:

`https://srinj-ai.github.io/A-NASA-APOD-and-INFO-site/`

## Tech Stack

- HTML, CSS, JavaScript
- [Vite](https://vite.dev/) for dev server and env variable injection
- NASA APOD [API](https://api.nasa.gov/)

## License

MIT — see [LICENCE](LICENSE).

## Made By

[SRINJOY DAS](https://github.com/srinj-ai) 
