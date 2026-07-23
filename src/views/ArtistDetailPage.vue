<template>
  <div class="artist-detail-page">
    <!-- Header Banner / Hero Section -->
    <div class="artist-hero">
      <div class="hero-bg" :style="{ backgroundImage: `url(${artist.bannerImage || artist.image})` }"></div>
      <div class="hero-overlay"></div>
      
      <div class="container hero-container">
        <!-- Hero Title Row (Centered) -->
        <div class="hero-top-row text-center">
          <h1 class="artist-main-title">{{ artist.name }}</h1>
        </div>

        <!-- Centered Artist Banner Image -->
        <div class="banner-wrapper">
          <img :src="artist.image" :alt="artist.name" class="artist-banner-img" />
        </div>
      </div>
    </div>

    <!-- Sticky Navigation Tab Bar -->
    <div class="sticky-tabs-container">
      <div class="container">
        <div class="content-navigation-tabs">
          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'deskripsi' }"
            @click="selectTab('deskripsi')"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>{{ t('detail.tab_desc') }}</span>
          </button>

          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'rilis' }"
            @click="selectTab('rilis')"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>{{ t('section.discography') }}</span>
          </button>

          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'kontak' }"
            @click="selectTab('kontak')"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{{ langState.current === 'en' ? 'Contact & Booking' : 'Kontak & Booking' }}</span>
          </button>

          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'tur' }"
            @click="selectTab('tur')"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>{{ t('section.artist_tours') }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="details-content-section">
      <div class="container">
        <!-- TAB 1: MAIN DESKRIPSI VIEW -->
        <div v-if="mainTab === 'deskripsi'" class="content-sections-wrapper">
          <!-- Section 1: Deskripsi Artis -->
          <section id="deskripsi" class="section-block fade-in">
            <div class="section-header-row">
              <div class="section-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3 class="section-block-title">{{ langState.current === 'en' ? `Biography & Details - ${artist.name}` : `Deskripsi & Biografi ${artist.name}` }}</h3>
            </div>

            <div class="artist-bio-text text-left">
              <div class="bio-paragraphs" :class="{ 'collapsed': !isBioExpanded }">
                <p v-for="(paragraph, index) in artistBioParagraphs" :key="index" class="bio-text">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Interactive Read More Button -->
              <button 
                v-if="artistBioParagraphs.length > 1" 
                class="read-more-toggle-btn" 
                @click="isBioExpanded = !isBioExpanded"
              >
                <span>{{ isBioExpanded ? (langState.current === 'en' ? 'Show Less' : 'Tampilkan Lebih Sedikit') : t('detail.read_more') }}</span>
                <svg :class="{ 'rotate-180': isBioExpanded }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            <!-- Quick Stats -->
            <div class="stats-row-grid">
              <div class="stat-card">
                <span class="stat-num">{{ artist.genre || 'Hardcore' }}</span>
                <span class="stat-label">Genre</span>
              </div>
              <div class="stat-card">
                <span class="stat-num">{{ artist.origin || 'NYC, USA' }}</span>
                <span class="stat-label">{{ langState.current === 'en' ? 'Hometown' : 'Kota Asal' }}</span>
              </div>
              <div class="stat-card">
                <span class="stat-num">{{ artistTours.length }} {{ langState.current === 'en' ? 'Tours' : 'Tur' }}</span>
                <span class="stat-label">{{ t('section.artist_tours') }}</span>
              </div>
            </div>
          </section>

          <!-- Section 2: Rilis Album & Vinyl (Same Card as Vinyl, Default 4 Cards) -->
          <section id="rilis" class="section-block fade-in">
            <div class="section-header-row">
              <div class="section-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 class="section-block-title">Rilis Album &amp; Vinyl</h3>
            </div>

            <!-- 4 Vinyl Cards Grid (Identical to Vinyl Card Component) -->
            <div class="grid grid-4 vinyl-releases-grid">
              <VinylCard v-for="vinyl in artistReleases" :key="vinyl.id" :vinyl="vinyl" />
            </div>
          </section>

          <!-- Section 3: Kontak & Booking -->
          <section id="kontak" class="section-block fade-in">
            <div class="section-header-row">
              <div class="section-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 class="section-block-title">Kontak &amp; Booking Agent</h3>
            </div>

            <div class="contact-card-box text-left">
              <div class="contact-row">
                <div class="contact-icon-bubble">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="contact-info">
                  <h4>Booking Enquiries &amp; Tour Agent</h4>
                  <p>Untuk reservasi show, booking tur Eropa &amp; Internasional:</p>
                  <a :href="'mailto:' + (artist.bookingEmail || 'MARC@MAD-TOURBOOKING.DE')" class="btn btn-primary mt-1">
                    Hubungi Agent: {{ artist.bookingEmail || 'MARC@MAD-TOURBOOKING.DE' }}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- TAB 2: STANDALONE JADWAL TUR VIEW -->
        <div v-else-if="mainTab === 'tur'" class="content-sections-wrapper fade-in">
          <section id="tur" class="section-block">
            <div class="section-header-row">
              <div class="section-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 class="section-block-title">Jadwal Tur Mendatang {{ artist.name }}</h3>
            </div>

            <div v-if="artistTours.length > 0" class="grid grid-4 tours-grid">
              <TourCard v-for="tour in artistTours" :key="tour.id" :tour="tour" />
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Footer hidden for now -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TourCard from '../components/TourCard.vue'
import VinylCard from '../components/VinylCard.vue'
import Footer from '../components/Footer.vue'
import { langState, t } from '../store/langState.js'

const route = useRoute()
const mainTab = ref('deskripsi')
const highlightedTab = ref('deskripsi')
const isBioExpanded = ref(false)

// Database Artis
const artistsDatabase = [
  {
    id: 1,
    name: 'Teflon Dons',
    genre: 'Hardcore Punk',
    origin: 'New York City, USA',
    formedYear: '2008 - Sekarang',
    image: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    bannerImage: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    bookingEmail: 'MARC@MAD-TOURBOOKING.DE',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com',
      youtube: 'https://youtube.com'
    },
    bio: `Teflon Dons is a band that defies easy categorization, blending the raw energy of classic Oi! and street rock with the smart sounds of mod, the soulful grooves of 60's soul and reggae, the flamboyance of glam, and the grit of pub rock. Imagine a truck full of COCK SPARRER records colliding with a truck full of Otis Redding records—that's the Teflon Dons sound.

Formed more than fifteen years ago, these five friends from New York City have built a reputation for their sharp style and lively performances. Their music is a testament to their wide range of influences, resulting in a unique sound that breathes new life into a genre often considered stagnant.

After numerous EPs, singles, splits, and collections, the long-running New York City "Maximum Oi 'n B" combo are finally releasing their latest proper LP "Unstoppable". Longtime listeners and new fans alike are bound to agree that Unstoppable, at long last, is their definitive statement, and the record that fully captures their acclaimed live energy.`
  },
  {
    id: 2,
    name: '45 ADAPTERS',
    genre: 'Oi! / Street Rock',
    origin: 'New York City, USA',
    formedYear: '2009 - Sekarang',
    image: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    bannerImage: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    bookingEmail: 'MARC@MAD-TOURBOOKING.DE',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    },
    bio: `45 ADAPTERS is a band that defies easy categorization, blending the raw energy of classic Oi! and street rock with the smart sounds of mod, the soulful grooves of 60's soul and reggae, the flamboyance of glam, and the grit of pub rock. Imagine a truck full of COCK SPARRER records colliding with a truck full of Otis Redding records—that's the 45 ADAPTERS sound.

Formed more than fifteen years ago, these five friends from New York City have built a reputation for their sharp style and lively performances. Their music is a testament to their wide range of influences, resulting in a unique sound that breathes new life into a genre often considered stagnant.

After numerous EPs, singles, splits, and collections, the long-running New York City "Maximum Oi 'n B" combo are finally releasing their first proper LP "Unstoppable". Longtime listeners and new fans alike are bound to agree that Unstoppable, at long last, is their definitive statement, and the record that fully captures their acclaimed live energy.`
  },
  {
    id: 3,
    name: 'Barcode',
    genre: 'Hardcore',
    origin: 'Copenhagen, Denmark',
    formedYear: '1995 - Sekarang',
    image: 'https://mad-tourbooking.de/media/Barcode-2026-line-up-900x473.png',
    bannerImage: 'https://mad-tourbooking.de/media/Barcode-2026-line-up-900x473.png',
    bookingEmail: 'MARC@MAD-TOURBOOKING.DE',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com'
    },
    bio: `Danish hardcore veterans BARCODE return with a vengeance. Known for relentless aggression, heavy breakdown riffs, and fast-paced hardcore anthems, Barcode continues to dominate festival stages across Europe.`
  },
  {
    id: 4,
    name: 'Nasty',
    genre: 'Hardcore / Beatdown',
    origin: 'Kelmis, Belgium',
    formedYear: '2004 - Sekarang',
    image: 'https://mad-tourbooking.de/media/Nasty-2025_Instagram_Square-900x900.jpg',
    bannerImage: 'https://mad-tourbooking.de/media/Nasty-2025_Instagram_Square-900x900.jpg',
    bookingEmail: 'MARC@MAD-TOURBOOKING.DE',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      spotify: 'https://spotify.com'
    },
    bio: `NASTY - four words: Four Men Beat Down. The heavyweight beatdown hardcore titan from Europe brings crushing breakdowns, intense mosh pits, and uncompromising heavy music.`
  }
]

