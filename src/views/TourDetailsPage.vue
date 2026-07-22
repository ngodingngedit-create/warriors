<template>
  <div v-if="tour" class="tour-details-page">
    <!-- Header Banner / Hero Section -->
    <div class="details-hero">
      <div class="hero-bg" :style="{ backgroundImage: `url(${tour.image})` }"></div>
      <div class="hero-overlay"></div>
      <div class="container hero-container">

        <!-- Top Header Row (Title & Countdown) -->
        <div class="hero-top-row">
          <div class="hero-title-area">
            <h1 class="event-title" v-html="formattedTitle(tour.title)"></h1>
          </div>
          <div class="countdown-area">
            <span class="countdown-lbl">EVENT DIMULAI DALAM</span>
            <div class="countdown-timer">
              <div class="timer-box">
                <span class="num">{{ countdown.days }}</span>
                <span class="label">Hari</span>
              </div>
              <div class="timer-box">
                <span class="num">{{ countdown.hours }}</span>
                <span class="label">Jam</span>
              </div>
              <div class="timer-box">
                <span class="num">{{ countdown.minutes }}</span>
                <span class="label">Menit</span>
              </div>
              <div class="timer-box">
                <span class="num">{{ countdown.seconds }}</span>
                <span class="label">Detik</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Banner & Info Sidebar Grid -->
        <div class="hero-main-grid">
          <!-- Tour Banner Image -->
          <div class="banner-wrapper">
            <img :src="tour.image" :alt="tour.title" class="tour-banner-img" />
          </div>

          <!-- Right Info Sidebar Card -->
          <div class="info-sidebar">
            <div class="info-bar-card">
              <div class="info-card-top">
                <div class="info-row">
                  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span class="val">{{ tour.date }}</span>
                </div>
                <div class="info-row">
                  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span class="val">{{ tour.start_time }} - {{ tour.end_time }} WIB</span>
                </div>
                <div class="info-row">
                  <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div class="val-group">
                    <span class="val">{{ tour.venue_name }}, {{ tour.location_city }}</span>
                  </div>
                </div>
              </div>

              <div class="divider"></div>

              <!-- Simple Organizer Row & Share Button matching user reference image -->
              <div class="simple-organizer-row">
                <div class="org-avatar-box">
                  <img v-if="tour.creatorImage" :src="tour.creatorImage" :alt="tour.creator" class="org-avatar-img" />
                  <div v-else class="org-avatar-fallback">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="12 8 15 15 9 15"/>
                    </svg>
                  </div>
                </div>
                <div class="org-text-meta">
                  <span class="org-lbl">Diselenggarakan oleh</span>
                  <span class="org-name-val">{{ tour.creator || 'WARRIORS' }}</span>
                </div>
                <button class="simple-share-btn" @click="handleShare" title="Bagikan Event">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Bottom Action Cards matching reference image -->
            <div class="info-action-bar-card">
              <button class="action-card-btn" @click="handleShare" title="Bagikan Event">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
              <button class="action-card-btn" @click="handleChat" title="Hubungi Organizer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <line x1="8" y1="9" x2="16" y2="9"/>
                  <line x1="8" y1="13" x2="14" y2="13"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="details-content-section">
      <div class="container">
        <!-- Tab Navigation -->
        <div class="content-navigation-tabs" ref="tabsContainerRef">
          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'deskripsi' }"
            :ref="(el) => setTabRef(el, 'deskripsi')"
            @click="scrollToSection('deskripsi')"
          >
            Deskripsi
          </button>
          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'tiket' }"
            :ref="(el) => setTabRef(el, 'tiket')"
            @click="scrollToSection('tiket')"
          >
            Tanggal
          </button>
          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'lokasi' }"
            :ref="(el) => setTabRef(el, 'lokasi')"
            @click="scrollToSection('lokasi')"
          >
            Lokasi
          </button>
          <button 
            class="nav-tab-btn" 
            :class="{ active: highlightedTab === 'ketentuan' }"
            :ref="(el) => setTabRef(el, 'ketentuan')"
            @click="scrollToSection('ketentuan')"
          >
            Syarat &amp; Ketentuan
          </button>
          <div class="tab-indicator" :style="indicatorStyle"></div>
        </div>

        <div class="tab-content-wrapper">

          <!-- Deskripsi -->
          <div class="info-section" v-show="activeContentTab !== 'tiket'" id="sec-deskripsi">
            <h2>
              <svg class="title-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Deskripsi
            </h2>
            <div class="section-content html-content" :class="{ 'desc-collapsed': !descExpanded }" v-html="tour.description"></div>
            <button class="read-more-btn" @click="toggleDesc">
              {{ descExpanded ? 'Tutup' : 'Baca Selengkapnya' }}
              <svg :class="{ rotated: descExpanded }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"/>
              </svg>
            </button>
          </div>

          <!-- Tanggal / Tiket -->
          <div class="info-section" v-show="activeContentTab === 'tiket'" id="sec-tiket">
            <h2>
              <svg class="title-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/>
                <path d="M12 3v9"/>
                <path d="m9 6 3-3 3 3"/>
                <rect x="3" y="6" width="18" height="6" rx="1"/>
              </svg>
              Pilih Tanggal
            </h2>
            <div class="section-content">
              <div class="dates-table-wrapper">
                <table class="dates-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>City</th>
                      <th>Venue</th>
                      <th>Country</th>
                      <th>Tiket</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="session in tour.sessions" :key="session.id" class="date-row">
                      <td class="date-cell">{{ getFormattedDate(session.session_date) }}</td>
                      <td class="city-cell">{{ tour.location_city }}</td>
                      <td class="venue-cell">{{ tour.venue_name }}</td>
                      <td class="country-cell">{{ tour.location_country }}</td>
                      <td class="ticket-cell">
                        <button class="btn btn-gold btn-sm" @click="handleCheckout">Beli Tiket</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Lokasi -->
          <div class="info-section" v-show="activeContentTab !== 'tiket'" id="sec-lokasi">
            <h2>
              <svg class="title-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Lokasi
            </h2>
            <div class="section-content">
              <div class="lokasi-detail">
                <div class="lokasi-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <div>
                    <div class="lokasi-venue">{{ tour.venue_name }}</div>
                    <div class="lokasi-city">{{ tour.location_city }}</div>
                  </div>
                </div>
                <a :href="tour.map_link" target="_blank" class="maps-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Lihat di Google Maps
                </a>
              </div>
            </div>
          </div>

          <!-- Syarat & Ketentuan -->
          <div class="info-section" v-show="activeContentTab !== 'tiket'" id="sec-ketentuan">
            <h2>
              <svg class="title-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Syarat &amp; Ketentuan
            </h2>
            <div class="section-content">
              <div class="html-content" v-html="tour.term_condition"></div>
              <div class="terms-sections">
                <div v-for="(sec, si) in dummyTermsSections" :key="si" class="terms-group">
                  <h3 class="terms-group-title">{{ sec.title }}</h3>
                  <ul class="terms-list">
                    <li v-for="(item, ii) in sec.items" :key="ii">
                      <span class="terms-bullet"></span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="mobile-sticky-bottom">
      <div class="bottom-container">
        <div class="bottom-price-info">
          <span class="lbl">Total Harga</span>
          <span class="price">{{ formatPrice(totalSubtotal) }}</span>
        </div>
        <div class="bottom-action-buttons">
          <button 
            class="checkout-btn-mobile"
            :disabled="!totalCount"
            @click="handleCheckout"
          >
            Beli Tiket
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer for Ticket Selection -->
    <div class="mobile-drawer-overlay" v-if="isDrawerOpen" @click.self="isDrawerOpen = false">
      <div class="mobile-drawer">
        <div class="drawer-header">
          <div class="drawer-handle"></div>
          <div class="drawer-title-row">
            <h3>Pilih Tanggal</h3>
            <button class="close-drawer-btn" @click="isDrawerOpen = false">Selesai</button>
          </div>
        </div>

        <div class="drawer-body">
          <div class="session-tabs">
            <button 
              v-for="(session, idx) in tour.sessions" 
              :key="session.id" 
              class="session-tab-btn"
              :class="{ active: activeSessionIdx === idx }"
              @click="activeSessionIdx = idx"
            >
              <span class="day">{{ getDayName(session.session_date) }}</span>
              <span class="date">{{ getFormattedDate(session.session_date) }}</span>
            </button>
          </div>

          <div class="tickets-container">
            <div 
              v-for="tkt in activeSession.tickets" 
              :key="tkt.id" 
              class="ticket-item-row"
              :class="{ disabled: tkt.is_soldout || tkt.is_finish }"
            >
              <div class="ticket-header" @click="toggleTicketExpand(tkt.id)">
                <div class="ticket-title-area">
                  <h4>{{ tkt.name }}</h4>
                  <div class="ticket-status-tag" :class="getStatusClass(tkt)">
                    {{ getStatusLabel(tkt) }}
                  </div>
                </div>
                <div class="ticket-price-icon">
                  <span class="price-val">{{ formatPrice(tkt.price) }}</span>
                  <svg class="chevron" :class="{ rotated: expandedTicketId === tkt.id }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              <div class="ticket-expand-body" v-if="expandedTicketId === tkt.id">
                <div class="ticket-meta-info">
                  <div class="meta-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>Masa berlaku: <strong>{{ getFormattedDate(tkt.ticket_end) }}</strong></span>
                  </div>
                  <div class="meta-row">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span>Tidak Bisa Refund &amp; Reschedule</span>
                  </div>
                </div>

                <div v-if="tkt.is_bundling_merch" class="bundling-section">
                  <div class="bundling-title">Pilih Merchandise</div>
                  <div class="merch-grid">
                    <div 
                      v-for="merch in mockMerchandise" 
                      :key="merch.id" 
                      class="merch-card"
                      :class="{ active: selectedMerchId === merch.id }"
                      @click="selectMerch(merch.id)"
                    >
                      <div class="merch-img">
                        <img :src="merch.image" :alt="merch.name" />
                      </div>
                      <span>{{ merch.name }}</span>
                    </div>
                  </div>

                  <div v-if="selectedMerchId" class="size-section">
                    <div class="bundling-title">Pilih Ukuran</div>
                    <div class="size-options">
                      <button 
                        v-for="sz in ['S', 'M', 'L', 'XL', 'XXL']" 
                        :key="sz"
                        :class="{ active: selectedSize === sz }"
                        @click="selectedSize = sz"
                      >
                        {{ sz }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="ticket-action-bar">
                <button 
                  v-if="!getTicketCount(tkt.id)" 
                  class="tambah-btn"
                  :disabled="tkt.is_soldout || tkt.is_finish"
                  @click="updateTicketQty(tkt.id, 1)"
                >
                  Tambah
                </button>
                <div v-else class="qty-selector">
                  <button class="qty-btn" @click="updateTicketQty(tkt.id, -1)">-</button>
                  <span class="qty-val">{{ getTicketCount(tkt.id) }}</span>
                  <button class="qty-btn" @click="updateTicketQty(tkt.id, 1)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tour = ref(null)
const activeSessionIdx = ref(0)
const expandedTicketId = ref(null)
const selectedMerchId = ref(null)
const selectedSize = ref(null)
const ticketCounts = ref({})
const isDrawerOpen = ref(false)
const descExpanded = ref(false)

const toggleDesc = () => {
  descExpanded.value = !descExpanded.value
}

const countdown = ref({ days: '00', hours: '00', minutes: '00', seconds: '00' })
let intervalId = null

const activeContentTab = ref('deskripsi')
const highlightedTab = ref('deskripsi')

// Tab refs for sliding indicator
const tabsContainerRef = ref(null)
const tabElements = ref({})
const setTabRef = (el, key) => {
  if (el) tabElements.value[key] = el
}

const indicatorStyle = computed(() => {
  const btn = tabElements.value[highlightedTab.value]
  const parent = tabsContainerRef.value
  if (!btn || !parent) {
    return { opacity: 0 }
  }
  const parentRect = parent.getBoundingClientRect()
  const btnRect = btn.getBoundingClientRect()
  return {
    transform: `translateX(${btnRect.left - parentRect.left}px)`,
    width: btnRect.width + 'px',
    opacity: 1,
    transition: 'transform 0.3s ease, width 0.3s ease'
  }
})

// Scroll to section — switches tab for tiket, scroll+highlight for others
const scrollToSection = (section) => {
  if (section === 'tiket') {
    activeContentTab.value = 'tiket'
    highlightedTab.value = 'tiket'
    nextTick(() => {
      const el = document.getElementById('sec-tiket')
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    })
    return
  }
  // Other tabs: show main panel and scroll to section
  activeContentTab.value = 'deskripsi'
  highlightedTab.value = section
  nextTick(() => {
    const el = document.getElementById('sec-' + section)
    if (el) {
      const offset = 90
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  })
}

// Track scroll position to highlight active tab (only main panel sections)
let scrollObserver = null
const sectionIds = ['deskripsi', 'lokasi', 'ketentuan']

const initScrollObserver = () => {
  if (scrollObserver) scrollObserver.disconnect()
  scrollObserver = new IntersectionObserver((entries) => {
    let maxBottom = 0
    let bottommostId = 'deskripsi'
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const bottom = entry.boundingClientRect.bottom
        if (bottom > maxBottom) {
          maxBottom = bottom
          bottommostId = entry.target.id.replace('sec-', '')
        }
      }
    }
    highlightedTab.value = bottommostId
  }, {
    rootMargin: '-80px 0px -40% 0px',
    threshold: 0
  })

  nextTick(() => {
    for (const id of sectionIds) {
      const el = document.getElementById('sec-' + id)
      if (el) scrollObserver.observe(el)
    }
  })
}

