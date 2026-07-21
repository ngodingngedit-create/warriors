<template>
  <div class="vinyl-detail-page">
    <div class="product-section">
      <div class="container">
        <div class="product-grid">

          <!-- ===== LEFT: Gallery ===== -->
          <div class="gallery-col">
            <div class="main-image-container">
              <img :src="images[activeImage]" :alt="vinyl.title" class="main-image" loading="lazy" />
            </div>
            <div class="thumbnail-row">
              <button class="thumb-arrow" @click="prevThumb" :disabled="thumbOffset === 0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div class="thumb-viewport">
                <div class="thumb-list" :style="{ transform: `translateX(-${thumbOffset * 64}px)` }">
                  <button
                    v-for="(img, idx) in images"
                    :key="idx"
                    class="thumb-item"
                    :class="{ active: idx === activeImage }"
                    @click="setActiveImage(idx)"
                  >
                    <img :src="img" :alt="`Thumbnail ${idx + 1}`" loading="lazy" />
                  </button>
                </div>
              </div>
              <button class="thumb-arrow" @click="nextThumb" :disabled="thumbOffset >= images.length - 4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <!-- ===== CENTER: Info + Tabs ===== -->
          <div class="info-col">
            <div class="product-info">
              <h1 class="product-title">{{ vinyl.title }}</h1>
              <div class="sold-text">Terjual {{ vinyl.sold }}</div>
              <div class="product-price">{{ formatPrice(vinyl.price) }}</div>
            </div>

            <div class="seller-card">
              <div class="seller-avatar"><span>M</span></div>
              <div class="seller-info">
                <div class="seller-name-row">
                  <span class="seller-name">moofeet</span>
                  <svg class="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="#1DA1F2" stroke="none">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                  </svg>
                </div>
                <div class="seller-location">Jakarta</div>
              </div>
            </div>

            <div class="variant-section">
              <div class="variant-label">Pilih Edisi : <strong>{{ selectedVariant }}</strong></div>
              <div class="variant-buttons">
                <button
                  v-for="variant in variants"
                  :key="variant"
                  class="variant-btn"
                  :class="{ active: selectedVariant === variant }"
                  @click="selectedVariant = variant"
                >
                  {{ variant }}
                </button>
              </div>
            </div>

            <div class="tabs-section">
              <div class="tabs-header">
                <button class="tab-btn" :class="{ active: activeTab === 'deskripsi' }" @click="activeTab = 'deskripsi'">Deskripsi Produk</button>
                <button class="tab-btn" :class="{ active: activeTab === 'ulasan' }" @click="activeTab = 'ulasan'">Ulasan ({{ vinyl.reviews }})</button>
              </div>
              <div class="tabs-content">
                <div v-if="activeTab === 'deskripsi'" class="tab-panel">
                  <p class="desc-text">{{ vinyl.description }}</p>
                  <h4 class="detail-heading">Detail Produk :</h4>
                  <ul class="detail-list">
                    <li v-for="(item, idx) in vinyl.details" :key="idx">{{ item }}</li>
                  </ul>
                </div>
                <div v-else class="tab-panel">
                  <p class="empty-text">Belum ada ulasan untuk produk ini.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== RIGHT: Order Panel ===== -->
          <div class="order-col">
            <div class="order-panel">
              <div class="qty-section">
                <div class="qty-header">
                  <span class="qty-label">Jumlah</span>
                  <span class="stock-text">Stok {{ vinyl.stock }}</span>
                </div>
                <div class="qty-controls">
                  <button class="qty-btn" @click="decreaseQty" :disabled="quantity <= 1">−</button>
                  <span class="qty-value">{{ quantity }}</span>
                  <button class="qty-btn" @click="increaseQty" :disabled="quantity >= vinyl.stock">+</button>
                </div>
              </div>

              <div class="subtotal-section">
                <span class="subtotal-label">Subtotal</span>
                <span class="subtotal-price">{{ formatPrice(vinyl.price * quantity) }}</span>
              </div>

              <div class="order-actions">
                <button class="btn-add-cart" @click="addToCart">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Tambah Keranjang
                </button>
                <button class="btn-buy-now" @click="buyNow">Beli Sekarang</button>
              </div>

              <div class="social-row">
                <button class="social-btn" title="Bagikan">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
                <button class="social-btn" :class="{ favorited: isFavorite }" @click="isFavorite = !isFavorite" title="Favorit">
                  <svg width="18" height="18" viewBox="0 0 24 24" :fill="isFavorite ? '#ef4444' : 'none'" :stroke="isFavorite ? '#ef4444' : 'currentColor'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button class="social-btn chat-btn" title="Chat">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import Footer from '../components/Footer.vue'

