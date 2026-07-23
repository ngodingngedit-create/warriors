<template>
  <div class="dates-page">
    <section class="section dates-section">
      <div class="container">
        <div class="dates-page-header">
          <h2 class="section-title">{{ t('dates.title') }}</h2>
        </div>

        <!-- Year Filter -->
        <div class="filter-bar">
          <button
            v-for="year in filterYears"
            :key="year"
            class="filter-btn"
            :class="{ active: activeYear === year }"
            @click="activeYear = year"
          >{{ year }}</button>
        </div>

        <div class="dates-table-wrapper">
          <table class="dates-table">
            <thead>
              <tr>
                <th>{{ t('dates.table_date') }}</th>
                <th>{{ t('common.location') }}</th>
                <th>{{ t('common.venue') }}</th>
                <th>Country</th>
                <th>{{ t('dates.table_action') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(date, idx) in filteredDates" :key="idx" class="date-row">
                <td class="date-cell">{{ date.date }}</td>
                <td class="city-cell">{{ date.city }}</td>
                <td class="venue-cell">{{ date.venue }}</td>
                <td class="country-cell">{{ date.country }}</td>
                <td class="ticket-cell">
                  <router-link v-if="date.tourId" :to="`/tours/${date.tourId}`" class="btn btn-gold btn-sm">{{ t('common.buy_tickets') }}</router-link>
                  <span v-else class="no-tickets">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    {{ t('card.sold_out') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Footer from '../components/Footer.vue'
import { t } from '../store/langState.js'

const allDates = [
  { date: '05.08.2026', city: 'Birmingham', venue: 'The Flapper', country: 'United Kingdom', tourId: 1 },
  { date: '08.08.2026', city: 'Leisnig', venue: 'AJZ Leisnig', country: 'Germany', tourId: 1 },
  { date: '09.08.2026', city: 'Kassel', venue: 'Goldgrube', country: 'Germany', tourId: 1 },
  { date: '10.08.2026', city: 'Düsseldorf', venue: 'Pitcher', country: 'Germany', tourId: null },
  { date: '12.08.2026', city: 'Wiener Neustadt', venue: 'Jugend- und Kulturhaus TRIEBWERK', country: 'Austria', tourId: 2 },
  { date: '13.08.2026', city: 'Tolmin', venue: 'Punk Rock Holiday', country: 'Slovenia', tourId: 2 },
  { date: '14.08.2026', city: 'Attnang-Puchheim', venue: 'RAWS Diner', country: 'Austria', tourId: 2 },
  { date: '15.08.2026', city: 'München', venue: 'Lehel X-Bar', country: 'Germany', tourId: null },
  { date: '14.08.2026', city: 'Taarstedt', venue: 'Angeliter Open Air', country: 'Germany', tourId: 3 },
  { date: '17.08.2026', city: 'Attnang-Puchheim', venue: "Raw's Diner", country: 'Austria', tourId: 3 },
  { date: '18.08.2026', city: 'Graz', venue: 'Music-House', country: 'Austria', tourId: 3 },
  { date: '19.08.2026', city: 'Weiden', venue: 'Salute Musikclub', country: 'Germany', tourId: null },
  { date: '20.08.2026', city: 'Loburg', venue: 'Spirit Festival', country: 'Germany', tourId: 4 },
  { date: '22.08.2026', city: 'Schöppenstedt', venue: 'Ackerfest', country: 'Germany', tourId: 4 },
  { date: '23.08.2026', city: 'Osnabrück', venue: 'Bastard Club', country: 'Germany', tourId: null },
  { date: '25.08.2026', city: 'Siegen', venue: 'Vortex', country: 'Germany', tourId: 6 },
  { date: '26.08.2026', city: 'Wermelskirchen', venue: 'AJZ Bahndamm', country: 'Germany', tourId: 6 },
  { date: '20.07.2026', city: 'Lyon', venue: 'Bulle de Son', country: 'France', tourId: 5 },
  { date: '21.07.2026', city: 'Barcelona', venue: 'Sala Upload', country: 'Spain', tourId: 5 },
  { date: '22.07.2026', city: 'Madrid', venue: 'Sala Nazca', country: 'Spain', tourId: 5 },
  { date: '24.07.2026', city: 'Ribadeo', venue: 'Vendaval Fest', country: 'Spain', tourId: 5 },
  { date: '25.07.2026', city: 'Coimbra', venue: 'Rocketmen Coimbra', country: 'Portugal', tourId: null },
  { date: '25.07.2026', city: 'Badbergen', venue: 'Hardcore Food Headquarter', country: 'Germany', tourId: null },
  { date: '26.07.2026', city: 'Insming', venue: 'MozHell Open Air', country: 'France', tourId: null },
  { date: '26.07.2026', city: 'Hünxe', venue: 'Ruhrpott Rodeo', country: 'Germany', tourId: null },
  { date: '27.07.2026', city: 'Karlsruhe', venue: 'Alte Hackerei', country: 'Germany', tourId: null },
  { date: '28.07.2026', city: 'Köln', venue: 'Gebäude 9', country: 'Germany', tourId: null },
  { date: '29.07.2026', city: 'Kassel', venue: 'Goldgrube', country: 'Germany', tourId: null },
  { date: '30.07.2026', city: 'Löbnitz', venue: 'Full Rewind', country: 'Germany', tourId: null },
  { date: '31.07.2026', city: 'Gränichen', venue: 'Open Air Gränichen', country: 'Switzerland', tourId: null },
]

// Extract unique years from date strings (format: DD.MM.YYYY)
const filterYears = computed(() => {
  const years = new Set()
  allDates.forEach(d => {
    const parts = d.date.split('.')
    if (parts.length === 3) years.add(parts[2])
  })
  return ['All', ...Array.from(years).sort()]
})

const activeYear = ref('All')

const filteredDates = computed(() => {
  if (activeYear.value === 'All') return allDates
  return allDates.filter(d => d.date.endsWith(activeYear.value))
})
</script>

<style scoped>
.dates-section {
  padding-top: 80px;
}

.dates-page-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}
.dates-page-header .section-title {
  margin-bottom: 24px;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-btn {
  font-family: var(--font-heading);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 100px;
  border: 1.5px solid #ddd;
  background: #fff;
  color: #555;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
}

.filter-btn:hover {
  border-color: #171717;
  color: #171717;
  background: #f8f8f8;
}

.filter-btn.active {
  background: #171717;
  color: #fff;
  border-color: #171717;
}

.dates-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.dates-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--color-white);
  font-size: 0.9375rem;
}

.dates-table thead {
  background: var(--color-primary);
  color: var(--color-white);
}

.dates-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: capitalize;
  letter-spacing: 1px;
  padding: 16px 20px;
  text-align: left;
  white-space: nowrap;
}

.dates-table td {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  vertical-align: middle;
}

.date-row:hover {
  background: var(--color-bg-alt);
}

.date-cell {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.875rem;
  white-space: nowrap;
  color: var(--color-primary);
}

.city-cell {
  font-weight: 600;
}

.venue-cell {
  color: var(--color-text-light);
}

.country-cell {
  color: var(--color-text-light);
  font-size: 0.875rem;
}

.ticket-cell {
  text-align: center;
}

.no-tickets {
  color: var(--color-text-lighter);
  font-size: 0.875rem;
}

.btn-sm {
  padding: 6px 16px;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .dates-table th,
  .dates-table td {
    padding: 12px 14px;
  }

  .dates-table {
    font-size: 0.8125rem;
  }
}

@media (max-width: 480px) {
  .dates-table-wrapper {
    margin: 0 -16px;
    border-radius: 0;
  }
}
</style>
