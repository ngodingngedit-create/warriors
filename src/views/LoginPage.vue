<template>
  <div class="login-page">
    <!-- Left side - Branding -->
    <div class="login-branding">
      <router-link to="/" class="login-page-logo">
        <img src="/images/logo-warriors-white.png" alt="Warriors" />
      </router-link>
      <p class="login-page-tagline"></p>
    </div>

    <!-- Right side - Card -->
    <div class="login-card-wrapper">
      <!-- Tabs -->
      <div class="auth-tabs">
        <button
          class="auth-tab"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
        >{{ t('login.title') }}</button>
        <button
          class="auth-tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >{{ langState.current === 'en' ? 'Register' : 'Daftar' }}</button>
        <div class="auth-tab-indicator" :style="tabIndicatorStyle"></div>
      </div>

        <!-- Login Form -->
      <div v-show="activeTab === 'login'" class="auth-form">
        <div v-if="alertMessage" class="form-alert" @click="alertMessage = ''">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {{ alertMessage }}
        </div>
        <div class="form-group">
          <label for="login-email">{{ t('login.email') }}</label>
          <input
            id="login-email"
            v-model="loginForm.email"
            type="email"
            placeholder="nama@email.com"
            class="form-input"
            autocomplete="email"
          />
        </div>
        <button class="btn-submit" @click="handleLogin" :disabled="loginLoading">
          <span v-if="loginLoading" class="btn-loader"></span>
          <span v-else>{{ t('login.submit') }}</span>
        </button>
      </div>

      <!-- Register Form -->
      <div v-show="activeTab === 'register'" class="auth-form auth-form-compact">
        <div v-if="alertMessage" class="form-alert" @click="alertMessage = ''">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          {{ alertMessage }}
        </div>
        <div class="form-group">
          <label for="reg-name">Nama Lengkap</label>
          <input
            id="reg-name"
            v-model="registerForm.name"
            type="text"
            placeholder="Nama Anda"
            class="form-input"
            autocomplete="name"
          />
        </div>
        <div class="form-group">
          <label for="reg-email">Email</label>
          <input
            id="reg-email"
            v-model="registerForm.email"
            type="email"
            placeholder="nama@email.com"
            class="form-input"
            autocomplete="email"
          />
        </div>
        <button class="btn-submit" @click="handleRegister" :disabled="registerLoading">
          <span v-if="registerLoading" class="btn-loader"></span>
          <span v-else>Buat Akun</span>
        </button>
      </div>

      <!-- Footer -->
      <div class="login-footer">
        <p v-if="activeTab === 'login'">
          Belum punya akun? <button class="link-btn" @click="activeTab = 'register'">Daftar sekarang</button>
        </p>
        <p v-else>
          Sudah punya akun? <button class="link-btn" @click="activeTab = 'login'">Masuk</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login as setLoggedIn } from '../stores/auth.js'
import { langState, t } from '../store/langState.js'

const router = useRouter()

const activeTab = ref('login')
const alertMessage = ref('')
const loginLoading = ref(false)
const registerLoading = ref(false)

const clearAlert = () => {
  alertMessage.value = ''
}

const loginForm = reactive({
  email: ''
})

const registerForm = reactive({
  name: '',
  email: ''
})

const tabIndicatorStyle = computed(() => {
  const index = activeTab.value === 'login' ? 0 : 1
  return {
    transform: `translateX(${index * 100}%)`
  }
})

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleLogin = () => {
  if (!loginForm.email) {
    alertMessage.value = 'Silakan masukkan email'
    return
  }
  if (!validateEmail(loginForm.email)) {
    alertMessage.value = 'Format email tidak valid'
    return
  }
  loginLoading.value = true
  // Simulate API call
  setTimeout(() => {
    loginLoading.value = false
    setLoggedIn()
    alert('Login berhasil!')
    router.push('/')
  }, 1200)
}

