<template>
  <div class="label-vinyl-page">
    <section class="section main-content">
      <div class="container">
        <!-- Label Title -->
        <div class="label-header">
          <h2 class="label-title">{{ formattedLabelName }} Katalog Vinyl</h2>
          <p class="label-subtitle">Koleksi Rilis Piringan Hitam Resmi {{ formattedLabelName }}</p>
        </div>

        <!-- 4-Column Responsive Grid -->
        <div class="grid grid-4 products-grid">
          <VinylCard v-for="vinyl in filteredVinyls" :key="vinyl.id" :vinyl="vinyl" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import VinylCard from '../components/VinylCard.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const labelSlug = computed(() => route.params.labelName || 'warriors')

const formattedLabelName = computed(() => {
  if (!labelSlug.value) return 'Warriors Records'
  return labelSlug.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

const allVinyls = [
  {
    id: 7,
    title: 'The Poison - 20th Anniversary LP',
    artist: 'Bullet For My Valentine',
    price: 350000,
    creator: 'Sony Music',
    format: 'Vinyl 180g',
    year: 2005,
    label: 'sony',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 8,
    title: 'Ashes of the Wake - Remastered 2LP',
    artist: 'Lamb of God',
    price: 380000,
    creator: 'Warner Music',
    format: '2xVinyl',
    year: 2004,
    label: 'warner',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 9,
    title: 'The Blackening - Heavyweight Gatefold',
    artist: 'Machine Head',
    price: 360000,
    creator: 'Prosthetic Records',
    format: 'Vinyl',
    year: 2007,
    label: 'prosthetic',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 10,
    title: 'Chaos A.D. - Expanded Gatefold Edition',
    artist: 'Sepultura',
    price: 320000,
    creator: 'Nuclear Blast',
    format: 'Vinyl',
    year: 1993,
    label: 'nuclear-blast',
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  }
]

const dummyFallbackVinyls = [
  {
    id: 101,
    title: 'The Poison - Limited Deluxe Edition',
    artist: 'Bullet For My Valentine',
    price: 350000,
    format: 'Vinyl 180g',
    year: 2005,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 102,
    title: 'Ashes of the Wake - 20th Remaster',
    artist: 'Lamb of God',
    price: 380000,
    format: '2xVinyl Limited',
    year: 2004,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 103,
    title: 'The Blackening - Heavyweight Gatefold',
    artist: 'Machine Head',
    price: 360000,
    format: 'Vinyl Gatefold',
    year: 2007,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 104,
    title: 'Chaos A.D. - Classic Remaster Edition',
    artist: 'Sepultura',
    price: 320000,
    format: 'Vinyl 180g',
    year: 1993,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 105,
    title: 'Reign in Blood - Special Red Vinyl LP',
    artist: 'Slayer',
    price: 340000,
    format: 'Vinyl Color LP',
    year: 1986,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 106,
    title: 'Vulgar Display of Power - Deluxe Gatefold',
    artist: 'Pantera',
    price: 390000,
    format: '2xVinyl Heavyweight',
    year: 1992,
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  }
]

const filteredVinyls = computed(() => {
  const matches = allVinyls.filter(v => v.label === labelSlug.value)
  if (matches.length > 0) return matches

  // Return dummy data for any label that doesn't have specific custom items
  return dummyFallbackVinyls.map((item, idx) => ({
    ...item,
    id: 1000 + idx,
    creator: formattedLabelName.value
  }))
})
</script>

<style scoped>
.label-vinyl-page {
  padding-top: 72px;
  background: #ffffff;
  min-height: 100vh;
}

.main-content {
  padding: 40px 0 80px;
}

.label-header {
  margin-bottom: 28px;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: 16px;
}

.label-title {
  font-family: var(--font-heading, sans-serif);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 800;
  color: #171717;
  margin-bottom: 4px;
}

.label-subtitle {
  font-size: 0.9375rem;
  color: #777777;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .label-vinyl-page {
    padding-top: 64px;
  }

  .main-content {
    padding: 20px 0 40px;
  }

  .label-header {
    margin-bottom: 20px;
    padding-bottom: 12px;
  }

  .label-title {
    font-size: 1.25rem;
  }

  .label-subtitle {
    font-size: 0.8125rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
