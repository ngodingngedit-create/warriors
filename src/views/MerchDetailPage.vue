<template>
  <div class="merch-detail-page">
    <div class="product-section">
      <div class="container">
        <div class="product-grid">

          <!-- ===== LEFT: Gallery ===== -->
          <div class="gallery-col">
            <div class="main-image-container">
              <img :src="images[activeImage]" :alt="product.title" class="main-image" loading="lazy" />
            </div>
            <div class="thumbnail-row">
              <button class="thumb-arrow" @click="prevThumb" :disabled="thumbOffset === 0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div class="thumb-viewport">
                <div class="thumb-list" :style="{ transform: `translateX(-${thumbOffset * 64}px)` }">
                  <button
                    v-for="(img, idx) in images"
                    :key="idx"
                    class="thumb-item"
                    :class="{ active: idx === activeImage }"
                    @click="activeImage = idx"
                  >
                    <img :src="img" :alt="`Thumbnail ${idx + 1}`" loading="lazy" />
                  </button>
                </div>
              </div>
              <button class="thumb-arrow" @click="nextThumb" :disabled="thumbOffset >= images.length - 4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <!-- ===== CENTER: Info + Tabs ===== -->
          <div class="info-col">
            <div class="product-info">
              <h1 class="product-title">{{ product.title }}</h1>
              <div class="sold-text">{{ langState.current === 'en' ? `${product.sold} pcs sold` : `Terjual ${product.sold} pcs` }}</div>
              <div class="product-price">{{ formatPrice(product.price) }}</div>
            </div>

            <div class="seller-card">
              <div class="seller-avatar"><span>M</span></div>
              <div class="seller-info">
                <div class="seller-name-row">
                  <span class="seller-name">{{ product.creator || 'Warriors Merch' }}</span>
                  <svg class="verified-badge" width="16" height="16" viewBox="0 0 24 24" fill="#1DA1F2" stroke="none">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                  </svg>
                </div>
                <div class="seller-location">Jakarta</div>
              </div>
            </div>

            <!-- Variant Selector -->
            <div class="variant-section">
              <div class="variant-label">{{ langState.current === 'en' ? 'Select Size / Edition' : 'Pilih Ukuran / Edisi' }} : <strong>{{ selectedVariant }}</strong></div>
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

            <!-- Description & Review Tabs -->
            <div class="tabs-section">
              <div class="tabs-header">
                <button class="tab-btn" :class="{ active: activeTab === 'deskripsi' }" @click="activeTab = 'deskripsi'">{{ langState.current === 'en' ? 'Product Description' : 'Deskripsi Produk' }}</button>
                <button class="tab-btn" :class="{ active: activeTab === 'ulasan' }" @click="activeTab = 'ulasan'">{{ langState.current === 'en' ? `Reviews (${product.reviews})` : `Ulasan (${product.reviews})` }}</button>
              </div>
              <div class="tabs-content">
                <div v-if="activeTab === 'deskripsi'" class="tab-panel">
                  <p class="desc-text">{{ product.description }}</p>
                  <h4 class="detail-heading">{{ langState.current === 'en' ? 'Specification Details :' : 'Detail Spesifikasi :' }}</h4>
                  <ul class="detail-list">
                    <li v-for="(item, idx) in product.details" :key="idx">{{ item }}</li>
                  </ul>
                </div>
                <div v-else class="tab-panel">
                  <p class="empty-text">{{ langState.current === 'en' ? 'No reviews for this product yet.' : 'Belum ada ulasan untuk produk ini.' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- ===== RIGHT: Order Panel ===== -->
          <div class="order-col">
            <div class="order-panel">
              <div class="qty-section">
                <div class="qty-header">
                  <span class="qty-label">{{ t('cart.quantity') }}</span>
                  <span class="stock-text">{{ langState.current === 'en' ? `Stock ${product.stock}` : `Stok ${product.stock}` }}</span>
                </div>
                <div class="qty-controls">
                  <button class="qty-btn" @click="quantity > 1 && quantity--" :disabled="quantity <= 1">−</button>
                  <span class="qty-value">{{ quantity }}</span>
                  <button class="qty-btn" @click="quantity < product.stock && quantity++" :disabled="quantity >= product.stock">+</button>
                </div>
              </div>

              <div class="subtotal-section">
                <span class="subtotal-label">Subtotal</span>
                <span class="subtotal-price">{{ formatPrice(product.price * quantity) }}</span>
              </div>

              <div class="order-actions">
                <button class="btn-add-cart" @click="handleAddToCart">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  {{ t('common.add_to_cart') }}
                </button>
                <button class="btn-buy-now" @click="handleBuyNow">{{ t('common.buy_now') }}</button>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { cartState } from '../store/cartState.js'
import Footer from '../components/Footer.vue'
import { langState, t } from '../store/langState.js'

const route = useRoute()

const activeImage = ref(0)
const thumbOffset = ref(0)
const activeTab = ref('deskripsi')
const quantity = ref(1)
const selectedVariant = ref('L')

const variants = ['S', 'M', 'L', 'XL', 'XXL']

const product = computed(() => {
  const isEn = langState.current === 'en'
  const paramId = parseInt(route.params.id) || 201
  return {
    id: paramId,
    title: 'Official Heavy Cotton Band Merch T-Shirt',
    price: 350000,
    sold: 142,
    stock: 25,
    reviews: 18,
    creator: 'Warriors Official',
    coverImage: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    description: isEn
      ? 'Official band merch t-shirt crafted from 100% Premium Heavyweight Cotton 24s. Long-lasting plastisol screen print with high precision detail, extremely comfortable for concert and daily wear.'
      : 'Merchandise t-shirt resmi dibuat dari bahan 100% Premium Heavyweight Cotton 24s. Cetakan sablon plastisol tahan lama dengan detail presisi tinggi, sangat nyaman digunakan untuk acara konser maupun harian.',
    details: isEn
      ? [
          'Material : 100% High Quality 24s Heavy Cotton',
          'Screenprint : Premium High-Density Plastisol Ink',
          'Fit : Regular Fit European Sizing',
          'Stitching : Double Needle Stitching & Chain Taped Neck'
        ]
      : [
          'Bahan: 100% Heavy Cotton 24s High Quality',
          'Sablon: Premium High-Density Plastisol Ink',
          'Fit: Regular Fit European Sizing',
          'Jahitan: Double Needle Stitching & Rantai Leher'
        ]
  }
})

const images = computed(() => [
  product.value.coverImage,
  'https://mad-tourbooking.de/media/Nasty-2025_Instagram_Square-900x900.jpg',
  'https://mad-tourbooking.de/media/Barcode-2026-line-up-900x473.png',
  'https://mad-tourbooking.de/media/CruelHand_01-scaled-e1729698291310-900x706.jpg'
])

const prevThumb = () => { if (thumbOffset.value > 0) thumbOffset.value-- }
const nextThumb = () => { if (thumbOffset.value < images.value.length - 4) thumbOffset.value++ }

const formatPrice = (price) => {
  if (!price) return langState.current === 'en' ? 'Free' : 'Gratis'
  return new Intl.NumberFormat(langState.current === 'en' ? 'en-US' : 'id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const handleAddToCart = () => {
  cartState.addItem(product.value, quantity.value)
}

const handleBuyNow = () => {
  cartState.addItem(product.value, quantity.value)
  cartState.isOpen = true
}
</script>

<style scoped>
.merch-detail-page {
  padding-top: 80px;
  background: #ffffff;
  min-height: 100vh;
}

.product-section {
  padding: 40px 0 80px;
}

.product-grid {
  display: grid;
  grid-template-columns: 380px 1fr 320px;
  gap: 32px;
  align-items: start;
}

/* Gallery Column */
.main-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.thumb-viewport {
  overflow: hidden;
  width: 256px;
}

.thumb-list {
  display: flex;
  gap: 8px;
  transition: transform 0.3s ease;
}

.thumb-item {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid transparent;
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.thumb-item.active {
  border-color: #171717;
}

.thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-arrow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Info Column */
.product-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.6rem;
  font-weight: 800;
  color: #171717;
  margin-bottom: 8px;
}

.sold-text {
  font-size: 0.875rem;
  color: #777777;
  margin-bottom: 12px;
}

.product-price {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.8rem;
  font-weight: 900;
  color: #171717;
  margin-bottom: 24px;
}

.seller-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #f8f8f8;
  border-radius: 10px;
  margin-bottom: 24px;
}

.seller-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #171717;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.seller-name {
  font-weight: 700;
  font-size: 0.9375rem;
}

.seller-location {
  font-size: 0.8125rem;
  color: #777777;
}

.variant-section {
  margin-bottom: 28px;
}

.variant-label {
  font-size: 0.9375rem;
  margin-bottom: 10px;
}

.variant-buttons {
  display: flex;
  gap: 8px;
}

.variant-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  background: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.variant-btn.active {
  border-color: #171717;
  background: #171717;
  color: #ffffff;
}

/* Tabs Section */
.tabs-header {
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 16px;
}

.tab-btn {
  padding: 12px 0;
  border: none;
  background: transparent;
  font-weight: 700;
  color: #777777;
  cursor: pointer;
  position: relative;
}

.tab-btn.active {
  color: #171717;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #171717;
}

.desc-text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #444444;
  margin-bottom: 16px;
}

