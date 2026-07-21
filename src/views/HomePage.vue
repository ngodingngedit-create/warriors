<template>
  <div class="home-page">
    <!-- Hero Slider -->
    <HeroSection
      title="WARRIORS"
      subtitle="Pioneers of hardcore punk &amp; metal booking Since 1983"
      badge="Since 1990"
      :buttons="[
        { label: 'View All Tours', link: '/tours', variant: 'btn-primary btn-lg' },
        { label: 'View All Dates', link: '/dates', variant: 'btn-outline-light btn-lg' }
      ]"
    />

    <!-- Featured Video -->
    <VideoSection />

    <!-- All Tours -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">All Tours</h2>
        <div class="grid grid-4 tours-grid">
          <TourCard v-for="tour in allHomeTours" :key="tour.id" :tour="tour" />
        </div>
        <div class="home-action-buttons">
          <router-link to="/tours" class="btn btn-outline btn-lg">View All Tours</router-link>
          <router-link to="/dates" class="btn btn-outline btn-lg">View All Tour Dates</router-link>
        </div>
      </div>
    </section>

    <!-- Vinyl Records -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Vinyl Records</h2>
        <div class="grid grid-4 tours-grid">
          <VinylCard v-for="vinyl in vinylRecords" :key="vinyl.id" :vinyl="vinyl" />
        </div>
        <div class="text-center mt-3">
          <router-link to="/revelations/merch/vinyl" class="btn btn-outline btn-lg">View All Vinyl</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Artists -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Featured Artists</h2>
        <div class="artists-grid">
          <router-link
            v-for="artist in featuredArtists"
            :key="artist.id"
            :to="'/artists/' + artist.id"
            class="artist-card-link"
          >
            <div class="artist-card-mini">
              <div class="artist-photo">
                <img :src="artist.image" :alt="artist.name" loading="lazy" />
              </div>

              <!-- Explicit torn paper div element over artist image -->
              <div class="torn-paper-divider">
                <img src="/images/sobekankertas.png" alt="Sobekan Kertas" class="torn-paper-img" />
              </div>

              <div class="artist-info">
                <h3>{{ artist.name }}</h3>
              </div>
            </div>
          </router-link>
        </div>
        <div class="text-center mt-3">
          <router-link to="/artists" class="btn btn-outline btn-lg">View All Artists</router-link>
        </div>
      </div>
    </section>

    <!-- Festivals & Playlist -->
    <!-- <section class="section section-alt">
      <div class="container">
        <div class="split-section">
          <!-- Festival -->
          


    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import VideoSection from '../components/VideoSection.vue'
import TourCard from '../components/TourCard.vue'
import VinylCard from '../components/VinylCard.vue'
import Footer from '../components/Footer.vue'

const allHomeTours = [
  {
    id: 1,
    date: 'Sep 12, 2026',
    creator: 'M.A.D. Tourbooking',
    title: 'IGNITE<br>CANCER BATS',
    excerpt: 'Get ready for the ultimate hardcore explosion this fall! Hardcore legends IGNITE and Canadian punk-metal powerhouses CANCER BATS are teaming up for a massive co-headlining tour.',
    image: 'https://mad-tourbooking.de/media/Post-W-Dates-720x900.jpg',
    link: '/tours',
    badge: 'New'
  },
  {
    id: 2,
    date: 'Jun 5, 2026',
    creator: 'M.A.D. Tourbooking',
    title: 'Carcass<br>Summer Tour 2026',
    excerpt: 'UK legends CARCASS bring their iconic extreme metal across Europe for their summer tour 2026.',
    image: 'https://mad-tourbooking.de/media/Carcsss-june-2026-720x900.jpg',
    link: '/tours',
    badge: 'New'
  },
  {
    id: 3,
    date: 'Oct 10, 2026',
    creator: 'M.A.D. Tourbooking',
    title: 'BAD BOYS FOR LIFE<br>Tour 2026',
    excerpt: 'The return of MAD\'s well known BAD BOYS FOR LIFE Tour 2026 featuring THE BONES and more.',
    image: 'https://mad-tourbooking.de/media/BadBoysForLive-2026_Instagram_Square-900x900.jpg',
    link: '/tours'
  },
  {
    id: 4,
    date: 'Jul 18, 2026',
    creator: 'M.A.D. Tourbooking',
    title: 'D.R.I.<br>Summer Tour 2026',
    excerpt: 'The kings in Crossover on their annual European Summer Tour 2026 in their 43rd anniversary.',
    image: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg',
    link: '/tours'
  },
  {
    id: 5,
    date: 'Nov 7, 2026',
    creator: 'M.A.D. Tourbooking',
    title: 'Hatebreed<br>November 2026',
    excerpt: 'EAST COAST ASSAULT ON EUROPE TOUR 2026 with Hatebreed and Life of Agony.',
    image: 'https://mad-tourbooking.de/media/Hatebreed-2026_Tourposter_web-637x900.jpg',
    link: '/tours'
  },
  {
    id: 6,
    date: 'Aug 22, 2026',
    creator: 'M.A.D. Tourbooking',
    title: 'Dickies<br>Summer Tour 2026',
    excerpt: 'Absolute pioneers of US West Coast punk on their summer tour through Europe.',
    image: 'https://mad-tourbooking.de/media/TheDickies_blank_web-643x900.jpg',
    link: '/tours'
  }
]

