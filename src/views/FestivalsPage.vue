<template>
  <div class="festivals-page">
    <HeroSection
      title="Festivals"
      subtitle="Our annual festivals and special events"
      badge="Featured Events"
      background="https://mad-tourbooking.de/media/PD2025_Instagram_square-2-1-900x900.jpg"
    />

    <section class="section">
      <div class="container">
        <h2 class="section-title">Our Festivals</h2>
        <div class="festivals-list">
          <div v-for="festival in festivals" :key="festival.id" class="festival-card-horizontal">
            <div class="festival-card-image">
              <img :src="festival.image" :alt="festival.name" loading="lazy" />
            </div>
            <div class="festival-card-content">
              <div class="festival-meta">
                <span class="festival-date">{{ festival.date }}</span>
                <span class="festival-location">{{ festival.location }}</span>
              </div>
              <h3 class="festival-name">{{ festival.name }}</h3>
              <p class="festival-description">{{ festival.description }}</p>
              <div class="festival-actions">
                <router-link to="/dates" class="btn btn-gold">View Dates</router-link>
                <a :href="festival.ticketUrl" target="_blank" class="btn btn-outline">Get Tickets</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import Footer from '../components/Footer.vue'

const festivals = [
  {
    id: 1,
    name: 'Punk & Disorderly Fest',
    date: 'September 19-20, 2025',
    location: 'Berlin, Germany',
    description: 'M.A.D.\'s long-running annual 2-day festival bringing the World\'s best punk rock, oi! and hardcore bands to the Berlin crowd for a weekend to be remembered.',
    image: 'https://mad-tourbooking.de/media/PD2025_Instagram_square-2-1-900x900.jpg',
    ticketUrl: 'https://www.madtix.de/'
  },
  {
    id: 2,
    name: 'Summer Madness Fest',
    date: 'August 2026',
    location: 'Various Locations',
    description: 'Our annual summer festival series featuring the best in hardcore punk and metal across multiple European locations.',
    image: 'https://mad-tourbooking.de/media/CMD-2026_Instagram_Square-1-900x900.jpg',
    ticketUrl: 'https://www.madtix.de/'
  },
  {
    id: 3,
    name: 'Campaign For Musical Destruction',
    date: 'Fall 2026',
    location: 'Europe',
    description: 'The legendary touring festival that has been running for over 30 years, featuring Napalm Death and an incredible lineup.',
    image: 'https://mad-tourbooking.de/media/CMD-2026_Instagram_5x4-1-720x900.jpg',
    ticketUrl: 'https://www.madtix.de/'
  },
  {
    id: 4,
    name: 'Hell On Earth Tour',
    date: 'Winter 2026',
    location: 'Europe',
    description: 'The ultimate extreme metal package touring across Europe with the most devastating bands in the scene.',
    image: 'https://mad-tourbooking.de/media/Hatebreed-2026_Tourposter_web-637x900.jpg',
    ticketUrl: 'https://www.madtix.de/'
  },
  {
    id: 5,
    name: 'Persistence Tour',
    date: 'Spring 2027',
    location: 'Europe',
    description: 'The legendary hardcore punk touring festival that has been a staple of the European scene for decades.',
    image: 'https://mad-tourbooking.de/media/Post-W-Dates-720x900.jpg',
    ticketUrl: '#'
  },
  {
    id: 6,
    name: 'Rebellion Tour',
    date: 'Spring 2027',
    location: 'Europe',
    description: 'A celebration of punk rock rebellion featuring the most iconic names in the genre.',
    image: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg',
    ticketUrl: '#'
  }
]
</script>

<style scoped>
.festivals-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}

.festival-card-horizontal {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 0;
  background: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.festival-card-horizontal:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.festival-card-image {
  overflow: hidden;
}

.festival-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.festival-card-horizontal:hover .festival-card-image img {
  transform: scale(1.05);
}

.festival-card-content {
  padding: var(--space-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-accent);
}

.festival-name {
  font-size: 1.375rem;
  margin-bottom: var(--space-sm);
}

.festival-description {
  color: var(--color-text-light);
  font-size: 0.9375rem;
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.festival-actions {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .festival-card-horizontal {
    grid-template-columns: 1fr;
  }

  .festival-card-image {
    aspect-ratio: 16/9;
  }

  .festival-card-content {
    padding: var(--space-lg);
  }

  .festival-actions {
    flex-direction: column;
  }

  .festival-actions .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
