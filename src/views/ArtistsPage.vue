<template>
  <div class="artists-page">
    <section class="section">
      <div class="container">
        <h2 class="section-title">Complete Roster</h2>
        <div class="artists-grid">
          <router-link
            v-for="artist in artists"
            :key="artist.id"
            to="/artists"
            class="artist-card-link"
          >
            <div class="artist-card-mini">
              <div class="artist-photo">
                <img :src="artist.image" :alt="artist.name" loading="lazy" />
                <div class="artist-photo-overlay"></div>
              </div>
              <div class="artist-info">
                <h3>{{ artist.name }}</h3>
                <span class="artist-genre">{{ artist.genre }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue'

const artists = [
  { id: 1, name: 'Teflon Dons', genre: 'Hardcore Punk', image: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png' },
  { id: 2, name: 'Abomination', genre: 'Death Metal', image: 'https://mad-tourbooking.de/media/01.bmp' },
  { id: 3, name: 'Barcode', genre: 'Hardcore', image: 'https://mad-tourbooking.de/media/Barcode-2026-line-up-900x473.png' },
  { id: 4, name: 'Nasty', genre: 'Hardcore', image: 'https://mad-tourbooking.de/media/Nasty-2025_Instagram_Square-900x900.jpg' },
  { id: 5, name: 'Cruel Hand', genre: 'Hardcore Punk', image: 'https://mad-tourbooking.de/media/CruelHand_01-scaled-e1729698291310-900x706.jpg' },
  { id: 6, name: 'Death Before Dishonor', genre: 'Hardcore', image: 'https://mad-tourbooking.de/media/DBD_Logo.png' },
  { id: 7, name: 'Ignite', genre: 'Melodic Hardcore', image: 'https://mad-tourbooking.de/media/Ignite-2026_InstagramSquare-900x900.jpg' },
  { id: 8, name: 'Madball', genre: 'Hardcore', image: 'https://mad-tourbooking.de/media/Madball-2026_Tourposter_web-637x900.jpg' },
  { id: 9, name: 'Hatebreed', genre: 'Metalcore / Hardcore', image: 'https://mad-tourbooking.de/media/Hatebreed-2026_Tourposter_web-637x900.jpg' },
  { id: 10, name: 'D.R.I.', genre: 'Crossover Thrash', image: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg' },
  { id: 11, name: 'Carcass', genre: 'Death Metal', image: 'https://mad-tourbooking.de/media/Carcsss-june-2026-720x900.jpg' },
  { id: 12, name: 'The Dickies', genre: 'Punk', image: 'https://mad-tourbooking.de/media/TheDickies_blank_web-643x900.jpg' },
  { id: 13, name: 'The Real McKenzies', genre: 'Celtic Punk', image: 'https://mad-tourbooking.de/media/TheRealMcKenzies-2026_Instagram_Square-1-900x900.jpg' },
  { id: 14, name: 'Cancer Bats', genre: 'Punk / Metal', image: 'https://mad-tourbooking.de/media/Post-W-Dates-720x900.jpg' },
  { id: 15, name: 'Maid of Ace', genre: 'Punk Rock', image: 'https://mad-tourbooking.de/media/1000063256-713x900.jpg' },
  { id: 16, name: 'Napalm Death', genre: 'Grindcore', image: 'https://mad-tourbooking.de/media/CMD-2026_Instagram_Square-1-900x900.jpg' },
  { id: 17, name: 'Sacred Reich', genre: 'Thrash Metal', image: 'https://mad-tourbooking.de/media/Hatebreed-Still-a-Threat-Europe-Tour-2026-All-dates_neu-582x900.jpg' },
  { id: 18, name: 'Life of Agony', genre: 'Hardcore / Metal', image: 'https://mad-tourbooking.de/media/Hatebreed-2026_Tourposter_web-637x900.jpg' },
]
</script>

<style scoped>
.artists-page {
  padding-top: 80px;
}

.section {
  padding: 30px 0 80px;
  background: #ffffff;
}
.artists-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
}

.artist-card-link {
  text-decoration: none;
  color: inherit;
}

.artist-card-mini {
  position: relative;
  background: transparent;
  isolation: isolate;
}

/* Photo wrapper that scales on hover */
.artist-card-mini .artist-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
  z-index: 1;
}

.artist-card-mini:hover .artist-photo {
  transform: scale(1.02);
}

.artist-photo-overlay {
  display: none;
}

.artist-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.artist-info {
  padding: 12px 0px 8px 8px;
  background: transparent;
}

.artist-info h3 {
  font-size: 0.9375rem;
  line-height: 1.3;
  margin-bottom: 4px;
  font-weight: 700;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artist-genre {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  opacity: 0.55;
}

@media (max-width: 1024px) {
  .artists-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .artists-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
}

@media (max-width: 400px) {
  .artists-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }

  .artist-info {
    padding: var(--space-sm) var(--space-xs);
  }

  .artist-info h3 {
    font-size: 0.8125rem;
  }
}
</style>