const vinylRecords = [
  {
    id: 7,
    title: 'The Poison',
    artist: 'Bullet For My Valentine',
    price: 250000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 2005,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
    link: '/revelations/merch/vinyl'
  },
  {
    id: 8,
    title: 'Ashes of the Wake',
    artist: 'Lamb of God',
    price: 320000,
    creator: 'M.A.D. Tourbooking',
    format: '2xVinyl',
    year: 2004,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
    link: '/revelations/merch/vinyl'
  },
  {
    id: 9,
    title: 'The Blackening',
    artist: 'Machine Head',
    price: 280000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 2007,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
    link: '/revelations/merch/vinyl'
  },
  {
    id: 10,
    title: 'Chaos A.D.',
    artist: 'Sepultura',
    price: 260000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1993,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
    link: '/revelations/merch/vinyl'
  }
]

const featuredArtists = [
  { id: 1, name: 'Teflon Dons', image: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png', link: '/artists/1' },
  { id: 2, name: 'Abomination', image: 'https://mad-tourbooking.de/media/01.bmp', link: '/artists/2' },
  { id: 3, name: 'Barcode', image: 'https://mad-tourbooking.de/media/Barcode-2026-line-up-900x473.png', link: '/artists/3' },
  { id: 4, name: 'Nasty', image: 'https://mad-tourbooking.de/media/Nasty-2025_Instagram_Square-900x900.jpg', link: '/artists/4' },
]
</script>

<style scoped>
/* Tours Grid */
.tours-grid {
  margin-bottom: var(--space-xl);
}

/* Artists Grid */
.artists-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

.artist-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Card container matching user reference */
.artist-card-mini {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  background: #171717;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.artist-card-mini:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

/* Photo */
.artist-card-mini .artist-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #1a1a1a;
}

.artist-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.artist-card-mini:hover .artist-photo img {
  transform: scale(1.06);
}

/* Explicit div container for sobekankertas.png image placed directly above photo */
.torn-paper-divider {
  position: absolute;
  bottom: 37px;
  left: 0;
  width: 100%;
  height: 28px;
  z-index: 3;
  pointer-events: none;
}

.torn-paper-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: fill;
  filter: drop-shadow(0 -3px 3px rgba(0, 0, 0, 0.35));
}

/* White Label Section at bottom */
.artist-info {
  position: relative;
  z-index: 2;
  background: #ffffff;
  padding: 12px 6px 14px;
  text-align: center;
  margin-top: auto;
}

.artist-info h3 {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.875rem;
  line-height: 1.2;
  margin: 0;
  font-weight: 800;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Split Section */
.split-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}

/* Festival Card */
.festival-card {
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.festival-image {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
}

.festival-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.festival-card:hover .festival-image img {
  transform: scale(1.05);
}

.festival-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.125rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.festival-card:hover .festival-image-overlay {
  opacity: 1;
}

.festival-info {
  padding: var(--space-xl);
  background: var(--color-bg-alt);
}

.festival-meta {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
  flex-wrap: wrap;
}

.festival-date,
.festival-location {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: var(--color-accent);
}

.festival-info h3 {
  line-height: 1.3;
  margin-bottom: var(--space-sm);
}

.festival-info p {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

.festival-buttons {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

/* Playlist Card */
.playlist-card {
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.playlist-info {
  padding: var(--space-xl);
  background: var(--color-bg-alt);
}

.playlist-info h3 {
  margin-bottom: var(--space-sm);
}

.playlist-info p {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: var(--space-lg);
}

/* Responsive */
@media (max-width: 968px) {
  .artists-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .split-section {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }
}

@media (max-width: 640px) {
  .artists-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }

  .artist-card-link {
    display: flex !important;
    justify-content: center !important;
    width: 100% !important;
  }

  .artist-card-mini {
    width: 100% !important;
    max-width: 270px !important;
    margin: 0 auto !important;
    border-radius: 10px !important;
  }

  .artist-info {
    padding: 10px 6px 12px !important;
  }

  .artist-info h3 {
    font-size: 0.8125rem !important;
  }

  .torn-paper-divider {
    bottom: 33px !important;
    height: 24px !important;
  }
}

.home-action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.text-center.mt-3 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

@media (max-width: 640px) {
  .home-action-buttons {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 10px !important;
    width: 100% !important;
    max-width: 270px !important;
    margin: 20px auto 0 !important;
  }

  .text-center.mt-3 {
    display: flex !important;
    justify-content: center !important;
    margin-top: 20px !important;
  }

  .home-action-buttons .btn,
  .text-center.mt-3 .btn {
    width: 100% !important;
    max-width: 270px !important;
    margin-left: 0 !important;
    text-align: center !important;
    justify-content: center !important;
    padding: 8px 14px !important;
    font-size: 0.75rem !important;
    border-radius: 6px !important;
  }

  .festival-buttons {
    flex-direction: column;
  }

  .festival-buttons .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
