<template>
  <div class="vinyl-card">
    <div class="card-media-wrapper">
      <router-link :to="`/vinyl/${vinyl.id}`" class="card-image">
        <div class="vinyl-layers">
          <!-- Vinyl record behind (second image) -->
          <img class="vinyl-record-img" :src="vinyl.vinylImage" alt="" loading="lazy" />
          <!-- Cover on top (first image) -->
          <img class="vinyl-cover-img" :src="vinyl.coverImage" :alt="vinyl.title" loading="lazy" />
        </div>
        <div class="card-shine"></div>
      </router-link>
    </div>

    <div class="card-body">
      <h3 v-html="vinyl.title"></h3>
      <div class="card-price">{{ formatPrice(vinyl.price) }}</div>
      <div class="card-divider"></div>
      <div class="card-creator">
        <div class="creator-avatar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <span class="creator-name">{{ vinyl.creator }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  vinyl: {
    type: Object,
    required: true,
  }
})

const formatPrice = (price) => {
  if (price === 0 || !price) return 'Gratis'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}
</script>

<style scoped>
.vinyl-card {
  position: relative;
  background: transparent;
  isolation: isolate;
}

/* Media wrapper that scales on hover */
.card-media-wrapper {
  position: relative;
  width: 100%;
  transition: transform 0.3s ease;
  z-index: 1;
}

.vinyl-card:hover .card-media-wrapper {
  transform: scale(1.02);
}

/* Light shine slide effect */
.card-shine {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(
    105deg,
    transparent 15%,
    rgba(255, 255, 255, 0.4) 35%,
    rgba(255, 255, 255, 0.8) 45%,
    rgba(255, 255, 255, 0.4) 55%,
    transparent 85%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.6s ease, background-position 1s ease;
}

.vinyl-card:hover .card-shine {
  opacity: 1;
  background-position: -100% 0;
}

/* Image Wrapper - square */
.card-image {
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 1/1;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.vinyl-card:hover .card-image {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Vinyl Layers */
.vinyl-layers {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Record image behind (second image) */
.vinyl-record-img {
  position: absolute;
  inset: 10%;
  width: 80%;
  height: 80%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* Cover image on top (first image) */
.vinyl-cover-img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;
}

/* On hover: cover fades out, record fades in */
.vinyl-card:hover .vinyl-cover-img {
  opacity: 0;
}

.vinyl-card:hover .vinyl-record-img {
  opacity: 1;
}

/* Card Body */
.card-body {
  padding: 12px 0px 8px 8px;
  background: transparent;
}

.card-body h3 {
  font-size: 0.9375rem;
  line-height: 1.3;
  margin-bottom: 6px;
  font-weight: 700;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Price */
.card-price {
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
}

/* Divider */
.card-divider {
  height: 1px;
  border-top: 1px dashed rgba(0, 0, 0, 0.08);
  background: transparent;
  margin: 12px 0 10px;
}

/* Creator */
.card-creator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.creator-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  color: #000000;
  flex-shrink: 0;
}

.creator-name {
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 600;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
