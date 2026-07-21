# M.A.D. Tourbooking — Vue.js Website

## Project Structure

```
warriors/
├── index.html                    # Entry HTML with SEO meta tags
├── package.json
├── vite.config.js                # Vite config with SPA routing & port 3000
├── public/
│   └── images/
│       ├── logo.svg              # Logo placeholder (replace with your logo)
│       └── logo.png              # (Upload logo here)
└── src/
    ├── main.js                   # App entry point with Vue Router
    ├── style.css                 # Global CSS design system
    ├── App.vue                   # Root component with Navbar + Footer
    ├── router/
    │   └── index.js              # Vue Router config (6 routes)
    ├── components/
    │   ├── Navbar.vue            # Responsive navbar with mobile menu
    │   ├── Footer.vue            # Footer with newsletter + links
    │   ├── HeroSection.vue       # Fullscreen hero with background image
    │   ├── TourCard.vue          # Reusable tour/festival card
    │   └── SocialLinks.vue       # Social media icon links
    └── views/
        ├── HomePage.vue          # Home: hero, tours, artists, festivals, playlist
        ├── ToursPage.vue         # All tours listing
        ├── DatesPage.vue         # Tour dates table
        ├── FestivalsPage.vue     # Festival listings
        ├── ArtistsPage.vue       # Artist roster grid
        └── AboutPage.vue         # About, stats, services, contact form
```

## Pages & Sections

| Page | Route | Key Content |
|------|-------|-------------|
| **Home** | `/` | Hero slider, Upcoming Tours, Branded Tours, Featured Artists, Punk & Disorderly Fest, Spotify Playlist |
| **Tours** | `/tours` | All tour packages with cards (images, excerpts, badges) |
| **Dates** | `/dates` | Complete tour dates table (date/city/venue/country/tickets) |
| **Festivals** | `/festivals` | Festival cards with details and ticket links |
| **Artists** | `/artists` | Artist roster grid with photos and genres |
| **About** | `/about` | Company story, services, stats counter, contact form |

## Design Features

- **Dark & edgy aesthetic** with black primary (#171717), accent blue (#1e70ba), and pink (#e34c6d)
- **Fully responsive** — mobile, tablet, and desktop breakpoints
- **Smooth animations** — hover effects, fade-in, scale transitions
- **Modern typography** — Inter (headings) + Open Sans (body) from Google Fonts
- **Glassmorphism navbar** — transparent/scrolled states
- **Mobile hamburger menu** with slide-in overlay

## Responsive Breakpoints

- Desktop: > 968px — full grid layouts (3-4 columns)
- Tablet: 768-968px — 2 column grids
- Mobile: 480-768px — stacked/single column
- Small mobile: < 480px — optimized spacing

## How to Run

```bash
cd warriors
npm run dev         # Dev server at http://localhost:3000
npm run build       # Production build to /dist
```