const route = useRoute()

const vinylData = [
  {
    id: 7,
    title: 'The Poison - Bullet For My Valentine',
    sold: 0,
    price: 250000,
    stock: 5,
    reviews: 0,
    description: 'Ini adalah piringan hitam 180g edisi terbatas dari album ikonik "The Poison" oleh Bullet For My Valentine. Dicetak ulang dengan master audio asli untuk pengalaman mendengarkan analog terbaik. Dilengkapi dengan gatefold cover yang indah dan buklet lirik.',
    details: ['Material : Vinyl 180g', 'Edisi : Gatefold Limited Edition', 'Warna : Hitam Klasik', 'Kondisi : Baru, Segel Pabrik', 'Label : Columbia / Visible Noise'],
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 8,
    title: 'Ashes of the Wake - Lamb of God',
    sold: 0,
    price: 320000,
    stock: 3,
    reviews: 0,
    description: 'Ini adalah piringan hitam 180g 2xVinyl edisi terbatas dari album "Ashes of the Wake" oleh Lamb of God. Dicetak ulang dengan master audio asli untuk pengalaman mendengarkan analog terbaik.',
    details: ['Material : Vinyl 180g', 'Format : 2xVinyl', 'Edisi : Gatefold Limited Edition', 'Kondisi : Baru, Segel Pabrik', 'Label : Epic / Prosthetic'],
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 9,
    title: 'The Blackening - Machine Head',
    sold: 0,
    price: 280000,
    stock: 4,
    reviews: 0,
    description: 'Ini adalah piringan hitam 180g edisi terbatas dari album "The Blackening" oleh Machine Head. Dicetak ulang dengan master audio asli.',
    details: ['Material : Vinyl 180g', 'Edisi : Limited Edition', 'Kondisi : Baru, Segel Pabrik', 'Label : Roadrunner Records'],
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  },
  {
    id: 10,
    title: 'Chaos A.D. - Sepultura',
    sold: 0,
    price: 260000,
    stock: 6,
    reviews: 0,
    description: 'Ini adalah piringan hitam 180g edisi terbatas dari album "Chaos A.D." oleh Sepultura. Dicetak ulang dengan master audio asli.',
    details: ['Material : Vinyl 180g', 'Edisi : Limited Edition', 'Kondisi : Baru, Segel Pabrik', 'Label : Roadrunner Records'],
    coverImage: '/vinyl/vinyl(1).webp',
    vinylImage: '/vinyl/vinyl(2).webp',
  }
]

const vinyl = computed(() => {
  const id = Number(route.params.id)
  return vinylData.find(v => v.id === id) || vinylData[0]
})

const images = computed(() => [vinyl.value.coverImage, vinyl.value.vinylImage, vinyl.value.coverImage, vinyl.value.vinylImage])
const activeImage = ref(0)
const thumbOffset = ref(0)
const setActiveImage = (idx) => { activeImage.value = idx }
const prevThumb = () => { if (thumbOffset.value > 0) thumbOffset.value-- }
const nextThumb = () => { if (thumbOffset.value < images.value.length - 4) thumbOffset.value++ }

const variants = ['Standar Hitam', 'Warna Terbatas', 'Gatefold Deluxe', 'Edisi Tes Pres']
const selectedVariant = ref('Standar Hitam')

const quantity = ref(1)
const increaseQty = () => { if (quantity.value < vinyl.value.stock) quantity.value++ }
const decreaseQty = () => { if (quantity.value > 1) quantity.value-- }

const activeTab = ref('deskripsi')
const isFavorite = ref(false)

import { cartState } from '../store/cartState.js'

const addToCart = () => {
  cartState.addItem(vinyl.value, quantity.value)
}
const buyNow = () => {
  cartState.addItem(vinyl.value, quantity.value)
  cartState.isOpen = true
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}
</script>