const artist = computed(() => {
  const paramId = parseInt(route.params.id) || 1
  const found = artistsDatabase.find(a => a.id === paramId)
  if (found) return found
  return {
    id: paramId,
    name: '45 ADAPTERS',
    genre: 'Street Rock / Oi!',
    origin: 'New York City, USA',
    formedYear: '2009 - Sekarang',
    image: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    bannerImage: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    bookingEmail: 'MARC@MAD-TOURBOOKING.DE',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com'
    },
    bio: `45 ADAPTERS is a band that defies easy categorization, blending the raw energy of classic Oi! and street rock with the smart sounds of mod, the soulful grooves of 60's soul and reggae, the flamboyance of glam, and the grit of pub rock.`
  }
})

const artistBioParagraphs = computed(() => {
  if (!artist.value.bio) return []
  return artist.value.bio.split('\n\n').filter(p => p.trim().length > 0)
})

const artistTours = computed(() => {
  return [
    {
      id: 1,
      badge: 'New',
      date: '05 - 10 Aug 2026',
      creator: 'M.A.D. Tourbooking',
      title: `${artist.value.name}<br>Summer Tour 2026`,
      image: artist.value.image,
      link: '/tours'
    },
    {
      id: 2,
      date: '12 - 15 Oct 2026',
      creator: 'M.A.D. Tourbooking',
      title: `${artist.value.name}<br>Autumn Assault`,
      image: 'https://mad-tourbooking.de/media/Carcsss-june-2026-720x900.jpg',
      link: '/tours'
    }
  ]
})

