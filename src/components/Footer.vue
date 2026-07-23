<template>
  <footer class="site-footer">
    <div class="footer-content">
      <span class="promoted-by">{{ t('footer.promoted_by') }}</span>
      <div class="logo-container">
        <img src="/images/logo-warriors-white.png" alt="Warriors" class="footer-logo" />
      </div>
      <span class="copyright">{{ t('footer.copyright') }}</span>
    </div>
  </footer>
</template>

<script setup>
import { t } from '../store/langState.js'
</script>

<style scoped>
.site-footer {
  background-color: rgba(13, 13, 13, 0.97);
  backdrop-filter: blur(14px);
  padding: 48px 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.promoted-by {
  font-family: var(--font-heading);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #ffffff;
  text-transform: capitalize;
  opacity: 0.8;
}

.logo-container {
  margin: 4px 0;
}

.footer-logo {
  max-width: 130px;
  height: auto;
  display: block;
  opacity: 0.9;
}

.copyright {
  font-family: var(--font-heading);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
  opacity: 0.6;
  margin-top: 4px;
}
</style>