.detail-heading {
  font-size: 0.9375rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.detail-list {
  padding-left: 20px;
  font-size: 0.875rem;
  color: #555555;
  line-height: 1.8;
}

/* Right Order Panel */
.order-panel {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.qty-section {
  margin-bottom: 20px;
}

.qty-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 10px;
}

.stock-text {
  color: #777777;
}

.qty-controls {
  display: flex;
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  width: fit-content;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
}

.qty-value {
  width: 40px;
  text-align: center;
  font-weight: 700;
}

.subtotal-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.subtotal-price {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.25rem;
  font-weight: 900;
}

.order-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-add-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #171717;
  background: #ffffff;
  color: #171717;
  font-family: var(--font-heading, sans-serif);
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-add-cart:hover {
  background: #171717;
  color: #ffffff;
}

.btn-buy-now {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-family: var(--font-heading, sans-serif);
  font-weight: 800;
  cursor: pointer;
}

.btn-buy-now:hover {
  background: #1d4ed8;
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .merch-detail-page {
    padding-top: 64px;
  }

  .product-section {
    padding: 20px 0 48px;
  }

  .product-title {
    font-size: 1.25rem;
  }

  .product-price {
    font-size: 1.4rem;
    margin-bottom: 16px;
  }

  .variant-btn {
    padding: 6px 12px;
    font-size: 0.78rem;
  }

  .tab-btn {
    font-size: 0.8125rem;
  }

  .btn-add-cart,
  .btn-buy-now {
    padding: 10px 14px;
    font-size: 0.85rem;
  }

  .subtotal-price {
    font-size: 1.05rem;
  }
}
</style>
