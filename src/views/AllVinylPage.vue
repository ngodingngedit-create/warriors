<template>
  <div class="all-vinyl-page">
    <!-- Hero Header -->
    <section class="vinyl-hero">
      <div class="container">
        <span class="vinyl-badge">Revelations Records</span>
        <h1 class="vinyl-hero-title">Vinyl Collection</h1>
        <p class="vinyl-hero-subtitle">Explore our complete catalog of vinyl records — from classic albums to limited editions</p>
      </div>
    </section>

    <!-- All Vinyl Grid -->
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
  padding-top: 0;
}

/* Hero */
.vinyl-hero {
  position: relative;
  padding: 160px 0 100px;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%);
  text-align: center;
  overflow: hidden;
}

.vinyl-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(180, 120, 60, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, rgba(180, 120, 60, 0.10) 0%, transparent 60%);
  pointer-events: none;
}

.vinyl-hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(180, 120, 60, 0.3), transparent);
}

.vinyl-badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #b4783c;
  background: rgba(180, 120, 60, 0.1);
  border: 1px solid rgba(180, 120, 60, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
}

.vinyl-hero-title {
  font-family: var(--font-heading);
  font-size: 3.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #fff;
  margin: 0 0 16px;
  line-height: 1.1;
}

.vinyl-hero-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.5);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Section */
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

@media (max-width: 1024px) {
  .grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
  .vinyl-hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .vinyl-hero {
    padding: 130px 0 60px;
  }
  .vinyl-hero-title {
    font-size: 2rem;
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
