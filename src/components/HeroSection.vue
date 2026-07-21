<template>
  <section class="hero-section">
    <div class="hero-bg" :style="{ backgroundImage: `url(${props.background})` }"></div>
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <div class="hero-badge" v-if="props.badge">{{ props.badge }}</div>
      <h1 class="hero-title" v-html="props.title"></h1>
      <p v-if="props.subtitle" class="hero-subtitle">{{ props.subtitle }}</p>
      <div v-if="props.buttons" class="hero-buttons">
        <router-link
          v-for="(btn, idx) in props.buttons"
          :key="idx"
          :to="btn.link"
          class="btn"
          :class="btn.variant || 'btn-primary'"
        >
          {{ btn.label }}
        </router-link>
      </div>
    </div>
    
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  background: { type: String, default: 'https://mad-tourbooking.de/media/slider-16-color.jpg' },
  buttons: { type: Array, default: null },
  badge: { type: String, default: '' },
  height: { type: String, default: '100vh' },
})
</script>

<style scoped>
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: 80px;
  overflow: hidden;
  width: 100%;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.85) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 120px 0 80px;
  max-width: 900px;
  width: 100%;
}

.hero-badge {
  display: inline-block;
  padding: 8px 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 2.5px;
  color: var(--color-white);
  margin-bottom: var(--space-xl);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  color: var(--color-white);
  line-height: 1.05;
  margin-bottom: var(--space-lg);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  letter-spacing: -1px;
}

.hero-subtitle {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.375rem);
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: var(--space-2xl);
  font-weight: 400;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}


@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 85vh;
    padding-top: 60px;
  }

  .hero-content {
    padding: 80px 0 60px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .hero-buttons .btn {
    width: 100%;
    max-width: 280px;
  }

 
}
</style>
