<template>
  <div class="all-merch-page">
    <section class="section main-content">
      <div class="container">
        <!-- Simple Category Filter Buttons -->
        <div class="category-filter-buttons">
          <button 
            v-for="cat in categories" 
            :key="cat" 
            class="filter-tab-btn" 
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- 4-Column Responsive Grid -->
        <div class="grid grid-4 products-grid">
          <VinylCard v-for="item in filteredMerch" :key="item.id" :vinyl="item" />
        </div>

        <div v-if="filteredMerch.length === 0" class="empty-results text-center">
          <p>Tidak ada produk merch dalam kategori ini.</p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VinylCard from '../components/VinylCard.vue'
import Footer from '../components/Footer.vue'

const selectedCategory = ref('Semua')
const categories = ['Semua', 'T-Shirt', 'Hoodie & Outerwear', 'Caps & Hat', 'Vinyl & CDs']

const merchList = [
  {
    id: 201,
    title: 'Teflon Dons - Unstoppable Heavy T-Shirt',
    price: 350000,
    creator: 'Teflon Dons',
    category: 'T-Shirt',
    coverImage: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/201'
  },
  {
    id: 202,
    title: 'Nasty - Beatdown World Tour Hoodie',
    price: 650000,
    creator: 'Nasty',
    category: 'Hoodie & Outerwear',
    coverImage: 'https://mad-tourbooking.de/media/Nasty-2025_Instagram_Square-900x900.jpg',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/202'
  },
  {
    id: 203,
    title: 'Barcode - Copenhagen Hardcore Zip-Up',
    price: 580000,
    creator: 'Barcode',
    category: 'Hoodie & Outerwear',
    coverImage: 'https://mad-tourbooking.de/media/Barcode-2026-line-up-900x473.png',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/203'
  },
  {
    id: 204,
    title: '45 Adapters - NYC Street Rock Tee',
    price: 320000,
    creator: '45 Adapters',
    category: 'T-Shirt',
    coverImage: 'https://mad-tourbooking.de/media/BadBoysForLive-2026_Instagram_Square-900x900.jpg',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/204'
  },
  {
    id: 205,
    title: 'Cruel Hand - Hardcore Punk Long Sleeve',
    price: 420000,
    creator: 'Cruel Hand',
    category: 'T-Shirt',
    coverImage: 'https://mad-tourbooking.de/media/CruelHand_01-scaled-e1729698291310-900x706.jpg',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/205'
  },
  {
    id: 206,
    title: 'Death Before Dishonor - Boston Eagle Hoodie',
    price: 680000,
    creator: 'Death Before Dishonor',
    category: 'Hoodie & Outerwear',
    coverImage: 'https://mad-tourbooking.de/media/DRI_2026_Tourposter_web-2-637x900.jpg',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/206'
  },
  {
    id: 207,
    title: 'Warriors Official Logo Vintage Tee',
    price: 330000,
    creator: 'Warriors Merch',
    category: 'T-Shirt',
    coverImage: 'https://mad-tourbooking.de/media/01.bmp',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/207'
  },
  {
    id: 208,
    title: 'M.A.D. Tourbooking Crew Snapback Cap',
    price: 280000,
    creator: 'M.A.D. Tourbooking',
    category: 'Caps & Hat',
    coverImage: 'https://mad-tourbooking.de/media/Carcsss-june-2026-720x900.jpg',
    vinylImage: 'https://mad-tourbooking.de/media/DBD_Logo.png',
    link: '/merch/208'
  }
]

const filteredMerch = computed(() => {
  if (selectedCategory.value === 'Semua') return merchList
  return merchList.filter(item => item.category === selectedCategory.value)
})
</script>

<style scoped>
.all-merch-page {
  padding-top: 72px;
  background: #ffffff;
  min-height: 100vh;
}

.main-content {
  padding: 40px 0 80px;
}

.category-filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 32px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
}

.category-filter-buttons::-webkit-scrollbar {
  display: none;
}

.filter-tab-btn {
  padding: 10px 22px;
  border-radius: 100px;
  border: 1px solid #e5e5e5;
  background: #f8f8f8;
  font-family: var(--font-heading, sans-serif);
  font-size: 0.875rem;
  font-weight: 700;
  color: #555555;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
}

.filter-tab-btn:hover {
  background: #171717;
  color: #ffffff;
  border-color: #171717;
}

.filter-tab-btn.active {
  background: #171717;
  color: #ffffff;
  border-color: #171717;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.empty-results {
  padding: 64px 0;
  color: #666666;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .all-merch-page {
    padding-top: 64px;
  }

  .main-content {
    padding: 20px 0 40px;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .category-filter-buttons {
    gap: 6px;
    margin-bottom: 20px;
  }

  .filter-tab-btn {
    padding: 6px 14px;
    font-size: 0.75rem;
  }
}
</style>
