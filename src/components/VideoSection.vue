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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
  `https://www.youtube.com/embed/${props.videoId}?autoplay=1&mute=1&loop=1&controls=1&playsinline=1&playlist=${props.videoId}`
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

  // Fixed size on mobile screen (width <= 768px)
  if (window.innerWidth <= 768) {
    videoContainerRef.value.style.transform = 'none'
    return
  }

  const rect = sectionRef.value.getBoundingClientRect()
  const windowH = window.innerHeight
  const windowCenter = windowH / 2
  const sectionCenter = rect.top + rect.height / 2
  const currentScrollY = window.scrollY
  const scrollingDown = currentScrollY > lastScrollY
  lastScrollY = currentScrollY

  // Distance of section center from viewport center
  const distFromCenter = sectionCenter - windowCenter

  if (scrollingDown) {
    if (distFromCenter <= 0) {
      hasBeenCentered = true
    }
    if (hasBeenCentered) {
      videoContainerRef.value.style.transform = 'scale(1.25)'
    } else {
      const progress = Math.max(0, Math.min(1, 1 - distFromCenter / windowH))
      const scale = 1.0 + progress * 0.25
      videoContainerRef.value.style.transform = `scale(${scale})`
    }
  } else {
    if (distFromCenter > windowH * 0.3) {
      hasBeenCentered = false
      const progress = Math.max(0, Math.min(1, 1 - distFromCenter / windowH))
      const scale = 1.0 + progress * 0.25
      videoContainerRef.value.style.transform = `scale(${scale})`
    } else if (hasBeenCentered) {
      videoContainerRef.value.style.transform = 'scale(1.25)'
    } else {
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

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .video-section {
    padding: 24px 0 !important;
  }

  .video-wrapper {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding: 0 4px !important;
  }

  .video-container {
    border-radius: 4px !important;
    transform: none !important;
    transition: none !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15) !important;
  }

  .video-container iframe {
    border-radius: 4px !important;
  }
}
</style>
