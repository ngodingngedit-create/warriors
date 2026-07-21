<template>
  <header class="site-header" :class="headerClass">
    <div class="container header-wrapper">
      <!-- Logo -->
      <router-link to="/" class="site-logo">
        <img src="/images/logo-warriors-white.png" alt="Warriors" />
      </router-link>

      <!-- Center Nav -->
      <nav class="desktop-nav">
        <div
          v-for="link in navLinks"
          :key="link.path"
          class="nav-item"
        >
          <router-link
            v-if="link.path === '/' || (!link.children && !link.accordion)"
            :to="link.path"
            class="nav-link"
            :class="{ active: isActive(link.path) }"
          >
            {{ link.label }}
          </router-link>
          <span
            v-else
            class="nav-link"
            :class="{ active: isActive(link.path) }"
          >
            {{ link.label }}
            <svg v-if="link.children || link.accordion" class="nav-arrow" width="8" height="5" viewBox="0 0 8 5">
              <path d="M1 1l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none"/>
            </svg>
          </span>
          <!-- Accordion Dropdown -->
          <div v-if="link.accordion" class="dropdown-menu accordion-dropdown">
            <div v-for="(section, si) in link.accordion" :key="si" class="accordion-section">
              <h4 class="accordion-section-title" v-if="section.title">{{ section.title }}</h4>
              <router-link
                v-for="item in section.items"
                :key="item.path"
                :to="item.path"
                class="dropdown-item"
              >
                <span class="dropdown-icon" v-html="item.icon"></span>
                <span class="dropdown-title">{{ item.label }}</span>
              </router-link>
            </div>
          </div>
          <!-- Simple Children Dropdown -->
          <div v-else-if="link.children" class="dropdown-menu" :class="{ 'artist-dropdown': link.label === 'Artists' }">
            <router-link
              v-for="child in link.children"
              :key="child.path"
              :to="child.path"
              class="dropdown-item"
            >
              <span class="dropdown-icon" v-html="child.icon" v-if="child.icon"></span>
              <span class="dropdown-title">{{ child.label }}</span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- Right Actions -->
      <div class="header-actions">

        <!-- Language Selector Button & Accordion Card Dropdown -->
        <div class="lang-wrapper" ref="langWrapperRef">
          <button 
            class="action-btn lang-toggle-btn" 
            @click.stop="showLang = !showLang"
            aria-label="Select Language"
          >
            <span class="lang-flag" v-html="currentLangObj.flag"></span>
            <span class="lang-code-text">{{ langState.current.toUpperCase() }}</span>
            <svg class="lang-chevron" :class="{ open: showLang }" width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
          </button>

          <!-- Card Accordion Popup Dropdown -->
          <transition name="dropdown">
            <div v-if="showLang" class="lang-dropdown-card" @click.stop>
              <div class="lang-card-header">
                <span>{{ t('common.select_lang') }}</span>
              </div>
              <div class="lang-card-options">
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  class="lang-option-btn"
                  :class="{ active: lang.code === langState.current }"
                  @click="setLang(lang.code)"
                >
                  <span class="lang-flag" v-html="lang.flag"></span>
                  <span class="lang-label">{{ lang.label }}</span>
                  <svg v-if="lang.code === langState.current" class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="action-btn login-btn"
          aria-label="Login"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span class="login-text">{{ t('nav.login') }}</span>
        </router-link>
        <button
          v-else
          class="action-btn profile-btn"
          @click="authStore.isLoggedIn = false"
          aria-label="Profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>

        <!-- Cart -->
        <button class="action-btn cart-btn" @click="cartState.isOpen = !cartState.isOpen" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span 
            v-if="totalCartCount > 0" 
            class="cart-badge"
            :class="{ 'badge-pop-anim': cartState.badgeAnim }"
          >
            {{ totalCartCount }}
          </span>
        </button>

        <!-- Mobile Hamburger -->
        <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <span class="hamburger" :class="{ 'is-active': mobileMenuOpen }">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Cart Sidebar -->
    <transition name="cart-slide">
      <div v-if="cartState.isOpen" class="cart-overlay" @click="cartState.isOpen = false">
        <aside class="cart-sidebar" @click.stop>
          <div class="cart-header">
            <h3>{{ t('cart.title') }}</h3>
            <button class="cart-close" @click="cartState.isOpen = false">&times;</button>
          </div>

          <div v-if="cartState.items.length === 0" class="cart-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>{{ t('cart.empty') }}</p>
          </div>

          <div v-else class="cart-body">
            <div v-for="item in cartState.items" :key="item.id" class="cart-item">
              <div class="cart-item-thumb-box">
                <img :src="item.image || '/vinyl/vinyl(1).webp'" :alt="item.name" class="cart-item-thumb" />
              </div>
              <div class="cart-item-content">
                <div class="cart-item-top-row">
                  <span class="cart-item-title">{{ item.name }}</span>
                  <button class="cart-item-trash-btn" @click="cartState.removeItem(item.id)" title="Hapus produk">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>

                <span class="cart-item-variant">{{ t('cart.variant') }}: {{ item.variant || 'S' }}</span>

                <div class="cart-item-bottom-row">
                  <span class="cart-item-price">{{ formatPrice(item.price * item.quantity) }}</span>

                  <div class="cart-item-qty-box">
                    <button class="cart-qty-btn" @click="cartState.decrementQty(item.id)">−</button>
                    <span class="cart-qty-num">{{ item.quantity }}</span>
                    <button class="cart-qty-btn" @click="cartState.incrementQty(item.id)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="cartState.items.length > 0" class="cart-footer">
            <div class="cart-total">
              <span>{{ t('cart.total') }}</span>
              <span class="cart-total-price">{{ formatPrice(totalCartPrice) }}</span>
            </div>
            <button class="btn btn-checkout">{{ t('cart.checkout') }}</button>
            <button class="cart-clear" @click="cartState.clearCart()">{{ t('cart.clear') }}</button>
          </div>
        </aside>
      </div>
    </transition>

    <!-- Mobile Menu Sidebar -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click="mobileMenuOpen = false">
        <div class="mobile-menu" @click.stop>
          <div class="mobile-header">
            <img src="/images/logo-warriors-white.png" alt="Warriors" class="mobile-logo" />
            <button class="mobile-close" @click="mobileMenuOpen = false">&times;</button>
          </div>

          <nav class="mobile-nav">
            <div v-for="link in navLinks" :key="link.path" class="mobile-nav-item">
              <!-- Item with children or accordion (Expandable Sub-button) -->
              <div 
                v-if="link.children || link.accordion" 
                class="mobile-link-wrap"
                @click="toggleMobileAccordion(link.path)"
              >
                <span class="mobile-link">{{ link.label }}</span>
                <button class="mobile-arrow" :class="{ open: mobileAccordion === link.path }">
                  <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </button>
              </div>

              <!-- Simple Item without sub-buttons -->
              <router-link
                v-else
                :to="link.path"
                class="mobile-link simple-mobile-link"
                @click="mobileMenuOpen = false"
              >
                {{ link.label }}
              </router-link>

              <!-- Children Accordion Dropdown -->
              <transition name="accordion">
                <div v-if="link.children && mobileAccordion === link.path" class="mobile-subnav">
                  <router-link
                    v-for="child in link.children"
                    :key="child.path"
                    :to="child.path"
                    class="mobile-sub-link"
                    @click="mobileMenuOpen = false"
                  >
                    <span v-if="child.icon" v-html="child.icon" class="sub-icon"></span>
                    <span>{{ child.label }}</span>
                  </router-link>
                </div>
              </transition>

              <!-- Section Accordion Dropdown -->
              <transition name="accordion">
                <div v-if="link.accordion && mobileAccordion === link.path" class="mobile-subnav">
                  <div v-for="(sec, si) in link.accordion" :key="si" class="mobile-acc-section">
                    <h5 v-if="sec.title" class="mobile-acc-title">{{ sec.title }}</h5>
                    <router-link
                      v-for="item in sec.items"
                      :key="item.path"
                      :to="item.path"
                      class="mobile-sub-link"
                      @click="mobileMenuOpen = false"
                    >
                      <span v-if="item.icon" v-html="item.icon" class="sub-icon"></span>
                      <span>{{ item.label }}</span>
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </nav>

          <!-- Mobile Actions (Cart, Login/Profile) -->
          <div class="mobile-actions">
            <button class="mobile-action-btn" @click="mobileMenuOpen = false; cartState.isOpen = true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              <span>Keranjang</span>
              <span v-if="totalCartCount > 0" class="mobile-cart-badge">({{ totalCartCount }})</span>
            </button>

            <router-link v-if="!isLoggedIn" to="/login" class="mobile-action-btn" @click="mobileMenuOpen = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Masuk</span>
            </router-link>
            
            <button v-else class="mobile-action-btn" @click="authStore.isLoggedIn = false; mobileMenuOpen = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Profil / Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { authStore } from '../stores/auth.js'