onMounted(() => {
  initScrollObserver()
})

onUnmounted(() => {
  if (scrollObserver) scrollObserver.disconnect()
})

// Mock Merchandise
const mockMerchandise = [
  { id: 'm1', name: 'Official T-Shirt Black', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&h=150&auto=format&fit=crop' },
  { id: 'm2', name: 'Official T-Shirt White', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=150&h=150&auto=format&fit=crop' },
  { id: 'm3', name: 'Exclusive Tote Bag', image: 'https://images.unsplash.com/photo-1544816153-39ad0350b51c?q=80&w=150&h=150&auto=format&fit=crop' }
]

const dummyTermsSections = [
  {
    title: 'Aturan Umum',
    items: [
      'Pembelian seluruh tiket dan layanan di Warriors bersifat final. Seluruh transaksi yang telah berhasil tidak dapat dikembalikan (refund) maupun ditukar dalam bentuk apapun.',
      'Dengan melakukan pembelian tiket melalui platform Warriors, Pengunjung menyatakan telah membaca, memahami, dan menyetujui Syarat & Ketentuan Penggunaan Layanan Warriors.',
      'Dengan menghadiri event yang terdaftar di Warriors, Pengunjung dianggap menyetujui bahwa dokumentasi kegiatan yang melibatkan Pengunjung dapat digunakan dan dipublikasikan oleh penyelenggara ke media sosial untuk keperluan dokumentasi dan/atau promosi.',
      'Apabila Pengunjung mengalami kendala terkait pemesanan, silakan menghubungi Customer Service Warriors via WhatsApp.'
    ]
  },
  {
    title: 'Aturan & Tata Cara Menghadiri Event',
    items: [
      'Setelah berhasil mendaftar, Pengunjung akan mendapat e-tiket resmi melalui email.',
      'Konfirmasi Tiket berisikan rincian pembayaran dan e-tiket dari Warriors, akan langsung dikirimkan ke email terdaftar setelah pembayaran berhasil.',
      'Informasi Tambahan berisikan jadwal event, tautan panduan akses, serta link grup komunikasi (jika ada). Email akan dikirim paling lambat 2x24 jam sejak pembayaran berhasil.',
      'Link Akses Masuk berisikan barcode scan fisik atau tautan online untuk bergabung ke event. Harap simpan barcode Anda dengan baik untuk proses check-in di lokasi.',
      'Periksa inbox/spam/junk email Anda secara berkala! Segera hubungi Customer Service Warriors apabila belum menerima email konfirmasi tiket.'
    ]
  },
  {
    title: 'Persiapan Sebelum Event',
    items: [
      'Event dapat diselenggarakan offline atau online. Pengunjung wajib menginstal aplikasi pendukung (jika online) atau membawa e-ticket resmi (jika offline) sebelum acara dimulai.',
      'Pengunjung wajib melakukan verifikasi masuk menggunakan alamat email yang terdaftar saat pembelian tiket.',
      'Satu e-ticket hanya berlaku untuk satu orang pengunjung.',
      'Satu tautan streaming online hanya dapat digunakan pada satu perangkat secara bersamaan.',
      'Pengunjung dilarang keras menyebarluaskan barcode e-ticket, link streaming, atau materi eksklusif event kepada pihak manapun. Segala kerugian akibat kelalaian Pengunjung bukan merupakan tanggung jawab Warriors.'
    ]
  }
]

const getDayName = (dateStr) => {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const d = new Date(dateStr)
  return days[d.getDay()]
}

const getFormattedDate = (dateStr) => {
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

const formatPrice = (price) => {
  if (price === 0) return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const formattedTitle = (title) => {
  if (!title) return ''
  return title.replace(/<br\s*\/?>/gi, ' ')
}

const getStatusClass = (tkt) => {
  if (tkt.is_soldout || tkt.is_finish) return 'status-soldout'
  return 'status-ongoing'
}

const getStatusLabel = (tkt) => {
  if (tkt.is_soldout) return 'SOLD OUT'
  if (tkt.is_finish) return 'Penjualan Berakhir'
  return 'PENJUALAN BERLANGSUNG'
}

const toggleTicketExpand = (tktId) => {
  expandedTicketId.value = expandedTicketId.value === tktId ? null : tktId
}

const selectMerch = (merchId) => {
  selectedMerchId.value = selectedMerchId.value === merchId ? null : merchId
  selectedSize.value = null
}

const getTicketCount = (tktId) => {
  return ticketCounts.value[tktId] || 0
}

const updateTicketQty = (tktId, change) => {
  const current = getTicketCount(tktId)
  const nextVal = Math.max(0, current + change)
  if (nextVal === 0) {
    delete ticketCounts.value[tktId]
  } else {
    ticketCounts.value[tktId] = nextVal
  }
}

const activeSession = computed(() => {
  if (!tour.value || !tour.value.sessions) return null
  return tour.value.sessions[activeSessionIdx.value]
})

const totalCount = computed(() => {
  return Object.values(ticketCounts.value).reduce((sum, qty) => sum + qty, 0)
})

const totalSubtotal = computed(() => {
  if (!tour.value) return 0
  let total = 0
  tour.value.sessions.forEach(session => {
    session.tickets.forEach(tkt => {
      const qty = getTicketCount(tkt.id)
      if (qty > 0) {
        total += tkt.price * qty
      }
    })
  })
  return total
})

const handleCheckout = () => {
  alert(`Checkout Berhasil! Melakukan pemesanan untuk ${totalCount.value} tiket dengan total pembayaran ${formatPrice(totalSubtotal.value)}.`)
}

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: tour.value.title,
      text: `Mari saksikan ${formattedTitle(tour.value.title)} bersama Kolektix!`,
      url: window.location.href
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Tautan halaman ini telah disalin ke papan klip!')
  }
}

const handleChat = () => {
  alert(`Menghubungi organizer ${tour.value.creator} via Kolektix Chat...`)
}

const updateCountdown = () => {
  if (!tour.value) return
  
  let targetStr = tour.value.date
  const monthsMap = {
    'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr', 'Mei': 'May', 'Jun': 'Jun',
    'Jul': 'Jul', 'Agu': 'Aug', 'Sep': 'Sep', 'Okt': 'Oct', 'Nov': 'Nov', 'Des': 'Dec'
  }
  
  let cleanDateStr = targetStr
  Object.keys(monthsMap).forEach(key => {
    cleanDateStr = cleanDateStr.replace(key, monthsMap[key])
  })
  
  const targetDate = new Date(`${cleanDateStr} ${tour.value.start_time || '19:00'}:00`)
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  
  if (diff <= 0) {
    countdown.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }
  
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((diff % (1000 * 60)) / 1000)
  
  countdown.value = {
    days: d.toString().padStart(2, '0'),
    hours: h.toString().padStart(2, '0'),
    minutes: m.toString().padStart(2, '0'),
    seconds: s.toString().padStart(2, '0')
  }
}

const allToursDetails = [
  {
    id: 1,
    creator: 'M.A.D. Tourbooking',
    title: 'IGNITE<br>CANCER BATS',
    image: 'https://mad-tourbooking.de/media/Post-W-Dates-720x900.jpg',
    date: '12 Sep 2026',
    start_time: '19:00',
    end_time: '23:00',
    venue_name: 'SO36',
    location_city: 'Berlin',
    location_country: 'Germany',
    map_link: 'https://maps.google.com/?q=SO36+Berlin',
    description: `<p>Hardcore legends <strong>IGNITE</strong> and Canadian punk-metal powerhouses <strong>CANCER BATS</strong> team up for a massive co-headlining tour in Europe. Expect high-energy riffs, circle pits, and anthems that defined a generation.</p><p>After a long hiatus, IGNITE returns to the European stage with their signature blend of melodic hardcore and punk energy. Joined by CANCER BATS, who have been tearing up stages worldwide with their ferocious live performances, this is a show no fan of heavy music should miss. The tour will feature songs from both bands&#39; extensive catalogs, including fan favorites and deep cuts that have rarely been performed live.</p><p>Special guests will be announced in the coming weeks. This promises to be one of the most intense live music experiences of the year, with both bands known for their electrifying stage presence and ability to ignite any crowd. Doors open at 18:00, with the first support act taking the stage at 19:00 sharp. Limited VIP packages are available that include early entry, exclusive merch, and a meet-and-greet opportunity with the bands.</p><p>Don&#39;t miss your chance to witness these two powerhouse acts share the same stage for what promises to be an unforgettable night of pure, unadulterated heavy music. Get your tickets now before they sell out!</p>`,
    sessions: [
      { id: 101, session_date: '2026-09-12', tickets: [{ id: 1001, name: 'General Admission', price: 120000, ticket_end: '2026-09-11', is_soldout: 0, is_finish: 0 }, { id: 1002, name: 'VIP Pass (Incl. Merch)', price: 300000, ticket_end: '2026-09-11', is_soldout: 0, is_finish: 0, is_bundling_merch: true }] },
      { id: 102, session_date: '2026-09-13', tickets: [{ id: 1003, name: 'General Admission', price: 120000, ticket_end: '2026-09-12', is_soldout: 0, is_finish: 0 }, { id: 1004, name: 'VIP Pass', price: 300000, ticket_end: '2026-09-12', is_soldout: 0, is_finish: 0, is_bundling_merch: true }] },
      { id: 103, session_date: '2026-09-15', tickets: [{ id: 1005, name: 'Regular Ticket', price: 130000, ticket_end: '2026-09-14', is_soldout: 0, is_finish: 0 }] },
      { id: 104, session_date: '2026-09-18', tickets: [{ id: 1006, name: 'Regular Ticket', price: 130000, ticket_end: '2026-09-17', is_soldout: 0, is_finish: 0 }] },
      { id: 105, session_date: '2026-09-20', tickets: [{ id: 1007, name: 'Early Bird', price: 90000, ticket_end: '2026-09-15', is_soldout: 1, is_finish: 0 }] },
    ]
  },
  {
    id: 2,
    creator: 'M.A.D. Tourbooking',
    title: 'Carcass<br>Summer Tour 2026',
    image: 'https://mad-tourbooking.de/media/Carcsss-june-2026-720x900.jpg',
    date: '5 Jun 2026',
    start_time: '19:30',
    end_time: '23:30',
    venue_name: 'Mammothfest',
    location_city: 'Thessaloniki',
    location_country: 'Greece',
    map_link: 'https://maps.google.com/?q=Thessaloniki+Greece',
    description: `<p>UK Extreme metal pioneers <strong>CARCASS</strong> are hitting Europe for a series of skull-crushing summer shows. Prepare for an evening of grinding riffs and melodic death metal masterclass.</p><p>As one of the most influential bands in extreme metal history, CARCASS brings their legendary sound to Thessaloniki for what promises to be a devastating night of pure metal mayhem. The band will be performing tracks from their entire discography, spanning from their early grindcore classics like \"Reek of Putrefaction\" to the melodic death metal mastery of \"Heartwork\" and beyond.</p><p>This summer tour marks the band&#39;s return to Greece after several years, and they&#39;ve promised to bring a setlist that will satisfy both old-school fans and newer converts. Joining them on this date will be a selection of local support acts handpicked by the band themselves, showcasing the best of the Greek underground metal scene.</p><p>Expect a production that matches the magnitude of the music, with state-of-the-art lighting and sound systems ensuring that every crushing riff and blistering solo is heard in crystal clarity. Limited VIP experience packages are available, including exclusive merchandise and meet-and-greet passes. Early arrival is recommended to secure the best viewing positions for this sold-out-in-anticipation event.</p>`,
    
    sessions: [
      { id: 201, session_date: '2026-06-05', tickets: [{ id: 2001, name: 'Presale 1 - Standing', price: 100000, ticket_end: '2026-05-30', is_soldout: 0, is_finish: 0 }, { id: 2002, name: 'Regular - Standing Pit', price: 150000, ticket_end: '2026-06-04', is_soldout: 0, is_finish: 0 }, { id: 2003, name: 'Tribune Seated', price: 200000, ticket_end: '2026-06-04', is_soldout: 0, is_finish: 0 }, { id: 2004, name: 'Carcass VIP Bundling (T-Shirt)', price: 350000, ticket_end: '2026-05-25', is_soldout: 0, is_finish: 0, is_bundling_merch: true }] },
      { id: 202, session_date: '2026-06-06', tickets: [{ id: 2005, name: 'General Admission', price: 120000, ticket_end: '2026-06-05', is_soldout: 0, is_finish: 0 }] },
      { id: 203, session_date: '2026-06-08', tickets: [{ id: 2006, name: 'Regular Ticket', price: 140000, ticket_end: '2026-06-07', is_soldout: 1, is_finish: 0 }] },
      { id: 204, session_date: '2026-06-10', tickets: [{ id: 2007, name: 'Standing Ticket', price: 110000, ticket_end: '2026-06-09', is_soldout: 0, is_finish: 0 }] },
    ]
  },
  {
    id: 3,
    creator: 'M.A.D. Tourbooking',
    title: 'BAD BOYS FOR LIFE<br>Tour 2026',
    image: 'https://mad-tourbooking.de/media/BadBoysForLive-2026_Instagram_Square-900x900.jpg',
    date: '10 Okt 2026',
    start_time: '18:00',
    end_time: '22:30',
    venue_name: 'Huxleys Neue Welt',
    location_city: 'Berlin',
    location_country: 'Germany',
    map_link: 'https://maps.google.com/?q=Huxleys+Berlin',
    description: `<p>The legendary <strong>BAD BOYS FOR LIFE</strong> package is back! Featuring <strong>THE BONES</strong> and a stellar lineup of special guests to deliver old-school rock and roll combined with hard-hitting street punk.</p><p>This year&#39;s BAD BOYS FOR LIFE tour promises to be the biggest yet, with an expanded lineup and a production that pushes the boundaries of what a punk and rock tour can deliver. THE BONES headline this massive package, bringing their trademark blend of street punk, hard rock, and rebellious anthems that have earned them a devoted following across Europe and beyond.</p><p>Joining them on stage will be a rotating cast of special guests, including members of some of the most respected bands in the punk and hardcore scene. Each night promises a unique experience with surprise collaborations and rare performances of classic songs that have shaped the genre over the past two decades.</p><p>The tour will also feature an expansive merch area with exclusive tour-only items, limited edition vinyl pressings, and collaborative apparel designs. Early entry ticket holders will have access to an exclusive pre-show party with acoustic performances and Q&A sessions with the artists. This is more than just a concert - it&#39;s a celebration of the punk and rock lifestyle that has united fans across generations.</p>`,
    sessions: [
      { id: 301, session_date: '2026-10-10', tickets: [{ id: 3001, name: 'Regular Ticket', price: 180000, ticket_end: '2026-10-09', is_soldout: 0, is_finish: 0 }, { id: 3002, name: 'Exclusive Bundling Pack', price: 320000, ticket_end: '2026-10-01', is_soldout: 0, is_finish: 0, is_bundling_merch: true }] },
      { id: 302, session_date: '2026-10-11', tickets: [{ id: 3003, name: 'Regular Ticket', price: 180000, ticket_end: '2026-10-10', is_soldout: 0, is_finish: 0 }] },
      { id: 303, session_date: '2026-10-13', tickets: [{ id: 3004, name: 'VIP Package', price: 350000, ticket_end: '2026-10-12', is_soldout: 0, is_finish: 0, is_bundling_merch: true }] },
      { id: 304, session_date: '2026-10-15', tickets: [{ id: 3005, name: 'Early Bird', price: 130000, ticket_end: '2026-10-01', is_soldout: 1, is_finish: 0 }] },
      { id: 305, session_date: '2026-10-17', tickets: [{ id: 3006, name: 'Regular Ticket', price: 180000, ticket_end: '2026-10-16', is_soldout: 0, is_finish: 0 }] },
      { id: 306, session_date: '2026-10-18', tickets: [{ id: 3007, name: 'Regular Ticket', price: 180000, ticket_end: '2026-10-17', is_soldout: 0, is_finish: 0 }] },
    ]
  },
  {
    id: 4,
    creator: 'M.A.D. Tourbooking',
    title: 'D.R.I.<br>Summer Tour 2026',
    image: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg',
    date: '18 Jul 2026',
    start_time: '20:00',
    end_time: '23:00',
    venue_name: 'Backstage Halle',
    location_city: 'Munich',
    location_country: 'Germany',
    map_link: 'https://maps.google.com/?q=Backstage+Munich',
    description: `<p>The undisputed kings of Crossover thrash, <strong>D.R.I. (Dirty Rotten Imbeciles)</strong>, are celebrating their 43rd anniversary. A tour packed with speed, attitude, and classic thrash metal hymns.</p><p>Formed in 1982 in Houston, Texas, D.R.I. have been at the forefront of the crossover thrash movement for over four decades, blending the intensity of hardcore punk with the technical precision of thrash metal. This anniversary tour celebrates their incredible journey and features a career-spanning setlist that includes classics from definitive albums like \"Dealing With It\", \"Crossover\", and \"Thrash Zone\".</p><p>Fans can expect a high-energy performance that showcases the band&#39;s signature sound - lightning-fast riffs, pounding drums, and socially conscious lyrics that have never been more relevant than they are today. The band has stated that this may be one of their most extensive European tours in years, making it a must-see event for any fan of heavy music.</p><p>The Munich date will be held at the legendary Backstage Halle, a venue known for its incredible acoustics and intimate atmosphere that puts fans right in the middle of the action. Support will come from some of Europe&#39;s most promising crossover acts, handpicked by the band themselves. This is a celebration of 43 years of uncompromising music, and you won&#39;t want to miss it.</p>`,
    term_condition: '<p>- Tiket dapat ditransfer maksimal 1 hari sebelum acara.<br>- Penjualan tiket OTS dilayani jika slot masih tersedia.</p>',
    sessions: [
      { id: 401, session_date: '2026-07-18', tickets: [{ id: 4001, name: 'Presale Early Bird', price: 90000, ticket_end: '2026-06-30', is_soldout: 0, is_finish: 0 }, { id: 4002, name: 'Regular Ticket', price: 130000, ticket_end: '2026-07-17', is_soldout: 0, is_finish: 0 }] },
      { id: 402, session_date: '2026-07-19', tickets: [{ id: 4003, name: 'Regular Ticket', price: 130000, ticket_end: '2026-07-18', is_soldout: 0, is_finish: 0 }] },
      { id: 403, session_date: '2026-07-21', tickets: [{ id: 4004, name: 'VIP Experience', price: 280000, ticket_end: '2026-07-20', is_soldout: 0, is_finish: 0, is_bundling_merch: true }] },
      { id: 404, session_date: '2026-07-23', tickets: [{ id: 4005, name: 'General Admission', price: 110000, ticket_end: '2026-07-22', is_soldout: 0, is_finish: 0 }] },
      { id: 405, session_date: '2026-07-25', tickets: [{ id: 4006, name: 'Regular Ticket', price: 130000, ticket_end: '2026-07-24', is_soldout: 0, is_finish: 0 }] },
    ]
  }
]

const getTourDetails = (id) => {
  const numericId = parseInt(id)
  const existing = allToursDetails.find(t => t.id === numericId)
  if (existing) return existing

  return {
    id: numericId,
    creator: 'M.A.D. Tourbooking',
    title: 'M.A.D. AllTour',
    image: 'https://mad-tourbooking.de/media/Post-W-Dates-720x900.jpg',
    date: '31 Des 2026',
    start_time: '19:00',
    end_time: '23:00',
    venue_name: 'SO36 Berlin',
    location_city: 'Berlin',
    location_country: 'Germany',
    map_link: 'https://maps.google.com/?q=Berlin+SO36',
    description: '<p>M.A.D. Tourbooking presents an unforgettable night of music. Gather your friends and experience this performance live.</p><p>This All Tours show promises to deliver an incredible evening featuring some of the most exciting acts in the heavy music scene today. The lineup includes a carefully curated selection of both established headliners and emerging talent, ensuring a diverse and electrifying experience for all attendees.</p><p>The venue offers excellent sightlines from every angle, state-of-the-art sound systems, and a comfortable climate-controlled environment. A full bar will be available throughout the evening, serving a wide selection of beers, cocktails, and non-alcoholic beverages. Food vendors will also be on-site offering a variety of options to keep you fueled throughout the night.</p><p>Ticket holders are encouraged to arrive early to take advantage of the pre-show activities and to secure the best viewing positions. VIP ticket holders will enjoy exclusive access to a dedicated lounge area with private bar service and premium viewing areas. Stay tuned for additional lineup announcements and special surprises leading up to the event date.</p>',
    term_condition: '<p>- Tiket tidak dapat dibatalkan.<br>- Pajak 10% sudah termasuk.</p>',
    sessions: [
      {
        id: numericId * 100 + 1,
        session_date: '2026-12-31',
        tickets: [
          { id: numericId * 1000 + 1, name: 'Regular Ticket', price: 100000, ticket_end: '2026-12-30', is_soldout: 0, is_finish: 0 },
          { id: numericId * 1000 + 2, name: 'Bundling Ticket + Merchandise', price: 250000, ticket_end: '2026-12-30', is_soldout: 0, is_finish: 0, is_bundling_merch: true }
        ]
      }
    ]
  }
}

onMounted(() => {
  tour.value = getTourDetails(route.params.id)
  updateCountdown()
  intervalId = setInterval(updateCountdown, 1000)

  // Scroll listener removed - tab indicator stays fixed on active tab
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.tour-details-page {
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 80px;
  font-family: var(--font-body);
  color: #1f2937;
}

/* Hero Section */
/* Hero Section */
.details-hero {
  position: relative;
  min-height: 420px;
  padding: 100px 0 50px;
  display: flex;
  align-items: flex-end;
  color: #ffffff;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(15px);
  transform: scale(1.1);
  opacity: 0.35;
  z-index: 0;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 13, 13, 0.95) 0%, rgba(13, 13, 13, 0.6) 60%, rgba(13, 13, 13, 0.3) 100%);
  z-index: 1;
  overflow: hidden;
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
}

.hero-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  gap: 20px;
}

.hero-title-area {
  flex: 1;
}

.event-title {
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 3.2vw, 2rem);
  font-weight: 900;
  line-height: 1.1;
  color: #ffffff;
  margin: 0;
}