<style scoped>
.vinyl-detail-page {
  min-height: 100vh;
  background: var(--color-bg, #ffffff);
  color: var(--color-text, #171717);
  font-family: var(--font-body);
}

.container {
  max-width: var(--container-narrow, 1200px);
  margin: 0 auto;
  padding: 0 24px;
}

.product-section {
  padding: 120px 0 80px;
}

/* ===== 3-COLUMN GRID ===== */
.product-grid {
  display: grid;
  grid-template-columns: 260px 1fr 280px;
  gap: 28px;
  align-items: start;
}

/* ===== LEFT: Gallery ===== */
.gallery-col {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.main-image-container {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  overflow: hidden;
  background: var(--color-bg-alt, #f5f5f5);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.thumbnail-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.thumb-arrow {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--color-bg-alt, #f5f5f5);
  border: 1px solid var(--color-border, rgba(23,23,23,0.1));
  color: var(--color-text, #171717);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}
.thumb-arrow:hover:not(:disabled) { background: var(--color-primary-light, #2d2d2d); color: var(--color-white); }
.thumb-arrow:disabled { opacity: 0.3; cursor: not-allowed; }

.thumb-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 6px;
}

.thumb-list {
  display: flex;
  gap: 6px;
  transition: transform 0.3s ease;
}

.thumb-item {
  flex-shrink: 0;
  width: 58px;
  height: 58px;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid var(--color-border, rgba(23,23,23,0.1));
  background: var(--color-bg-alt, #f5f5f5);
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s ease;
}
.thumb-item.active { border-color: var(--color-primary, #171717); }
.thumb-item:hover:not(.active) { border-color: var(--color-primary-light, #2d2d2d); }

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ===== CENTER: Info + Tabs ===== */
.info-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-title {
  font-family: var(--font-heading);
  font-size: 1.375rem;
  font-weight: 900;
  line-height: 1.2;
  color: var(--color-text, #171717);
}

.sold-text {
  font-size: 0.8125rem;
  color: var(--color-text-light, rgba(23,23,23,0.55));
  margin-bottom: 4px;
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--color-text, #171717);
}

/* Seller Card */
.seller-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--color-bg-alt, #f5f5f5);
  border-radius: 10px;
  border: 1px solid var(--color-border, rgba(23,23,23,0.1));
}

.seller-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary, #171717);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 900;
  color: var(--color-white);
  flex-shrink: 0;
}

.seller-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.seller-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.seller-name {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--color-text, #171717);
}

.verified-badge { flex-shrink: 0; }

.seller-location {
  font-size: 0.6875rem;
  color: var(--color-text-light, rgba(23,23,23,0.55));
}

/* Variant */
.variant-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.variant-label {
  font-size: 0.8125rem;
  color: var(--color-text-light, rgba(23,23,23,0.55));
}
.variant-label strong { color: var(--color-text, #171717); }

.variant-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.variant-btn {
  padding: 7px 14px;
  border-radius: 7px;
  border: 1px solid var(--color-border, rgba(23,23,23,0.1));
  background: var(--color-white, #ffffff);
  color: var(--color-text, #171717);
  font-family: var(--font-heading);
  font-size: 0.6875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}
.variant-btn:hover:not(.active) { border-color: var(--color-primary-light, #2d2d2d); background: var(--color-bg-alt, #f5f5f5); }
.variant-btn.active { background: var(--color-primary, #171717); color: var(--color-white, #ffffff); border-color: var(--color-primary, #171717); }

/* ===== TABS ===== */
.tabs-section {
  border-top: 1px solid var(--color-border, rgba(23,23,23,0.1));
  padding-top: 20px;
}

.tabs-header {
  display: flex;
  gap: 28px;
  border-bottom: 1px solid var(--color-border, rgba(23,23,23,0.1));
  margin-bottom: 20px;
}

.tab-btn {
  background: none;
  border: none;
  color: var(--color-text-light, rgba(23,23,23,0.55));
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 700;
  padding: 10px 0;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}
.tab-btn.active { color: var(--color-text, #171717); }
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary, #171717);
}

.tab-panel {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.desc-text {
  color: var(--color-text, #171717);
  font-size: 0.875rem;
  line-height: 1.7;
  margin-bottom: 20px;
}

.detail-heading {
  color: var(--color-text, #171717);
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.detail-list {
  list-style: disc;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-list li {
  color: var(--color-text, #171717);
  font-size: 0.8125rem;
  line-height: 1.5;
}

.empty-text {
  color: var(--color-text-light, rgba(23,23,23,0.55));
  font-size: 0.8125rem;
  text-align: center;
  padding: 32px 0;
}

/* ===== RIGHT: Order Panel ===== */
.order-col {
  position: sticky;
  top: 100px;
}

.order-panel {
  background: var(--color-bg-alt, #f5f5f5);
  border: 1px solid var(--color-border, rgba(23,23,23,0.1));
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.qty-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qty-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qty-label {
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--color-text, #171717);
}

.stock-text {
  font-size: 0.6875rem;
  color: var(--color-text-light, rgba(23,23,23,0.55));
}

.qty-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border, rgba(23,23,23,0.1));
  border-radius: 7px;
  overflow: hidden;
  width: fit-content;
  background: var(--color-white, #ffffff);
}

.qty-btn {
  width: 32px;
  height: 32px;
  background: var(--color-white, #ffffff);
  border: none;
  color: var(--color-text, #171717);
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.qty-btn:hover:not(:disabled) { background: var(--color-bg-alt, #f5f5f5); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.qty-value {
  width: 40px;
  text-align: center;
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text, #171717);
  background: var(--color-white, #ffffff);
  border-left: 1px solid var(--color-border, rgba(23,23,23,0.1));
  border-right: 1px solid var(--color-border, rgba(23,23,23,0.1));
}

.subtotal-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid var(--color-border, rgba(23,23,23,0.1));
}

.subtotal-label {
  font-size: 0.75rem;
  color: var(--color-text-light, rgba(23,23,23,0.55));
}

.subtotal-price {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: 900;
  color: var(--color-text, #171717);
}

/* Order Actions */
.order-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-add-cart {
  width: 100%;
  padding: 12px 20px;
  background: var(--color-primary, #171717);
  color: var(--color-white, #ffffff);
  border: none;
  border-radius: 9px;
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}
.btn-add-cart:hover { background: var(--color-accent-hover, #000000); transform: translateY(-1px); }

.btn-buy-now {
  width: 100%;
  padding: 12px 20px;
  background: transparent;
  color: var(--color-text, #171717);
  border: 2px solid var(--color-primary, #171717);
  border-radius: 9px;
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-buy-now:hover { background: var(--color-bg-alt, #f5f5f5); transform: translateY(-1px); }

/* Social Row */
.social-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 10px;
  border-top: 1px solid var(--color-border, rgba(23,23,23,0.1));
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 7px;
  background: var(--color-white, #ffffff);
  border: 1px solid var(--color-border, rgba(23,23,23,0.1));
  color: var(--color-text, #171717);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.social-btn:hover { background: var(--color-bg-alt, #f5f5f5); }
.social-btn.favorited { background: rgba(239,68,68,0.05); border-color: rgba(239,68,68,0.2); color: #ef4444; }

.chat-btn {
  width: auto;
  padding: 0 14px;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
}

/* ===== RESPONSIVE ===== */

/* Tablet: 2 columns */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 220px 1fr;
    gap: 24px;
  }

  .order-col {
    position: static;
    grid-column: 1 / -1;
  }

  .order-panel {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  .order-panel > * {
    flex: 1;
    min-width: 200px;
  }

  .order-actions {
    min-width: 100%;
  }

  .social-row {
    min-width: 100%;
  }
}

/* Mobile: single column */
@media (max-width: 640px) {
  .product-section {
    padding: 100px 0 60px;
  }

  .container {
    padding: 0 16px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .gallery-col {
    position: static;
  }

  .main-image-container {
    max-width: 280px;
    margin: 0 auto;
  }

  .thumbnail-row {
    justify-content: center;
  }

  .thumb-item {
    width: 52px;
    height: 52px;
  }

  .product-title {
    font-size: 1.125rem;
  }

  .product-price {
    font-size: 1.25rem;
  }

  .variant-buttons {
    gap: 5px;
  }

  .variant-btn {
    padding: 6px 10px;
    font-size: 0.625rem;
  }

  .order-panel {
    flex-direction: column;
    gap: 12px;
    padding: 14px;
  }

  .tabs-header {
    gap: 18px;
  }

  .tab-btn {
    font-size: 0.75rem;
  }

  .desc-text {
    font-size: 0.8125rem;
  }

  .detail-list li {
    font-size: 0.75rem;
  }
}
</style>
