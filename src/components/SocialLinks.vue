<template>
  <div class="social-links" :class="[direction, colorScheme]">
    <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer"
       class="social-icon" :title="social.name">
      <svg v-if="social.name === 'Instagram'" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
        <path d="M16 3C8.83 3 3 8.83 3 16v18c0 7.17 5.83 13 13 13h18c7.17 0 13-5.83 13-13V16c0-7.17-5.83-13-13-13H16zm21 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM25 14c6.07 0 11 4.93 11 11s-4.93 11-11 11-11-4.93-11-11 4.93-11 11-11zm0 2c-5.04 0-9 3.96-9 9s3.96 9 9 9 9-3.96 9-9-3.96-9-9-9z"/>
      </svg>
      <svg v-else-if="social.name === 'Facebook'" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
        <path d="M32 11h5c.552 0 1-.448 1-1V3.263c0-.524-.403-.96-.925-.997C35.484 2.153 32.376 2 30.141 2 24 2 20 5.68 20 12.368V19h-7c-.552 0-1 .448-1 1v7c0 .552.448 1 1 1h7v19c0 .552.448 1 1 1h7c.552 0 1-.448 1-1V28h7.222c.51 0 .938-.383.994-.89l.778-7C38.06 19.518 37.596 19 37 19h-8v-5C29 12.343 30.343 11 32 11z"/>
      </svg>
      <svg v-else-if="social.name === 'Twitter / X'" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
        <path d="m28.348 22.307 13.091-14.901h-3.101L26.967 20.342l-9.076-12.936H7.421l13.727 19.563L7.421 42.594h3.101l12.001-13.664 9.587 13.664h10.47L28.853 22.307l-.505-.6zM17.42 9.534h3.383l22.463 31.152H39.88L17.42 9.534z"/>
      </svg>
      <svg v-else-if="social.name === 'Spotify'" width="20" height="20" viewBox="0 0 50 50" fill="currentColor">
        <path d="M25.009 1.982C12.322 1.982 2 12.304 2 24.991S12.322 48 25.009 48s23.009-10.321 23.009-23.009S37.696 1.982 25.009 1.982zm9.739 33.351c-.289.434-.765.668-1.25.668-.286 0-.575-.081-.831-.252-2.474-1.649-6.668-2.749-10.168-2.748-3.714.002-6.498.914-6.526.923-.784.266-1.635-.162-1.897-.948s.163-1.636.949-1.897c.132-.044 3.279-1.075 7.474-1.077 3.499-.002 8.367.944 11.831 3.253.69.46.876 1.391.416 2.08zm2.992-6.14c-.325.522-.886.809-1.459.809-.31 0-.624-.083-.906-.26-4.484-2.794-9.092-3.385-13.062-3.35-4.482.04-8.066.895-8.127.913-.907.258-1.861-.272-2.12-1.183-.259-.913.272-1.862 1.184-2.12.277-.079 3.854-.959 8.751-1 4.465-.037 10.029.61 15.191 3.826.674.414.921 1.474.419 2.279zm2.985-7.18c-.373.634-1.041.987-1.727.987-.344 0-.692-.089-1.011-.275-5.226-3.068-11.58-3.719-15.99-3.725-.021 0-.042 0-.063 0-5.333 0-9.44.938-9.481.948-1.078.247-2.151-.419-2.401-1.495-.25-1.075.417-2.149 1.492-2.4C11.729 16.01 16.117 15 21.934 15c.023 0 .046 0 .069 0 4.905.007 12.011.753 18.01 4.275.862.56 1.181 1.786.622 2.738z"/>
      </svg>
      <svg v-else-if="social.name === 'Email'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      <span v-else class="icon-fallback">{{ social.name[0] }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  direction: { type: String, default: 'horizontal' },
  colorScheme: { type: String, default: 'light' }
})

const socials = computed(() => [
  { name: 'Instagram', url: 'https://www.instagram.com/madtourbooking' },
  { name: 'Facebook', url: 'https://www.facebook.com/madtourbooking' },
  { name: 'Twitter / X', url: 'https://www.twitter.com/madtourbooking' },
  { name: 'Spotify', url: 'https://open.spotify.com/playlist/2a4ofleum528wvv1Qn7Ws9' },
  { name: 'Email', url: 'mailto:info@mad-tourbooking.de' },
])
</script>

<style scoped>
.social-links {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.social-links.vertical {
  flex-direction: column;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
}

.social-links.dark .social-icon {
  color: var(--color-text-light);
  background: rgba(23, 23, 23, 0.06);
}

.social-icon:hover {
  color: var(--color-white);
  background: var(--color-accent);
  transform: translateY(-2px);
}

.social-links.dark .social-icon:hover {
  color: var(--color-white);
  background: var(--color-accent);
}

.icon-fallback {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
}

@media (max-width: 480px) {
  .social-links {
    gap: 8px;
  }

  .social-icon {
    width: 32px;
    height: 32px;
  }

  .social-icon svg {
    width: 16px;
    height: 16px;
  }
}
</style>
