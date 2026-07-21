<template>
  <section class="video-section section" ref="sectionRef">
    <div class="container">
      <h2 class="section-title"></h2>
      <div class="video-wrapper" ref="wrapperRef">
        <div class="video-container" ref="videoContainerRef">
          <div class="video-glow"></div>
          <iframe
            :src="videoSrc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    default: 'h-t-hTtHjY4'
  }
})

const sectionRef = ref(null)
const wrapperRef = ref(null)
const videoContainerRef = ref(null)

const videoSrc = computed(() =>
  `https://www.youtube.com/embed/${props.videoId}?autoplay=1&rel=0&mute=1&loop=1&playlist=${props.videoId}`
)

// Track scroll state
let rafId = null
let lastScrollY = 0
let hasBeenCentered = false

function handleScroll() {
  if (rafId) return
  rafId = window.requestAnimationFrame(() => {
    updateScale()
    rafId = null
  })
}

function updateScale() {
  if (!sectionRef.value || !videoContainerRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const windowH = window.innerHeight
  const windowCenter = windowH / 2
  const sectionCenter = rect.top + rect.height / 2
  const currentScrollY = window.scrollY
  const scrollingDown = currentScrollY > lastScrollY
  lastScrollY = currentScrollY

  // Distance of section center from viewport center (negative = above, positive = below)
  const distFromCenter = sectionCenter - windowCenter

  if (scrollingDown) {
    // === SCROLLING DOWN ===
    if (distFromCenter <= 0) {
      // Section center is at or above viewport center → we've scrolled into it
      hasBeenCentered = true
    }
    // Once centered, stay big even if we scroll past
    if (hasBeenCentered) {
      videoContainerRef.value.style.transform = 'scale(1.25)'
    } else {
      // Approaching: scale based on proximity (0 = far below, 1 = at center)
      const progress = Math.max(0, Math.min(1, 1 - distFromCenter / windowH))
      const scale = 1.0 + progress * 0.25
      videoContainerRef.value.style.transform = `scale(${scale})`
    }
  } else {
    // === SCROLLING UP ===
    if (distFromCenter > windowH * 0.3) {
      // Section center is well below viewport → we've scrolled back above it → shrink
      hasBeenCentered = false
      const progress = Math.max(0, Math.min(1, 1 - distFromCenter / windowH))
      const scale = 1.0 + progress * 0.25
      videoContainerRef.value.style.transform = `scale(${scale})`
    } else if (hasBeenCentered) {
      // Still in or near viewport while scrolling up → keep big
      videoContainerRef.value.style.transform = 'scale(1.25)'
    } else {
      // Never been centered while scrolling up → small
      videoContainerRef.value.style.transform = 'scale(1.0)'
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateScale()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.video-section {
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
}

.video-wrapper {
  max-width: 960px;
  margin: 0 auto;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.06);
  transform: scale(1);
  transform-origin: center center;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  margin-top: 0px;
}

.video-glow {
  position: absolute;
  inset: -30px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(200, 164, 76, 0.06), transparent 70%);
  z-index: 0;
  pointer-events: none;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: 1;
}

@media (max-width: 768px) {
  .video-wrapper {
    max-width: 100%;
  }

  .video-container {
    border-radius: 8px;
    transform-origin: center top;
  }

  .video-section {
    padding: var(--space-2xl) 0;
  }
}
</style>
