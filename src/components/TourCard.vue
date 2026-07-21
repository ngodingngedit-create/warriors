<template>
  <div class="tour-card">
    <!-- Media wrapper handles both the image and the ribbon badge to scale them together perfectly -->
    <div class="card-media-wrapper">
      <div v-if="tour.badge" class="card-badge">{{ tour.badge }}</div>

      <router-link :to="computedLink" class="card-image">
        <img :src="tour.image" :alt="stripBr(tour.title)" loading="lazy" />
        <!-- Light shine overlay placed inside the image wrapper for perfect masking -->
        <div class="card-shine"></div>
      </router-link>
    </div>

    <div class="card-body">
      <h3 v-html="formattedTitle(tour.title)"></h3>
      <div class="card-date">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

// Replace <br> tags with a space to keep title in a single line
const formattedTitle = (title) => {
  if (!title) return ''
  return title.replace(/<br\s*\/?>/gi, ' ')
}

// Strip HTML tags for alt attribute
const stripBr = (title) => {
  if (!title) return ''
  return title.replace(/<[^>]*>/g, '')
}
</script>

<style scoped>
.tour-card {
  position: relative;
  background: transparent;
  isolation: isolate;
}

/* Media wrapper that scales on hover as a single unit */
.card-media-wrapper {
  position: relative;
  width: 100%;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1;
}

.tour-card:hover .card-media-wrapper {
  transform: scale(1.025);
}

/* Light shine slide effect inside image container */
.card-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    105deg,
    transparent 15%,
    rgba(255, 255, 255, 0.55) 35%,
    rgba(255, 255, 255, 0.95) 45%,
    rgba(255, 255, 255, 0.55) 55%,
    transparent 85%
  );
  background-size: 200% 100%;
  background-position: 200% 0;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.8s ease, background-position 1.2s cubic-bezier(0.23, 1, 0.32, 1);
}

/* On hover, transition the shine to the opposite side */
.tour-card:hover .card-shine {
  opacity: 1;
  background-position: -100% 0;
}

/* Image Wrapper */
.card-image {
  display: block;
  position: relative;
  overflow: hidden;
  aspect-ratio: 12/5;
  border-radius: 8px;
  transition: box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tour-card:hover .card-image {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Ribbon Badge Shape (Folded Flag) */
.card-badge {
  position: absolute;
  top: 14px;
  left: -6px;
  background: var(--color-primary); /* #171717 */
  color: var(--color-white);
  padding: 4px 14px 4px 12px;
  border-radius: 0 100px 100px 0; /* Fully rounded on the right, flat on left */
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.6875rem;
  letter-spacing: 0.5px;
  z-index: 3;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
}

/* Ribbon Bottom Fold Triangle */
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

/* Date */
.card-date {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.card-date svg {
  flex-shrink: 0;
  color: #000000;
}

.card-date span {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 500;
  color: #828282;
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