// Default 4 Vinyl Release Cards (Same shape & data structure as VinylCard component)
const artistReleases = computed(() => {
  return [
    { 
      id: 101, 
      title: 'Unstoppable LP', 
      price: 450000, 
      creator: artist.value.name, 
      coverImage: artist.value.image, 
      vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png' 
    },
    { 
      id: 102, 
      title: 'Don\'t Get Me Started 7"', 
      price: 250000, 
      creator: artist.value.name, 
      coverImage: 'https://mad-tourbooking.de/media/BadBoysForLive-2026_Instagram_Square-900x900.jpg', 
      vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png' 
    },
    { 
      id: 103, 
      title: 'Collected Works Vol. 1', 
      price: 520000, 
      creator: artist.value.name, 
      coverImage: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg', 
      vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png' 
    },
    { 
      id: 104, 
      title: 'Live in Berlin 2024 LP', 
      price: 380000, 
      creator: artist.value.name, 
      coverImage: 'https://mad-tourbooking.de/media/CruelHand_01-scaled-e1729698291310-900x706.jpg', 
      vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png' 
    }
  ]
})

// Tab Navigation Logic
function selectTab(tabKey) {
  if (tabKey === 'tur') {
    mainTab.value = 'tur'
    highlightedTab.value = 'tur'
    const stickyContainer = document.querySelector('.sticky-tabs-container')
    if (stickyContainer) {
      const yOffset = -70
      const y = stickyContainer.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  } else {
    mainTab.value = 'deskripsi'
    highlightedTab.value = tabKey

    setTimeout(() => {
      const el = document.getElementById(tabKey)
      if (el) {
        const yOffset = -130
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 50)
  }
}

// Scroll spy for highlighted tab when scrolling inside 'deskripsi' view
function handleScroll() {
  if (mainTab.value !== 'deskripsi') return
  const sections = ['deskripsi', 'rilis', 'kontak']
  const scrollPos = window.pageYOffset + 160

  for (const s of sections) {
    const el = document.getElementById(s)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        highlightedTab.value = s
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.artist-detail-page {
  padding-top: 72px;
  background: #ffffff;
  color: #171717;
  min-height: 100vh;
}

/* Header Banner / Hero Section (Space below artist banner image) */
.artist-hero {
  position: relative;
  width: 100%;
  background: #0d0d0d;
  padding: 24px 0 24px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(25px) brightness(0.35);
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  top: -30px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(13, 13, 13, 0.45));
}

.hero-container {
  position: relative;
  z-index: 2;
}

/* Top Title Row (Centered) */
.hero-top-row {
  margin-bottom: 12px;
  text-align: center;
}

.artist-main-title {
  font-family: var(--font-heading, sans-serif);
  font-size: clamp(1.75rem, 3.8vw, 2.6rem);
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
  letter-spacing: 0.5px;
  text-align: center;
}

/* Centered Banner Image */
.banner-wrapper {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  aspect-ratio: 21 / 9;
  max-height: 400px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  background: #1a1a1a;
}

.artist-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  display: block;
}

/* STICKY Navigation Tab Bar */
.sticky-tabs-container {
  position: sticky;
  top: 60px;
  z-index: 100;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.content-navigation-tabs {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-left: 0;
}

.content-navigation-tabs::-webkit-scrollbar {
  display: none;
}

.nav-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border: none;
  background: transparent;
  font-family: var(--font-heading, sans-serif);
  font-size: 0.9375rem;
  font-weight: 700;
  color: #666666;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  transition: color 0.25s ease;
}

.nav-tab-btn:first-child {
  padding-left: 0;
}

.nav-tab-btn:hover {
  color: #171717;
}

.nav-tab-btn.active {
  color: #171717;
}

.nav-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #171717;
  border-radius: 3px 3px 0 0;
}

/* Main Content Area */
.details-content-section {
  padding: 28px 0;
  background: #ffffff;
}

.content-sections-wrapper {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 100%;
  margin: 0;
}

.section-block {
  background: transparent;
  padding: 0;
  border: none;
  box-shadow: none;
  width: 100%;
}

.section-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.section-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f0f0f0;
  color: #171717;
  flex-shrink: 0;
}

.section-block-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.35rem;
  font-weight: 800;
  color: #171717;
  margin: 0;
}

