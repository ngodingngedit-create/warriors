<template>
  <div class="all-vinyl-page">
    <!-- Vinyl Grid -->
    <section class="section">
      <div class="container">
        <div v-if="filteredVinyls.length === 0" class="empty-state">
          <p>No vinyl records found for this label.</p>
        </div>
        <div v-else class="grid grid-4 tours-grid">
          <VinylCard v-for="vinyl in filteredVinyls" :key="vinyl.id" :vinyl="vinyl" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VinylCard from '../components/VinylCard.vue'

const route = useRoute()
const labelSlug = computed(() => route.params.labelName)

const allVinyls = [
  {
    id: 7,
    title: 'The Poison',
    artist: 'Bullet For My Valentine',
    price: 250000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 2005,
    label: 'sony',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 8,
    title: 'Ashes of the Wake',
    artist: 'Lamb of God',
    price: 320000,
    creator: 'M.A.D. Tourbooking',
    format: '2xVinyl',
    year: 2004,
    label: 'warner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 9,
    title: 'The Blackening',
    artist: 'Machine Head',
    price: 280000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 2007,
    label: 'prosthetic',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 10,
    title: 'Chaos A.D.',
    artist: 'Sepultura',
    price: 260000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1993,
    label: 'roadrunner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 11,
    title: 'Roots',
    artist: 'Sepultura',
    price: 290000,
    creator: 'M.A.D. Tourbooking',
    format: '2xVinyl',
    year: 1996,
    label: 'roadrunner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 12,
    title: 'Rust in Peace',
    artist: 'Megadeth',
    price: 310000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1990,
    label: 'universal',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 13,
    title: 'Master of Puppets',
    artist: 'Metallica',
    price: 270000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1986,
    label: 'warner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 14,
    title: 'Reign in Blood',
    artist: 'Slayer',
    price: 250000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1986,
    label: 'nuclear-blast',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 15,
    title: 'Among the Living',
    artist: 'Anthrax',
    price: 260000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1987,
    label: 'nuclear-blast',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 16,
    title: 'Vulgar Display of Power',
    artist: 'Pantera',
    price: 300000,
    creator: 'M.A.D. Tourbooking',
    format: '2xVinyl',
    year: 1992,
    label: 'warner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 17,
    title: 'Cowboys from Hell',
    artist: 'Pantera',
    price: 280000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1990,
    label: 'warner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 18,
    title: 'Number of the Beast',
    artist: 'Iron Maiden',
    price: 270000,
    creator: 'M.A.D. Tourbooking',
    format: 'Vinyl',
    year: 1982,
    label: 'sony',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
]

const filteredVinyls = computed(() => {
  return allVinyls.filter(v => v.label === labelSlug.value)
})
</script>

<style scoped>
.all-vinyl-page {
  padding-top: 80px;
}

.section {
  padding: 80px 0;
  background: #ffffff;
}

.grid {
  display: grid;
  gap: 28px;
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1.125rem;
}

@media (max-width: 1024px) {
  .grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .section {
    padding: 48px 0;
  }
}

@media (max-width: 480px) {
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>