import { cartState, totalCartCount, totalCartPrice } from '../store/cartState.js'

const formatPrice = (price) => {
  if (price === 0 || !price) return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const route = useRoute()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const mobileAccordion = ref(null)
const isLoggedIn = computed(() => authStore.isLoggedIn)

// Lock body scrolling when Cart Sidebar or Mobile Menu is open
watch(() => cartState.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else if (!mobileMenuOpen.value) {
    document.body.style.overflow = ''
  }
})

watch(mobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else if (!cartState.isOpen) {
    document.body.style.overflow = ''
  }
})

const isDarkHeader = computed(() =>
  route.path !== '/'
)
const headerClass = computed(() => ({
  scrolled: isScrolled.value || isDarkHeader.value
}))

import { langState, t } from '../store/langState.js'

const showLang = ref(false)
const langWrapperRef = ref(null)

const languages = [
  { 
    code: 'id', 
    label: 'Indonesia', 
    flag: `<svg viewBox="0 0 600 400" width="20" height="14" style="border-radius:2px; object-fit:cover; display:inline-block; vertical-align:middle;"><rect width="600" height="200" fill="#DA251D"/><rect y="200" width="600" height="200" fill="#FFFFFF"/></svg>` 
  },
  { 
    code: 'en', 
    label: 'English', 
    flag: `<svg viewBox="0 0 60 30" width="20" height="14" style="border-radius:2px; object-fit:cover; display:inline-block; vertical-align:middle;"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t"><path d="M0,0 L60,30 M60,0 L0,30"/></clipPath><g clip-path="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>` 
  },
]