.countdown-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.countdown-lbl {
  font-size: 0.6875rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 1px;
}

.countdown-timer {
  display: flex;
  gap: 8px;
}

.timer-box {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  min-width: 48px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.timer-box .num {
  font-size: 1.125rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
}

.timer-box .label {
  font-size: 0.5625rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

/* Main Banner Grid */
.hero-main-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 24px;
  align-items: flex-start;
}

.banner-wrapper {
  background: #000;
  border-radius: 16px;
  overflow: hidden;
  height: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.tour-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 290px;
  justify-content: space-between;
}

.info-bar-card {
  background: #23201e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 14px 18px 12px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  flex: 1;
}

.info-card-top {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-card-bottom {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.info-row .icon {
  color: #ffffff;
  flex-shrink: 0;
  opacity: 0.95;
}

.info-row .val {
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3;
  color: #ffffff;
}

.info-row .val-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-row .map-link {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
  width: fit-content;
}

.info-row .map-link:hover {
  color: #ffffff;
}

.info-bar-card .divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 8px 0;
  border: none;
}

.simple-organizer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.simple-organizer-row .org-avatar-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #181818;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.simple-organizer-row .org-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.simple-organizer-row .org-avatar-fallback {
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.simple-organizer-row .org-text-meta {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.simple-organizer-row .org-lbl {
  font-size: 0.7rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.55);
  white-space: nowrap;
}

.simple-organizer-row .org-name-val {
  font-size: 0.875rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.simple-share-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 8px;
  transition: color 0.15s ease, transform 0.15s ease;
}

.simple-share-btn:hover {
  color: #ffffff;
  transform: scale(1.1);
}

/* Action buttons container matching reference image */
.info-action-bar-card {
  background: #23201e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 8px;
  display: flex;
  gap: 10px;
  height: 58px;
  box-sizing: border-box;
}

.info-action-bar-card .action-card-btn {
  flex: 1;
  height: 42px;
  background: #ffffff;
  border-radius: 12px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.info-action-bar-card .action-card-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

.info-action-bar-card .action-card-btn:active {
  transform: scale(0.98);
}

.info-action-bar-card .action-card-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

.info-action-bar-card .action-card-btn:active {
  transform: scale(0.98);
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.action-btn:active {
  transform: scale(0.97);
}

.details-content-section {
  padding: 12px 0 60px;
}

.tab-content-wrapper {
  padding-left: 0;
}

/* ===== SECTION CONTENT: geser ke kanan (title tetap di kiri) ===== */
.section-content {
  padding-left: 32px;
}

@media (max-width: 768px) {
  .section-content {
    padding-left: 16px;
  }
}

.lokasi-detail {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
}

@media (min-width: 768px) {
  .lokasi-detail {
    padding: 24px;
    flex-direction: row;
    align-items: center;
  }
}

.maps-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #171717;
  padding: 8px 16px;
  border: 1.5px solid #171717;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.maps-btn:hover {
  background: #171717;
  color: #ffffff;
}

.lokasi-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lokasi-row svg {
  flex-shrink: 0;
  color: #6b7280;
}

.lokasi-venue {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
}

.lokasi-city {
  font-size: 0.8125rem;
  color: #6b7280;
  margin-top: 2px;
}

/* Info Cards */
.info-section {
  background: transparent;
  padding: 24px 0;
  border-bottom: 1px solid #f3f4f6;
  box-shadow: none;
}

.info-section:last-child {
  border-bottom: none;
}

.info-section h2 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-section h2 .title-icon {
  color: #171717;
  flex-shrink: 0;
}

.html-content {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #4b5563;
}

.html-content :deep(p) {
  margin-bottom: 12px;
}

.html-content :deep(strong) {
  color: #111827;
}

/* Description collapse/expand */
.html-content.desc-collapsed {
  max-height: 100px;
  overflow: hidden;
  position: relative;
}

.html-content.desc-collapsed::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(to top, #ffffff, transparent);
  pointer-events: none;
}

.read-more-btn {
  background: none;
  border: none;
  color: #171717;
  font-weight: 700;
  font-size: 0.8125rem;
  cursor: pointer;
  padding: 6px 0 2px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: gap 0.2s;
  margin-left: 32px;
}

.read-more-btn:hover {
  gap: 8px;
}

.read-more-btn svg {
  transition: transform 0.2s;
}

.read-more-btn svg.rotated {
  transform: rotate(180deg);
}

/* Dummy list styling */
.dummy-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dummy-list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
}

.dummy-list li svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: #171717;
}

/* Seatmap layout style */
.seatmap-container {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  text-align: center;
}

.stage-bar {
  background: #d1d5db;
  color: #374151;
  font-weight: 700;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 24px;
  font-size: 0.875rem;
  text-transform: capitalize;
  letter-spacing: 1px;
}

.seatmap-layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.seatmap-zone {
  width: 100%;
  max-width: 320px;
  padding: 14px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.seatmap-zone .zone-text {
  font-weight: 800;
  color: #171717;
  font-size: 0.875rem;
}

.seatmap-zone .zone-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

/* Dates Table inside Tiket Tab (like DatesPage) */
.detail-dates-table-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
}

.detail-dates-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-size: 0.875rem;
}

