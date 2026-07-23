<template>
  <div class="tour-card">
    <div class="card-media-wrapper">
      <div v-if="tour.badge" class="card-badge" :class="{ 'card-badge--sold-out': tour.badge === 'Sold Out' }">
        {{ tour.badge }}
      </div>
      <div class="poster-inner">
        <router-link :to="computedLink" class="tour-card-image">
          <img :src="tour.image" :alt="stripBr(tour.title)" loading="lazy" />
          <div class="card-shine"></div>
        </router-link>
      </div>
    </div>
    <div class="card-body">
      <router-link :to="computedLink" class="title-link">
        <h3 v-html="formattedTitle(tour.title)" :title="stripBr(tour.title)"></h3>
      </router-link>
      <div class="card-date">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span v-html="tour.date"></span>
      </div>
      <div class="card-divider"></div>
      <div class="card-creator">
        <div class="creator-avatar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <span class="creator-name" v-html="tour.creator"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tour: {
    type: Object,
    required: true,
  }
})

const computedLink = computed(() => {
  if (props.tour.link === '/tours' && props.tour.id) {
    return `/tours/${props.tour.id}`
  }
  return props.tour.link || '/tours'
})

const formattedTitle = (title) => {
  if (!title) return ''
  return title.replace(/<br\s*\/?>/gi, ' ')
}

const stripBr = (title) => {
  if (!title) return ''
  return title.replace(/<[^>]*>/g, '')
}
</script>

<style scoped>
.tour-card {
  position: relative;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/* Media wrapper - scales together (both poster image + ribbon badge scale on hover) */
.card-media-wrapper {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  overflow: visible;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Poster inner container with 16:9 aspect ratio and rounded corners */
.poster-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  height: 0;
  padding-bottom: 56.25%; /* Fallback 16:9 ratio */
  overflow: hidden;
  border-radius: 12px;
  background: #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Hover effect: entire wrapper (poster + ribbon badge) scales up smoothly + shadow */
.tour-card:hover .card-media-wrapper {
  transform: scale(1.03);
}

.tour-card:hover .poster-inner {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
}

/* Ribbon Badge - Overhanging left edge with 3D wrap fold */
.card-badge {
  position: absolute;
  top: 12px;
  left: -6px;
  z-index: 5;
  background: #171717;
  color: #ffffff;
  padding: 5px 14px 5px 12px;
  border-radius: 0 100px 100px 0;
  font-family: var(--font-heading, sans-serif);
  font-weight: 700;
  font-size: 0.6875rem;
  line-height: 1.2;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.25);
  pointer-events: none;
}

.card-badge::after {
  content: '';
  position: absolute;
  left: 0;
  top: 100%;
  width: 6px;
  height: 6px;
  background-color: #000000;
  clip-path: polygon(100% 0, 0 0, 100% 100%);
}

.card-badge--sold-out {
  background: #dc2626 !important;
}

.card-badge--sold-out::after {
  background-color: #b91c1c !important;
}

.tour-card-image {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.tour-card-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block;
}

/* Light shine */
.card-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    105deg,
    transparent 15%,
    rgba(255, 255, 255, 0.4) 35%,
    rgba(255, 255, 255, 0.7) 45%,
    rgba(255, 255, 255, 0.4) 55%,
    transparent 85%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.6s ease, background-position 1s cubic-bezier(0.23, 1, 0.32, 1);
}

.tour-card:hover .card-shine {
  opacity: 1;
  background-position: -100% 0;
}

/* Body */
.card-body {
  padding: 12px 0 0 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-body h3 {
  font-family: var(--font-heading, sans-serif);
  font-size: 1.05rem;
  line-height: 1.35;
  margin-top: 0;
  margin-bottom: 8px;
  font-weight: 700;
  color: #000000;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 1.35em;

  transition: color 0.2s ease;
}

.tour-card:hover .card-body h3 {
  color: #333333;
}

.card-date {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.card-date svg {
  flex-shrink: 0;
  color: #111111;
}

.card-date span {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.875rem;
  font-weight: 600;
  color: #222222;
}

/* Dotted Divider */
.card-divider {
  height: 0;
  border-top: 1px dotted rgba(0, 0, 0, 0.18);
  margin: 10px 0 12px 0;
  margin-top: auto;
}

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
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #111111;
  flex-shrink: 0;
}

.creator-name {
  font-family: var(--font-heading, sans-serif);
  font-size: 0.875rem;
  font-weight: 700;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