const currentLangObj = computed(() => {
  return languages.find(l => l.code === langState.current) || languages[0]
})

function setLang(code) {
  langState.setLang(code)
  showLang.value = false
}

function handleClickOutside(e) {
  if (langWrapperRef.value && !langWrapperRef.value.contains(e.target)) {
    showLang.value = false
  }
}

// Cart
const cart = reactive({
  items: []
})

const cartCount = computed(() => cart.items.reduce((s, i) => s + i.quantity, 0))
const cartTotal = computed(() => cart.items.reduce((s, i) => s + i.price * i.quantity, 0))

function incrementQty(id) {
  const item = cart.items.find(i => i.id === id)
  if (item) item.quantity++
}
function decrementQty(id) {
  const idx = cart.items.findIndex(i => i.id === id)
  if (idx > -1) {
    if (cart.items[idx].quantity <= 1) {
      cart.items.splice(idx, 1)
    } else {
      cart.items[idx].quantity--
    }
  }
}
function removeItem(id) {
  const idx = cart.items.findIndex(i => i.id === id)
  if (idx > -1) cart.items.splice(idx, 1)
}
function clearCart() {
  cart.items.splice(0, cart.items.length)
}

// Add sample products for demo
function addSampleItems() {
  if (cart.items.length === 0) {
    cart.items.push(
      { id: 1, name: 'IGNITE / CANCER BATS', price: 35.00, quantity: 1 },
      { id: 2, name: 'Carcass Summer Tour', price: 42.00, quantity: 2 },
      { id: 3, name: 'Punk & Disorderly Fest', price: 89.00, quantity: 1 },
    )
  }
}
// Uncomment below to pre-fill cart for demo:
// addSampleItems()
const navLinks = computed(() => [
  { path: '/', label: t('nav.home') },
  { 
    path: '/tours', 
    label: t('nav.tours'), 
    children: [
      { path: '/tours', label: t('nav.all_tours'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 3l14 9-14 9V3z"/></svg>' },
      { path: '/dates', label: t('nav.tour_dates'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' },
    ]
  },
  {
    path: '/revelations',
    label: 'Revelations Records',
    children: [
      { path: '/artists', label: t('nav.artists'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { path: '/revelations/releases', label: 'Releases', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
    ],
    accordion: [
      {
        title: 'Label',
        items: [
          { path: '/artists', label: t('nav.artists'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
        ]
      },
      {
        title: t('nav.merch'),
        items: [
          { path: '/revelations/merch', label: t('nav.apparel'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-2.34-1.61l-.5-.16-.16.49a4 4 0 0 1-7.68 0l-.16-.49-.5.16a5.5 5.5 0 0 0-2.34 1.61L1 10l4 2 2-2v10h10V10l2 2 4-2-3.16-5.39z"/></svg>' },
          { path: '/revelations/merch/accessories', label: t('nav.accessories'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
          { path: '/revelations/merch/vinyl', label: t('nav.vinyl'), icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v20"/></svg>' },
        ]
      },
      {
        title: 'Social Media',
        items: [
          { path: '/revelations/social/instagram', label: 'Instagram', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>' },
          { path: '/revelations/social/youtube', label: 'YouTube', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/><rect x="2" y="3" width="20" height="18" rx="3"/></svg>' },
          { path: '/revelations/social/spotify', label: 'Spotify', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 16c2.5-1.5 5.5-1.5 8 0M6 12c3.3-2 7.3-2 10.5 0M4 8c4-2.5 9-2.5 13.5 0"/></svg>' },
        ]
      }
    ]
  },
  { path: '/artists', label: t('nav.artists') },
  {
    path: '/labels',
    label: t('nav.labels'),
    accordion: [
      {
        title: 'A - D',
        items: [
          { path: '/labels/century-media', label: 'Century Media', icon: '' },
          { path: '/labels/ditto', label: 'Ditto Music', icon: '' },
          { path: '/labels/epitaph', label: 'Epitaph Records', icon: '' },
        ]
      },
      {
        title: 'E - M',
        items: [
          { path: '/labels/ingrooves', label: 'Ingrooves', icon: '' },
          { path: '/labels/metal-blade', label: 'Metal Blade', icon: '' },
          { path: '/labels/nuclear-blast', label: 'Nuclear Blast', icon: '' },
          { path: '/labels/prosthetic', label: 'Prosthetic Records', icon: '' },
        ]
      },
      {
        title: 'N - S',
        items: [
          { path: '/labels/rise', label: 'Rise Records', icon: '' },
          { path: '/labels/season-of-mist', label: 'Season of Mist', icon: '' },
          { path: '/labels/sharptone', label: 'SharpTone Records', icon: '' },
          { path: '/labels/sony', label: 'Sony Music', icon: '' },
          { path: '/labels/sumerian', label: 'Sumerian Records', icon: '' },
        ]
      },
      {
        title: 'T - Z',
        items: [
          { path: '/labels/the-orchard', label: 'The Orchard', icon: '' },
          { path: '/labels/universal', label: 'Universal Music', icon: '' },
          { path: '/labels/warner', label: 'Warner Music', icon: '' },
          { path: '/labels/warriors', label: 'Warriors Records', icon: '' },
        ]
      }
    ]
  },
])

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleMobileAccordion(path) {
  mobileAccordion.value = mobileAccordion.value === path ? null : path
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: all 0.35s ease;
  padding: 24px 0;
}
.site-header.scrolled {
  background: rgba(13, 13, 13, 0.97);
  backdrop-filter: blur(14px);
  padding: 10px 0;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* Logo */
.site-logo {
  flex-shrink: 0;
  max-width: 180px;
  transition: max-width 0.3s ease;
}
.scrolled .site-logo { max-width: 150px; }
.site-logo img { width: 100%; height: auto; display: block; }

/* Desktop Nav Centered */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0;
  margin: 0 auto;
}

.nav-item {
  position: relative;
}

.nav-link {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 12px 24px;
  border-radius: 4px;
  transition: all 0.25s ease;
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.nav-arrow { transition: transform 0.25s ease; }
.nav-item:hover .nav-arrow { transform: rotate(180deg); }

/* Dropdown Menu - CSS Hover */

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  min-width: 200px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
}

.artist-dropdown {
  min-width: 720px;
  max-width: 900px;
  padding: 12px 16px;
  column-count: 6;
  column-gap: 12px;
}

.artist-dropdown .dropdown-item {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  padding: 6px 12px;
  font-size: 0.8125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.accordion-dropdown {
  min-width: 0;
  max-width: none;
  padding: 12px 12px 12px 8px;
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.accordion-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.accordion-section-title {
  font-family: var(--font-heading);
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 6px;
  padding: 0 6px 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.accordion-dropdown .dropdown-item {
  padding: 8px 6px 8px 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  gap: 0;
}

.accordion-dropdown .dropdown-item .dropdown-icon:empty {
  display: none;
}

.accordion-dropdown .dropdown-item .dropdown-icon:not(:empty) {
  margin-right: 0;
}

.accordion-dropdown .dropdown-title {
  margin-left: 0;
}

/* Transparent bridge so cursor can move from nav-link into dropdown */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  height: 10px;
  background: transparent;
}

.nav-item:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
  pointer-events: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 5px;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  font-weight: 500;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  padding-left: 18px;
}

.dropdown-icon {
  font-size: 0.85rem;
  width: 16px;
  text-align: center;
  flex-shrink: 0;
  opacity: 0.6;
}

.dropdown-title {
  font-family: var(--font-heading);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  font-size: 0.85rem;
}

.action-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.login-text {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Language Accordion Card */
.lang-wrapper {
  position: relative;
}

.lang-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.lang-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.3);
}

.lang-code-text {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.78rem;
  font-weight: 800;
  color: #ffffff;
}

.lang-chevron {
  transition: transform 0.25s ease;
  color: rgba(255, 255, 255, 0.7);
}

.lang-chevron.open {
  transform: rotate(180deg);
  color: #ffffff;
}

.lang-dropdown-card {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 180px;
  background: #171717;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  padding: 8px;
  z-index: 1000;
  animation: dropdownIn 0.25s ease forwards;
}

@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.lang-card-header {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255, 255, 255, 0.4);
  padding: 6px 10px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 4px;
}

.lang-card-options {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lang-option-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-family: var(--font-heading, sans-serif);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.lang-option-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.lang-option-btn.active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-weight: 700;
}

.lang-label {
  flex: 1;
}

.check-icon {
  flex-shrink: 0;
}

.lang-flag { display: flex; align-items: center; }

/* Cart Badge */
.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  color: #000;
  font-size: 0.6rem;
  font-weight: 800;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
}

/* Cart Sidebar */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.cart-sidebar {
  width: 100%;
  max-width: 420px;
  background: #111;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cart-header h3 {
  font-size: 1.125rem;
  color: #fff;
  margin: 0;
}

.cart-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
  transition: color 0.2s;
}
.cart-close:hover { color: #fff; }

.cart-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9375rem;
}

.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 24px;
}

.cart-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cart-item-thumb-box {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: #1a1a1a;
}

.cart-item-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cart-item-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 2px;
}

.cart-item-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.85rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cart-item-trash-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.cart-item-trash-btn:hover {
  color: #ef4444;
}

.cart-item-variant {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.cart-item-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item-price {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.875rem;
  font-weight: 800;
  color: #ffffff;
}

.cart-item-qty-box {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 2px 6px;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
}

.cart-qty-btn {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.cart-qty-btn:hover {
  color: #ffffff;
}

.cart-qty-num {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  min-width: 14px;
  text-align: center;
}

.remove-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.25);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}
.remove-btn:hover { color: #ff4444; }

.cart-footer {
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
}

.cart-total-price {
  font-size: 1.25rem;
  color: #fff;
}

.btn-checkout {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 6px;
  background: #fff;
  color: #000;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-checkout:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
}

.cart-clear {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  transition: color 0.2s;
  padding: 4px;
}
.cart-clear:hover { color: #ff4444; }

/* Cart Animation */
.cart-slide-enter-active,
.cart-slide-leave-active {
  transition: opacity 0.3s ease;
}
.cart-slide-enter-active .cart-sidebar,
.cart-slide-leave-active .cart-sidebar {
  transition: transform 0.3s ease;
}
.cart-slide-enter-from,
.cart-slide-leave-to {
  opacity: 0;
}
.cart-slide-enter-from .cart-sidebar {
  transform: translateX(100%);
}
.cart-slide-leave-to .cart-sidebar {
  transform: translateX(100%);
}

/* Mobile Menu */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}
.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}
.hamburger.is-active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.is-active span:nth-child(2) { opacity: 0; }
.hamburger.is-active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 380px;
  height: 100vh;
  background: #111;
  padding: 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.mobile-logo { max-width: 120px; }

.mobile-close {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 2.2rem;
  cursor: pointer;
  line-height: 1;
}

.mobile-nav { flex: 1; }

.mobile-nav-item {
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.mobile-link-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-link {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 14px 0;
  color: rgba(255,255,255,0.8);
  flex: 1;
  transition: color 0.2s;
}

.mobile-link:hover,
.mobile-link.router-link-exact-active { color: #fff; }

.mobile-arrow {
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  padding: 14px 4px;
  transition: all 0.25s;
}
.mobile-arrow.open { transform: rotate(180deg); color: #fff; }

.mobile-subnav {
  padding: 4px 0 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mobile-sub-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  font-size: 0.875rem;
  color: rgba(255,255,255,0.55);
  border-radius: 5px;
  transition: all 0.2s;
}

.mobile-sub-link:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
  padding-left: 16px;
}

.sub-icon { font-size: 0.85rem; opacity: 0.5; }

.mobile-acc-section {
  margin-bottom: 12px;
}

.mobile-acc-title {
  font-family: var(--font-heading);
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: rgba(255, 255, 255, 0.35);
  padding: 8px 12px 4px;
  margin: 0;
}

.mobile-actions {
  padding: 24px 0 0;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  font-family: var(--font-heading);
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
}
.mobile-action-btn:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}

.accordion-enter-active { animation: accIn 0.25s ease; }
.accordion-leave-active { animation: accIn 0.2s ease reverse; }
@keyframes accIn {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 200px; }
}

.slide-enter-active,
.slide-leave-active { transition: opacity 0.3s ease; }
.slide-enter-active .mobile-menu,
.slide-leave-active .mobile-menu { transition: transform 0.3s ease; }
.slide-enter-from,
.slide-leave-to { opacity: 0; }
.slide-enter-from .mobile-menu { transform: translateX(100%); }
.slide-leave-to .mobile-menu { transform: translateX(100%); }

@media (max-width: 968px) {
  .desktop-nav { display: none; }
  .menu-toggle { display: block; }
  .site-header { padding: 16px 0; }
  .scrolled .site-header { padding: 8px 0; }
  .site-logo { max-width: 140px; }
  .scrolled .site-logo { max-width: 120px; }
  .login-text { display: none; }
}
</style>
