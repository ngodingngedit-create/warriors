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

        <!-- Language -->
        <div class="lang-wrapper" @mouseenter="showLang = true" @mouseleave="showLang = false">
          <button class="action-btn" aria-label="Language">
            <span class="lang-flag" v-html="languages.find(l => l.code === currentLang).flag"></span>
          </button>
          <transition name="dropdown">
            <div v-if="showLang" class="lang-dropdown">
              <button
                v-for="lang in languages"
                :key="lang.code"
                class="lang-option"
                :class="{ active: lang.code === currentLang }"
                @click="setLang(lang.code)"
              >
                <span class="lang-flag" v-html="lang.flag"></span>
                <span>{{ lang.label }}</span>
              </button>
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
          <span class="login-text">Masuk</span>
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
        <button class="action-btn cart-btn" @click="cartOpen = !cartOpen" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span v-if="cart.count > 0" class="cart-badge">{{ cart.count }}</span>
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
      <div v-if="cartOpen" class="cart-overlay" @click="cartOpen = false">
        <aside class="cart-sidebar" @click.stop>
          <div class="cart-header">
            <h3>Shopping Cart</h3>
            <button class="cart-close" @click="cartOpen = false">&times;</button>
          </div>

          <div v-if="cart.items.length === 0" class="cart-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>Your cart is empty</p>
          </div>

          <div v-else class="cart-body">
            <div v-for="item in cart.items" :key="item.id" class="cart-item">
              <div class="cart-item-detail">
                <span class="cart-item-name">{{ item.name }}</span>
                <span class="cart-item-price">€{{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              <div class="cart-item-controls">
                <button class="qty-btn" @click="decrementQty(item.id)">−</button>
                <span class="qty-num">{{ item.quantity }}</span>
                <button class="qty-btn" @click="incrementQty(item.id)">+</button>
                <button class="remove-btn" @click="removeItem(item.id)" title="Remove item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div v-if="cart.items.length > 0" class="cart-footer">
            <div class="cart-total">
              <span>Total</span>
              <span class="cart-total-price">€{{ cartTotal.toFixed(2) }}</span>
            </div>
            <button class="btn btn-checkout">Checkout</button>
            <button class="cart-clear" @click="clearCart">Clear All</button>
          </div>
        </aside>
      </div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click="mobileMenuOpen = false">
        <div class="mobile-menu" @click.stop>
          <div class="mobile-header">
            <img src="/images/logo-warriors-white.png" alt="Warriors" class="mobile-logo" />
            <button class="mobile-close" @click="mobileMenuOpen = false">&times;</button>
          </div>
          <nav class="mobile-nav">
            <div v-for="link in navLinks" :key="link.path" class="mobile-nav-item">
              <div class="mobile-link-wrap" @click="toggleMobileAccordion(link.path)">
                <router-link
                  :to="link.path"
                  class="mobile-link"
                  @click="!link.children && (mobileMenuOpen = false)"
                >{{ link.label }}</router-link>
                <button v-if="link.children" class="mobile-arrow" :class="{ open: mobileAccordion === link.path }">
                  <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>
                </button>
              </div>
              <transition name="accordion">
                <div v-if="link.children && mobileAccordion === link.path" class="mobile-subnav">
                  <router-link
                    v-for="child in link.children"
                    :key="child.path"
                    :to="child.path"
                    class="mobile-sub-link"
                    @click="mobileMenuOpen = false"
                  >
                    <span v-html="child.icon" class="sub-icon"></span>
                    {{ child.label }}
                  </router-link>
                </div>
              </transition>
              <!-- Mobile accordion sections -->
              <transition name="accordion">
                <div v-if="link.accordion && mobileAccordion === link.path" class="mobile-subnav">
                  <div v-for="(sec, si) in link.accordion" :key="si" class="mobile-acc-section">
                    <h5 class="mobile-acc-title">{{ sec.title }}</h5>
                    <router-link
                      v-for="item in sec.items"
                      :key="item.path"
                      :to="item.path"
                      class="mobile-sub-link"
                      @click="mobileMenuOpen = false"
                    >
                      <span v-html="item.icon" class="sub-icon"></span>
                      {{ item.label }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </nav>
          <div class="mobile-actions">
            <button class="mobile-action-btn" @click="mobileMenuOpen = false; cartOpen = true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Cart <span v-if="cart.count > 0">({{ cart.count }})</span>
            </button>
            <button class="mobile-action-btn" @click="authStore.isLoggedIn = !authStore.isLoggedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              {{ isLoggedIn ? 'Profile' : 'Masuk' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { authStore } from '../stores/auth.js'

const route = useRoute()
const isScrolled = ref(false)
const isLoggedIn = computed(() => authStore.isLoggedIn)

const isDarkHeader = computed(() =>
  route.path !== '/'
)
const headerClass = computed(() => ({
  scrolled: isScrolled.value || isDarkHeader.value
}))

const currentLang = ref('id')
const languages = [
  { code: 'id', label: 'Indonesia', flag: '<svg viewBox="0 0 6 4" width="20" height="14"><rect width="6" height="2" fill="#CE1126"/><rect y="2" width="6" height="2" fill="#FFF"/></svg>' },
  { code: 'en', label: 'English', flag: '<svg viewBox="0 0 6 4" width="20" height="14"><rect width="6" height="4" fill="#FFF"/><rect x="2" width="2" height="4" fill="#CE1126"/><rect y="1.5" width="6" height="1" fill="#CE1126"/></svg>' },
]

function setLang(code) {
  currentLang.value = code
  showLang.value = false
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

const navLinks = [
  { path: '/', label: 'Home' },
    { path: '/tours', label: 'Tours', children: [
    { path: '/tours', label: 'All Tours', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 3l14 9-14 9V3z"/></svg>' },
    { path: '/dates', label: 'Tour Dates', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' },
  ]},
  {
    path: '/revelations',
    label: 'Revelations Records',
    children: [
      { path: '/revelations', label: 'Artists', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
      { path: '/revelations/releases', label: 'Releases', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' },
    ],
    accordion: [
      {
        title: 'Label',
        items: [
          { path: '/revelations', label: 'Artist', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
        ]
      },
      {
        title: 'Merch',
        items: [
          { path: '/revelations/merch', label: 'Apparel', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-2.34-1.61l-.5-.16-.16.49a4 4 0 0 1-7.68 0l-.16-.49-.5.16a5.5 5.5 0 0 0-2.34 1.61L1 10l4 2 2-2v10h10V10l2 2 4-2-3.16-5.39z"/></svg>' },
          { path: '/revelations/merch/accessories', label: 'Accessories', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
          { path: '/revelations/merch/vinyl', label: 'Vinyl & CDs', icon: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v20"/></svg>' },
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
  { path: '/artists', label: 'Artists' },
  {
    path: '/labels',
    label: 'Labels',
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
]

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

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
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

/* Language */
.lang-wrapper {
  position: relative;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 150px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  text-align: left;
}

.lang-option:hover,
.lang-option.active {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
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
  background: rgba(0, 0, 0, 0.6);
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
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cart-item-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.cart-item-name {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.875rem;
  color: #fff;
}

.cart-item-price {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

.qty-num {
  width: 28px;
  text-align: center;
  font-size: 0.875rem;
  color: #fff;
  font-family: var(--font-heading);
  font-weight: 600;
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