.detail-dates-table thead {
  background: #171717;
  color: #ffffff;
}

.detail-dates-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.6875rem;
  text-transform: capitalize;
  letter-spacing: 0.8px;
  padding: 12px 16px;
  text-align: left;
  white-space: nowrap;
}

.detail-dates-table td {
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.detail-date-row {
  cursor: pointer;
  transition: background 0.15s;
}

.detail-date-row:hover {
  background: #f5f5f5;
}

.detail-date-row.active-row {
  background: #f0f0f0;
}

.detail-date-cell {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.8125rem;
  white-space: nowrap;
  color: #171717;
}

.detail-city-cell {
  font-weight: 600;
  color: #1f2937;
}

.dates-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.dates-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
  font-size: 0.9375rem;
}

.dates-table thead {
  background: var(--color-primary);
  color: var(--color-white);
}

.dates-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  padding: 16px 20px;
  text-align: left;
  white-space: nowrap;
}

.dates-table td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.date-row:hover {
  background: var(--color-bg-alt);
}

.date-cell {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  white-space: nowrap;
  color: var(--color-primary);
}

.city-cell {
  font-weight: 600;
}

.venue-cell {
  color: var(--color-text-light);
}

.ticket-cell {
  text-align: left;
}

.country-cell {
  color: var(--color-text-light);
  font-size: 0.875rem;
}

