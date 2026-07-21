<template>
  <div class="tours-page">
    <HeroSection
      title="Upcoming Tours"
      subtitle="Check out our latest tour packages"
      badge="2026 Season"
    />

    <section class="section">
      <div class="container">
        <h2 class="section-title">All Tours</h2>
        <div class="grid grid-4 tours-grid">
          <TourCard v-for="tour in allTours" :key="tour.id" :tour="tour" />
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import TourCard from '../components/TourCard.vue'
import Footer from '../components/Footer.vue'

const allTours = [
  {
    id: 1, badge: 'New',
    creator: 'M.A.D. Tourbooking',
    title: 'IGNITE<br>CANCER BATS',
    excerpt: 'Hardcore legends IGNITE and Canadian punk-metal powerhouses CANCER BATS team up for a massive co-headlining tour in November 2026.',
    image: 'https://mad-tourbooking.de/media/Post-W-Dates-720x900.jpg',
    link: '/tours'
  },
  {
    id: 2, badge: 'New',
    creator: 'M.A.D. Tourbooking',
    title: 'Carcass<br>Summer Tour 2026',
    excerpt: 'UK legends CARCASS bring their iconic extreme metal across Europe for their summer tour 2026.',
    image: 'https://mad-tourbooking.de/media/Carcsss-june-2026-720x900.jpg',
    link: '/tours'
  },
  {
    id: 3,
    creator: 'M.A.D. Tourbooking',
    title: 'BAD BOYS FOR LIFE<br>Tour 2026',
    excerpt: 'The return of MAD\'s well known BAD BOYS FOR LIFE Tour 2026 featuring THE BONES and more.',
    image: 'https://mad-tourbooking.de/media/BadBoysForLive-2026_Instagram_Square-900x900.jpg',
    link: '/tours'
  },
  {
    id: 4,
    creator: 'M.A.D. Tourbooking',
    title: 'D.R.I.<br>Summer Tour 2026',
    excerpt: 'The kings in Crossover on their annual European Summer Tour 2026 in their 43rd anniversary.',
    image: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg',
    link: '/tours'
  },
  {
    id: 5,
    creator: 'M.A.D. Tourbooking',
    title: 'Hatebreed<br>November 2026',
    excerpt: 'EAST COAST ASSAULT ON EUROPE TOUR 2026 with Hatebreed and Life of Agony.',
    image: 'https://mad-tourbooking.de/media/Hatebreed-2026_Tourposter_web-637x900.jpg',
    link: '/tours'
  },
  {
    id: 6,
    creator: 'M.A.D. Tourbooking',
    title: 'Dickies<br>Summer Tour 2026',
    excerpt: 'Absolute pioneers of US West Coast punk on their summer tour through Europe.',
    image: 'https://mad-tourbooking.de/media/TheDickies_blank_web-643x900.jpg',
    link: '/tours'
  },
  {
    id: 7,
    creator: 'M.A.D. Tourbooking',
    title: 'MAID OF ACE<br>Summer Tour 2026',
    excerpt: 'Catch MAID OF ACE on their summer tour across UK and Europe.',
    image: 'https://mad-tourbooking.de/media/1000063256-713x900.jpg',
    link: '/tours'
  },
  {
    id: 8,
    creator: 'M.A.D. Tourbooking',
    title: 'Campaign For Musical<br>Destruction Tour Part 2 2026',
    excerpt: 'Death Campaign For Musical Destruction Tour 2026 Part 2 - a tour that survived for decades.',
    image: 'https://mad-tourbooking.de/media/CMD-2026_Instagram_5x4-1-720x900.jpg',
    link: '/tours'
  },
  {
    id: 9,
    creator: 'M.A.D. Tourbooking',
    title: 'Hatebreed<br>2026',
    excerpt: 'Hatebreed is hitting Europe again with Sacred Reich as support.',
    image: 'https://mad-tourbooking.de/media/Hatebreed-Still-a-Threat-Europe-Tour-2026-All-dates_neu-582x900.jpg',
    link: '/tours'
  },
  {
    id: 10,
    creator: 'M.A.D. Tourbooking',
    title: 'IGNITE<br>Spring/Summer 2026',
    excerpt: 'IGNITE hits the road for Spring/Summer 2026 with dates across Europe.',
    image: 'https://mad-tourbooking.de/media/Ignite-2026_InstagramSquare-900x900.jpg',
    link: '/tours'
  },
  {
    id: 11,
    creator: 'M.A.D. Tourbooking',
    title: 'The Real McKenzies<br>On Yer Bike Tour',
    excerpt: 'Scottish-Canadian punk legends hit the road for their On Yer Bike Tour.',
    image: 'https://mad-tourbooking.de/media/TheRealMcKenzies-2026_Instagram_Square-1-900x900.jpg',
    link: '/tours'
  },
  {
    id: 12,
    creator: 'M.A.D. Tourbooking',
    title: 'Madball<br>Spring/Summer 2026',
    excerpt: 'New York hardcore legends Madball on tour across Europe for Spring/Summer 2026.',
    image: 'https://mad-tourbooking.de/media/Madball-2026_Tourposter_web-637x900.jpg',
    link: '/tours'
  },
  {
    id: 13,
    creator: 'M.A.D. Tourbooking',
    title: 'Campaign For Musical<br>Destruction Tour 2026',
    excerpt: 'The legendary Campaign For Musical Destruction Tour 2026 is in FULL EFFECT!',
    image: 'https://mad-tourbooking.de/media/CMD-2026_Instagram_Square-1-900x900.jpg',
    link: '/tours'
  },
  {
    id: 14, badge: 'Sold Out',
    creator: 'M.A.D. Tourbooking',
    title: 'Campaign For Musical<br>Destruction Tour 2025',
    excerpt: 'The legendary Campaign For Musical Destruction Tour 2025 - a tour surviving for decades.',
    image: 'https://mad-tourbooking.de/media/CMD-2025_Instagram_Square_soldout-720x900.jpg',
    link: '/tours'
  },
]
</script>

<style scoped>
.tours-grid {
  margin-bottom: var(--space-lg);
}

@media (max-width: 768px) {
  .tours-grid {
    gap: var(--space-sm);
  }
}
</style>