/* Bio Text & Expandable Read More */
.artist-bio-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333333;
  text-align: left;
}

.bio-paragraphs.collapsed .bio-text:nth-child(n+2) {
  display: none;
}

.bio-text {
  margin-bottom: 16px;
  text-align: left;
}

.read-more-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #171717;
  font-family: var(--font-heading, sans-serif);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  padding: 6px 0;
  margin-top: 4px;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.read-more-toggle-btn:hover {
  color: #000000;
  opacity: 0.75;
  text-decoration: underline;
}

.read-more-toggle-btn svg {
  transition: transform 0.3s ease;
}

.read-more-toggle-btn svg.rotate-180 {
  transform: rotate(180deg);
}

.stats-row-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.stat-card {
  background: #f8f8f8;
  border-radius: 10px;
  padding: 20px;
  text-align: left;
}

.stat-num {
  display: block;
  font-family: var(--font-heading, sans-serif);
  font-size: 1.25rem;
  font-weight: 800;
  color: #171717;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.8125rem;
  color: #777777;
  font-weight: 600;
}

/* Vinyl Releases Grid (Default 4 cards per row) */
.vinyl-releases-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.contact-card-box {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 24px;
}

.contact-row {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.contact-icon-bubble {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #171717;
  color: #ffffff;
  flex-shrink: 0;
}

.contact-info h4 {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 6px;
}

.contact-info p {
  font-size: 0.9375rem;
  color: #555555;
  margin-bottom: 12px;
}

@media (max-width: 1024px) {
  .vinyl-releases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .artist-hero {
    padding: 16px 0 12px;
  }

  .artist-main-title {
    font-size: 1.8rem;
  }

  .banner-wrapper {
    border-radius: 6px !important;
  }

  .artist-banner-img {
    border-radius: 6px !important;
  }

  .sticky-tabs-container {
    top: 56px;
    border-top: none !important;
  }

  .nav-tab-btn {
    padding: 10px 14px;
    font-size: 0.78rem;
  }

  .stats-row-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .artist-bio-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 640px) {
  .artist-main-title {
    font-size: 1.4rem;
  }

  .banner-wrapper {
    border-radius: 6px !important;
    aspect-ratio: 16 / 9;
  }

  .artist-banner-img {
    border-radius: 6px !important;
  }

  .nav-tab-btn {
    padding: 8px 10px;
    font-size: 0.72rem;
    gap: 4px;
  }

  .nav-tab-btn svg {
    width: 13px !important;
    height: 13px !important;
  }

  .section-block-title {
    font-size: 1.05rem !important;
  }

  .section-icon-box {
    width: 32px !important;
    height: 32px !important;
    border-radius: 6px !important;
  }

  .section-icon-box svg {
    width: 16px !important;
    height: 16px !important;
  }

  .artist-bio-text {
    font-size: 0.85rem !important;
    line-height: 1.6 !important;
  }

  .read-more-toggle-btn {
    font-size: 0.78rem !important;
  }

  .read-more-toggle-btn svg {
    width: 14px !important;
    height: 14px !important;
  }

  .stat-card {
    padding: 12px 14px;
    border-radius: 6px !important;
  }

  .stat-num {
    font-size: 1.05rem !important;
  }

  .stat-label {
    font-size: 0.72rem !important;
  }

  .contact-card-box {
    padding: 16px;
    border-radius: 6px !important;
  }

  .contact-icon-bubble {
    width: 36px !important;
    height: 36px !important;
  }

  .contact-icon-bubble svg {
    width: 16px !important;
    height: 16px !important;
  }

  .contact-info h4 {
    font-size: 0.925rem !important;
  }

  .contact-info p {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 480px) {
  .vinyl-releases-grid {
    grid-template-columns: 1fr;
  }

  .contact-row {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