.btn-sm,
.btn-gold.btn-sm {
  padding: 4px 14px;
  font-size: 0.72rem;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .dates-table th,
  .dates-table td {
    padding: 12px 14px;
  }

  .dates-table {
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .dates-table-wrapper {
    margin: 0 -16px;
    border-radius: 0;
  }
}
.session-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.session-tab-btn {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  flex-shrink: 0;
  transition: all 0.2s;
}

.session-tab-btn:hover {
  background: #f9fafb;
}

.session-tab-btn.active {
  background: #171717;
  border-color: #171717;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(23, 23, 23, 0.3);
}

.session-tab-btn .day {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: capitalize;
}

.session-tab-btn.active .day {
  color: rgba(255, 255, 255, 0.8);
}

.session-tab-btn .date {
  font-size: 0.8125rem;
  font-weight: 800;
  margin-top: 2px;
}

/* Tickets container rows */
.tickets-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ticket-item-row {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s;
}

.ticket-item-row:hover {
  border-color: rgba(25, 78, 158, 0.3);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}

.ticket-title-area {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ticket-title-area h4 {
  font-size: 0.9375rem;
  font-weight: 800;
  color: #111827;
}

.ticket-status-tag {
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  padding: 2px 6px;
  border-radius: 3px;
  width: fit-content;
}

.status-ongoing {
  background: #e8f6ef;
  color: #27ae60;
}

.status-soldout {
  background: #fdedec;
  color: #ef4444;
}

.ticket-price-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ticket-price-icon .price-val {
  font-size: 0.9375rem;
  font-weight: 900;
  color: #111827;
}

.chevron {
  color: #9ca3af;
  transition: transform 0.2s;
}

.chevron.rotated {
  transform: rotate(180deg);
}

/* Ticket expansion details */
.ticket-expand-body {
  border-top: 1px dashed #e5e7eb;
  margin-top: 12px;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ticket-meta-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #6b7280;
}

.meta-row svg {
  color: #9ca3af;
  flex-shrink: 0;
}

/* Bundling details */
.bundling-section {
  border-top: 1px solid #e5e7eb;
  margin-top: 8px;
  padding-top: 12px;
}

.bundling-title {
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.merch-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.merch-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.merch-card.active {
  border-color: #171717;
  background: #f5f5f5;
}

.merch-img {
  width: 100%;
  aspect-ratio: 1;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.merch-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.merch-card span {
  font-size: 0.625rem;
  font-weight: 700;
  color: #374151;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.size-options {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.size-options button {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.6875rem;
  font-weight: 700;
  cursor: pointer;
  min-width: 32px;
  transition: all 0.2s;
}

.size-options button.active {
  background: #171717;
  border-color: #171717;
  color: #ffffff;
}

/* Quantity Actions */
.ticket-action-bar {
  border-top: 1px solid #e5e7eb;
  margin-top: 12px;
  padding-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.tambah-btn {
  background: #171717;
  color: #ffffff;
  border: none;
  font-weight: 700;
  font-size: 0.75rem;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tambah-btn:hover {
  background-color: #000000;
}

.tambah-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.qty-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #171717;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.qty-btn:hover {
  border-color: #171717;
  background: #f5f5f5;
}

.qty-val {
  font-size: 0.875rem;
  font-weight: 800;
  color: #1f2937;
  min-width: 14px;
  text-align: center;
}

/* Sidebar Footer & Totals */
.sidebar-footer {
  border-top: 1px solid #e5e7eb;
  margin-top: 20px;
  padding-top: 20px;
}

.sidebar-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.sidebar-total-row .total-label {
  display: flex;
  flex-direction: column;
}

.sidebar-total-row .total-label span {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #6b7280;
}

.sidebar-total-row .total-label small {
  font-size: 0.6875rem;
  color: #9ca3af;
  font-weight: 600;
}

.total-price-val {
  font-size: 1.25rem;
  font-weight: 900;
  color: #111827;
}

.checkout-btn {
  background: #171717;
  color: #ffffff;
  border: none;
  font-weight: 800;
  font-size: 0.875rem;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(25, 78, 158, 0.2);
  transition: all 0.2s;
}

.checkout-btn:hover:not(:disabled) {
  background: #000000;
  transform: translateY(-1px);
}

.checkout-btn:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}


/* Sticky Bottom Bar (Visible on Desktop & Mobile) */
.mobile-sticky-bottom {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #171717;
  border-top: 1px solid #2d2d2d;
  padding: 10px 0;
  z-index: 90;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.25);
}

.mobile-sticky-bottom.show-on-deskripsi {
  display: block;
  bottom: 0;
}

.bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .bottom-container {
    padding: 0 16px;
  }
}

.bottom-price-info {
  display: flex;
  flex-direction: column;
}

.bottom-price-info .lbl {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.bottom-price-info .price {
  font-size: 0.9375rem;
  font-weight: 800;
  color: #ffffff;
}

.bottom-action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-btn {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #171717;
  font-weight: 700;
  font-size: 0.7rem;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.checkout-btn-mobile {
  background: #ffffff;
  color: #171717;
  border: none;
  font-weight: 800;
  font-size: 0.72rem;
  padding: 7px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn-mobile:disabled {
  background: #d1d5db;
  color: #9ca3af;
  cursor: not-allowed;
}

/* Mobile Drawer Selection Styling */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}

.mobile-drawer {
  background: #ffffff;
  width: 100%;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  max-height: 75vh;
  overflow-y: auto;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.drawer-header {
  margin-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 12px;
}

.drawer-handle {
  width: 36px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  margin: 0 auto 12px;
}

.drawer-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title-row h3 {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
}

.close-drawer-btn {
  background: transparent;
  border: none;
  color: #171717;
  font-weight: 800;
  font-size: 0.875rem;
  cursor: pointer;
}

/* ===== SYARAT & KETENTUAN DESIGN RAPIH ===== */
.terms-list {
  list-style: none;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.terms-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
}

.terms-bullet {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #171717;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 8px;
}

/* Grouped sections in deskripsi tab */
.terms-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 16px;
}

.terms-group-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

/* Modern terms styling (tab Syarat & Ketentuan) */
.terms-modern {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.term-block {
  margin-bottom: 0;
}

.term-block .html-content :deep(p) {
  font-size: 0.875rem;
  margin-bottom: 6px;
  color: #374151;
}

.terms-sections-modern {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
}

.terms-group-title-modern {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #e5e7eb;
}

.terms-list-modern {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.terms-list-modern li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.term-num {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 800;
  color: #9ca3af;
  min-width: 32px;
  line-height: 1.6;
}

.term-text {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.6;
}

/* Media Queries */
@media (max-width: 1024px) {
  .hero-top-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .countdown-area {
    align-items: flex-start;
  }

  .hero-main-grid {
    grid-template-columns: 1fr;
  }

  .mobile-sticky-bottom {
    display: block;
  }

  .mobile-sticky-bottom.show-on-deskripsi {
    display: block;
  }

  .details-content-section {
    padding-bottom: 100px;
  }

  .event-title {
    font-size: 1.35rem;
  }
}

/* Content Tab Navigation */
.content-navigation-tabs {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 60px;
  z-index: 50;
  background: #fff;
  padding-top: 16px;
  margin-top: -10px;
}

/* Sliding indicator needs parent relative */

.nav-tab-btn {
  background: transparent;
  border: none;
  padding: 14px 16px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.nav-tab-btn:hover {
  color: #111827;
}

.nav-tab-btn.active {
  color: #171717;
}

/* Sliding indicator */
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: #171717;
  border-radius: 2px;
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), width 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

/* Mobile Responsiveness for Tour Details Page */
@media (max-width: 640px) {
  .details-hero {
    min-height: auto;
    padding: 72px 0 20px;
  }

  /* Un-nest container children for exact flex ordering on mobile */
  .hero-container {
    display: flex !important;
    flex-direction: column !important;
  }

  .hero-top-row,
  .hero-main-grid {
    display: contents !important;
  }

  /* 1st: Banner Image AT THE VERY TOP */
  .banner-wrapper {
    order: 1 !important;
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 16 / 9 !important;
    max-height: 180px !important;
    border-radius: 6px !important;
    margin-bottom: 14px !important;
  }

  .tour-banner-img {
    border-radius: 6px !important;
    object-fit: cover !important;
  }

  /* 2nd: Tour Title BELOW Banner Image */
  .hero-title-area {
    order: 2 !important;
    margin-bottom: 12px !important;
  }

  .event-title {
    font-size: 1.05rem !important;
    line-height: 1.25 !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    margin: 0 !important;
  }

  /* Countdown area completely hidden on mobile */
  .countdown-area {
    display: none !important;
  }

  /* 3rd: Info Sidebar BELOW Tour Title */
  .info-sidebar {
    order: 3 !important;
    height: auto !important;
    gap: 8px !important;
  }

  .info-bar-card {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    border-radius: 0 !important;
    gap: 10px !important;
  }

  .info-card-top {
    gap: 8px !important;
  }

  .info-bar-card .divider {
    display: none !important;
  }

  .info-row {
    gap: 8px !important;
    align-items: center !important;
  }

  .info-row .icon {
    width: 16px !important;
    height: 16px !important;
    opacity: 0.9 !important;
  }

  .info-row .val {
    font-size: 0.8125rem !important;
    font-weight: 500 !important;
    color: #ffffff !important;
  }

  .info-row .map-link {
    font-size: 0.7rem !important;
  }

  .organizer-section {
    margin-top: 4px;
  }

  .organizer-section .lbl {
    font-size: 0.65rem !important;
    color: rgba(255, 255, 255, 0.6) !important;
  }

  .org-name {
    font-size: 0.78rem !important;
  }

  /* Active & all tab buttons - smaller font size */
  .content-navigation-tabs {
    top: 56px !important;
    gap: 8px !important;
    padding-top: 10px !important;
  }

  .nav-tab-btn {
    padding: 8px 10px !important;
    font-size: 0.72rem !important;
  }

  /* Smaller section titles, text, tables & icons */
  .info-section h2 {
    font-size: 1.05rem !important;
    gap: 8px !important;
  }

  .title-icon {
    width: 16px !important;
    height: 16px !important;
  }

  .section-content,
  .html-content {
    font-size: 0.8125rem !important;
    line-height: 1.6 !important;
  }

  .read-more-btn {
    font-size: 0.75rem !important;
  }

  .btn-sm,
  .btn-gold.btn-sm {
    font-size: 0.6875rem !important;
    padding: 3px 10px !important;
  }

  /* Tables smaller text and compact padding */
  .dates-table,
  .detail-dates-table {
    font-size: 0.75rem !important;
  }

  .dates-table th,
  .detail-dates-table th {
    font-size: 0.65rem !important;
    padding: 8px 10px !important;
  }

  .dates-table td,
  .detail-dates-table td {
    font-size: 0.75rem !important;
    padding: 8px 10px !important;
  }

  .date-cell,
  .detail-date-cell {
    font-size: 0.75rem !important;
  }

  /* Terms styling */
  .terms-modern {
    padding: 14px !important;
    border-radius: 6px !important;
  }

  .term-num {
    font-size: 0.7rem !important;
    min-width: 24px !important;
  }

  .term-text {
    font-size: 0.78rem !important;
  }

  /* Simple Organizer Row & Share Button Mobile Styles */
  .simple-organizer-row {
    border-top: none !important;
    margin-top: 8px !important;
    padding-top: 0 !important;
  }

  .org-avatar-box {
    width: 34px !important;
    height: 34px !important;
  }

  .org-lbl {
    font-size: 0.72rem !important;
    color: rgba(255, 255, 255, 0.7) !important;
  }

  .org-name-val {
    font-size: 0.84rem !important;
  }

  .simple-share-btn svg {
    width: 18px !important;
    height: 18px !important;
  }
}

/* Base Styles for Simple Organizer Row & Share Button */
.simple-organizer-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
}

.org-avatar-box {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  background: #222222;
}

.org-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.org-text-meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.org-lbl {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 500;
  line-height: 1.3;
}

.org-name-val {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.9375rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
}

.simple-share-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.simple-share-btn:hover {
  opacity: 0.8;
  transform: scale(1.08);
}
</style>