const handleRegister = () => {
  if (!registerForm.name || !registerForm.email) {
    alertMessage.value = 'Silakan isi nama lengkap dan email'
    return
  }
  if (!validateEmail(registerForm.email)) {
    alertMessage.value = 'Format email tidak valid'
    return
  }
  registerLoading.value = true
  // Simulate API call
  setTimeout(() => {
    registerLoading.value = false
    setLoggedIn()
    alert('Pendaftaran berhasil!')
    router.push('/')
  }, 1200)
}

const handleSocialLogin = (provider) => {
  alert(`Login dengan ${provider} (dalam pengembangan)`)
}

const handleForgotPassword = () => {
  alert('Fitur lupa password (dalam pengembangan)')
}

const handleTerms = () => {
  alert('Syarat & ketentuan (dalam pengembangan)')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #0a0a0a;
  position: relative;
  padding: 0;
}

/* Left Branding */
.login-branding {
  position: absolute;
  left: 140px;
  top: 50%;
  transform: translateY(-50%);
  max-width: 400px;
}

.login-page-logo {
  display: inline-block;
}

.login-page-logo img {
  height: 140px;
  width: auto;
  filter: brightness(10);
}

.login-page-tagline {
  margin: 16px 0 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
  font-family: var(--font-body, 'Open Sans', sans-serif);
}

/* Right Card */
.login-card-wrapper {
  width: 100%;
  max-width: 340px;
  background: #111111;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 28px 24px;
  margin-right: 250px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Auth Tabs */
.auth-tabs {
  display: flex;
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 3px;
  margin-bottom: 20px;
}

.auth-tab {
  flex: 1;
  padding: 9px 12px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 7px;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.auth-tab.active {
  color: #111111;
}

.auth-tab-indicator {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(50% - 3px);
  height: calc(100% - 6px);
  background: #ffffff;
  border-radius: 7px;
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 0;
}

/* Forms */
.auth-form {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Form Alert */
.form-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 8px;
  color: #ef4444;
  font-family: var(--font-body, 'Open Sans', sans-serif);
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 14px;
  cursor: pointer;
  animation: alertFadeIn 0.25s ease;
}

.form-alert svg {
  flex-shrink: 0;
  color: #ef4444;
}

@keyframes alertFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  color: #ffffff;
  font-family: var(--font-body, 'Open Sans', sans-serif);
  font-size: 0.8125rem;
  outline: none;
  transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.15);
}

.form-input:focus {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.04);
}

.form-input:user-invalid {
  border-color: #ef4444;
}

/* Submit Button */
.btn-submit {
  width: 100%;
  padding: 12px;
  background: #ffffff;
  border: none;
  border-radius: 8px;
  color: #111111;
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.85);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.08);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

/* Loader */
.btn-loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(17, 17, 17, 0.2);
  border-top-color: #111111;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Footer */
.login-footer {
  text-align: center;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.login-footer p {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
  font-family: var(--font-body, 'Open Sans', sans-serif);
}

.link-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-family: var(--font-body, 'Open Sans', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}

.link-btn:hover {
  opacity: 0.7;
}

/* Compact Register */
.auth-form-compact .form-group {
  margin-bottom: 8px;
}

.auth-form-compact .btn-submit {
  padding: 10px;
  font-size: 0.8125rem;
}

/* Responsive */
@media (max-width: 900px) {
  .login-page {
    justify-content: center;
    padding: 80px 16px 40px;
  }

  .login-branding {
    display: none;
  }

  .login-card-wrapper {
    margin-right: 0;
    max-width: 340px;
  }
}

@media (max-width: 480px) {
  .login-card-wrapper {
    padding: 22px 18px;
  }

  .form-input {
    padding: 10px 11px;
  }

  .btn-submit {
    padding: 11px;
  }
}

@media (max-width: 360px) {
  .login-card-wrapper {
    padding: 18px 14px;
  }
}
</style>
