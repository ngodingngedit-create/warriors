<template>
  <div class="about-page">
    <HeroSection
      title="About Warriors"
      subtitle="Pioneers of hardcore punk & metal booking since 1990"
      badge="Since 1990"
      background="https://mad-tourbooking.de/media/slider-16-color.jpg"
    />

    <section class="section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">Our Story</h2>
            <p>M.A.D. Tourbooking has been at the forefront of hardcore punk and metal booking since 1990. With over three decades of experience, we have established ourselves as one of the most respected booking agencies in the underground music scene.</p>
            <p>Based in Berlin, Germany, we represent a diverse roster of artists spanning hardcore punk, metal, death metal, thrash, and everything in between. From legendary acts that have shaped the genre to exciting new bands carrying the torch forward, M.A.D. is proud to work with the best in the business.</p>
            <p>Our annual events including the Campaign For Musical Destruction Tour, Punk & Disorderly Fest, Hell On Earth Tour, and Persistence Tour have become legendary fixtures in the European touring calendar.</p>

            <h3 class="mt-3">What We Do</h3>
            <div class="services-grid">
              <div v-for="service in services" :key="service.title" class="service-card">
                <div class="service-icon">{{ service.icon }}</div>
                <h4>{{ service.title }}</h4>
                <p>{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section section-dark stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Get In Touch</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Contact Information</h3>
            <ul class="contact-list">
              <li>
                <strong>Email:</strong>
                <a href="mailto:info@mad-tourbooking.de">info@mad-tourbooking.de</a>
              </li>
              <li>
                <strong>Location:</strong>
                Berlin, Germany
              </li>
              <li>
                <strong>Social:</strong>
              </li>
            </ul>
            <SocialLinks direction="horizontal" colorScheme="dark" />
          </div>
          <div class="contact-form-wrapper">
            <h3>Send Us a Message</h3>
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-row">
                <input v-model="form.name" type="text" placeholder="Your Name" class="form-input" required />
              </div>
              <div class="form-row">
                <input v-model="form.email" type="email" placeholder="Your Email" class="form-input" required />
              </div>
              <div class="form-row">
                <textarea v-model="form.message" placeholder="Your Message" class="form-input form-textarea" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-gold btn-lg">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import SocialLinks from '../components/SocialLinks.vue'
import Footer from '../components/Footer.vue'

const services = [
  { icon: '🎵', title: 'Tour Booking', description: 'Full-service tour booking and management for hardcore punk and metal bands across Europe and worldwide.' },
  { icon: '🎪', title: 'Festival Organization', description: 'Production and management of legendary festivals including Punk & Disorderly Fest and our branded tours.' },
  { icon: '🤝', title: 'Artist Management', description: 'Comprehensive artist representation and career development for our diverse roster of talent.' },
  { icon: '📢', title: 'Promotion', description: 'Strategic promotion and marketing services to maximize exposure and attendance for every event.' },
]

const stats = [
  { number: '33+', label: 'Years of Experience' },
  { number: '1000+', label: 'Tours Organized' },
  { number: '50+', label: 'Artists Represented' },
  { number: '30+', label: 'Countries Reached' },
]

const form = ref({
  name: '',
  email: '',
  message: ''
})

function submitForm() {
  alert('Thank you for your message! We will get back to you soon.')
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.about-content {
  max-width: 900px;
  margin: 0 auto;
}

.about-text p {
  font-size: 1.0625rem;
  line-height: 1.8;
  margin-bottom: var(--space-lg);
  color: var(--color-text);
}

/* Services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.service-card {
  background: var(--color-white);
  padding: var(--space-xl);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2rem;
  margin-bottom: var(--space-md);
}

.service-card h4 {
  margin-bottom: var(--space-sm);
}

.service-card p {
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin: 0;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2xl);
  text-align: center;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-white);
  line-height: 1;
  margin-bottom: var(--space-sm);
}

.stat-label {
  font-family: var(--font-heading);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.6);
}

/* Contact */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  max-width: 960px;
  margin: 0 auto;
}

.contact-info h3,
.contact-form-wrapper h3 {
  margin-bottom: var(--space-lg);
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.contact-list li {
  font-size: 0.9375rem;
}

.contact-list strong {
  font-family: var(--font-heading);
  font-weight: 700;
  display: inline-block;
  min-width: 80px;
}

.contact-list a {
  color: var(--color-accent);
}

.contact-list a:hover {
  text-decoration: underline;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.form-row {
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-text);
  background: var(--color-white);
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  .stat-number {
    font-size: 2.25rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
