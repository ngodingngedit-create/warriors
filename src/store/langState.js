import { reactive } from 'vue'

export const langState = reactive({
  current: 'id', // 'id' or 'en'
  setLang(code) {
    this.current = code
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_lang', code)
    }
  }
})

// Initialize from localStorage
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('user_lang')
  if (saved && (saved === 'id' || saved === 'en')) {
    langState.current = saved
  }
}

export const t = (key) => {
  const isEn = langState.current === 'en'
  const translations = {
    // Nav
    'nav.home': isEn ? 'Home' : 'Beranda',
    'nav.tours': isEn ? 'Tours' : 'Tur',
    'nav.all_tours': isEn ? 'All Tours' : 'Semua Tur',
    'nav.tour_dates': isEn ? 'Tour Dates' : 'Jadwal Tur',
    'nav.revelations': isEn ? 'Revelations Records' : 'Revelations Records',
    'nav.artists': isEn ? 'Artists' : 'Artis',
    'nav.merch': isEn ? 'Merch & Apparel' : 'Merch & Apparel',
    'nav.apparel': isEn ? 'Apparel' : 'Pakaian',
    'nav.accessories': isEn ? 'Accessories' : 'Aksesoris',
    'nav.vinyl': isEn ? 'Vinyl & CDs' : 'Vinyl & CD',
    'nav.labels': isEn ? 'Labels' : 'Label',
    'nav.login': isEn ? 'Login' : 'Masuk',
    'nav.profile': isEn ? 'Profile' : 'Profil',
    'nav.cart': isEn ? 'Cart' : 'Keranjang',
    'cart.title': isEn ? 'Shopping Cart' : 'Keranjang Belanja',
    'cart.empty': isEn ? 'Your shopping cart is empty' : 'Keranjang belanja Anda kosong',
    'cart.total': isEn ? 'Total' : 'Total',
    'cart.checkout': isEn ? 'Checkout Now' : 'Checkout Sekarang',
    'cart.clear': isEn ? 'Clear Cart' : 'Kosongkan Keranjang',
    'cart.variant': isEn ? 'Variant' : 'Varian',
    'common.select_lang': isEn ? 'Select Language' : 'Pilih Bahasa',
  }
  return translations[key] || key
}
