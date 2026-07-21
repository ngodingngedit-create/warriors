<template>
  <div class="all-vinyl-page">
    <section class="section">
      <div class="container">
        <div class="grid grid-4 tours-grid">
          <VinylCard v-for="vinyl in allVinyls" :key="vinyl.id" :vinyl="vinyl" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import VinylCard from '../components/VinylCard.vue'

const allVinyls = [
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
  },
  {
    id: 11,
    title: 'Roots',
    artist: 'Sepultura',
    price: 290000,
    creator: 'M.A.D. Tourbooking',
    format: '2xVinyl',
    year: 1996,
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
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
]
</script>

<style scoped>
.all-vinyl-page {
  padding-top: 100px;
}

.section {
  padding: 0 0 80px;
  background: #ffffff;
}

.grid {
  display: grid;
  gap: 28px;
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
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
    padding: 0 0 48px;
  }
}

@media (max-width: 480px) {
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
</style>
