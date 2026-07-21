<template>
  <div class="artists-page">
    <section class="section">
      <div class="container">
        <h2 class="section-title">Artist</h2>
        <div class="artists-grid">
          <router-link
            v-for="artist in visibleArtists"
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

        <div class="text-center mt-3" v-if="showCount < artists.length">
          <button class="btn btn-outline btn-lg" @click="showCount = artists.length">View All Artists</button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
  { id: 16, name: 'Lower Class Brats', genre: 'Punk Rock', image: 'https://mad-tourbooking.de/media/LCB_Main_Web_90x50-1.jpg' },
  { id: 17, name: 'Biru Baru', genre: 'Pop', image: 'https://picsum.photos/seed/birubaru/800/800' },
  { id: 18, name: 'Efek Rumah Kaca', genre: 'Indie Rock', image: 'https://picsum.photos/seed/erk/800/800' },
  { id: 19, name: 'Fiersa Besari', genre: 'Folk', image: 'https://picsum.photos/seed/fiersa/800/800' },
  { id: 20, name: 'For Revenge', genre: 'Emo / Rock', image: 'https://picsum.photos/seed/forrevenge/800/800' },
  { id: 21, name: 'Elephant Kind', genre: 'Indie Pop', image: 'https://picsum.photos/seed/elephant/800/800' },
  { id: 22, name: 'Dongker', genre: 'Punk Rock', image: 'https://picsum.photos/seed/dongker/800/800' },
  { id: 23, name: 'FSTVLST', genre: 'Rock', image: 'https://picsum.photos/seed/fstvlst/800/800' },
  { id: 24, name: 'Gledeg', genre: 'Rock', image: 'https://picsum.photos/seed/gledeg/800/800' },
]

// Default 4 cards displayed as requested
const showCount = ref(4)

const visibleArtists = computed(() => {
  return artists.slice(0, showCount.value)
})
</script>

<style scoped>
.artists-page {
  padding-top: 80px;
}

.section {
  padding: 40px 0 80px;
  background: #ffffff;
}

.artists-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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

@media (max-width: 1024px) {
  .artists-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .artists-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
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
</style>
