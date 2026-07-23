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
    // Navigation & Header
    'nav.home': isEn ? 'Home' : 'Beranda',
    'nav.tours': isEn ? 'Tours' : 'Tur',
    'nav.all_tours': isEn ? 'All Tours' : 'Semua Tur',
    'nav.tour_dates': isEn ? 'Tour Dates' : 'Jadwal Tur',
    'nav.revelations': isEn ? 'Revelations Records' : 'Revelations Records',
    'nav.artists': isEn ? 'Artists' : 'Artis',
    'nav.merch': isEn ? 'Merch & Apparel' : 'Merch & Pakaian',
    'nav.apparel': isEn ? 'Apparel' : 'Pakaian',
    'nav.accessories': isEn ? 'Accessories' : 'Aksesoris',
    'nav.vinyl': isEn ? 'Vinyl & CDs' : 'Vinyl & CD',
    'nav.labels': isEn ? 'Labels' : 'Label',
    'nav.festivals': isEn ? 'Festivals & Events' : 'Festival & Acara',
    'nav.about': isEn ? 'About Us' : 'Tentang Kami',
    'nav.login': isEn ? 'Login' : 'Masuk',
    'nav.profile': isEn ? 'Profile' : 'Profil',
    'nav.cart': isEn ? 'Cart' : 'Keranjang',

    // Cart Modal / Dropdown
    'cart.title': isEn ? 'Shopping Cart' : 'Keranjang Belanja',
    'cart.empty': isEn ? 'Your shopping cart is empty' : 'Keranjang belanja Anda kosong',
    'cart.total': isEn ? 'Total' : 'Total',
    'cart.checkout': isEn ? 'Checkout Now' : 'Checkout Sekarang',
    'cart.clear': isEn ? 'Clear Cart' : 'Kosongkan Keranjang',
    'cart.variant': isEn ? 'Variant' : 'Varian',
    'cart.quantity': isEn ? 'Qty' : 'Jumlah',
    'cart.remove': isEn ? 'Remove' : 'Hapus',
    'cart.added': isEn ? 'Added to cart' : 'Ditambahkan ke keranjang',

    // Common / Action Buttons
    'common.select_lang': isEn ? 'Select Language' : 'Pilih Bahasa',
    'common.view_all': isEn ? 'View All' : 'Lihat Semua',
    'common.view_all_tours': isEn ? 'View All Tours' : 'Lihat Semua Tur',
    'common.view_all_dates': isEn ? 'View All Tour Dates' : 'Lihat Semua Jadwal Tur',
    'common.view_all_artists': isEn ? 'View All Artists' : 'Lihat Semua Artis',
    'common.view_all_vinyl': isEn ? 'View All Vinyl' : 'Lihat Semua Vinyl',
    'common.view_all_merch': isEn ? 'View All Merch' : 'Lihat Semua Merch',
    'common.view_details': isEn ? 'View Details' : 'Lihat Detail',
    'common.buy_tickets': isEn ? 'Buy Tickets' : 'Beli Tiket',
    'common.buy_now': isEn ? 'Buy Now' : 'Beli Sekarang',
    'common.add_to_cart': isEn ? 'Add to Cart' : 'Tambah ke Keranjang',
    'common.search': isEn ? 'Search...' : 'Cari...',
    'common.filter_all': isEn ? 'All' : 'Semua',
    'common.back': isEn ? 'Back' : 'Kembali',
    'common.loading': isEn ? 'Loading...' : 'Memuat...',
    'common.price': isEn ? 'Price' : 'Harga',
    'common.date': isEn ? 'Date' : 'Tanggal',
    'common.location': isEn ? 'Location' : 'Lokasi',
    'common.venue': isEn ? 'Venue' : 'Tempat / Venue',
    'common.status': isEn ? 'Status' : 'Status',
    'common.genre': isEn ? 'Genre' : 'Genre',

    // Hero Section
    'hero.title': 'WARRIORS',
    'hero.subtitle': isEn ? 'Pioneers of hardcore punk & metal booking Since 1983' : 'Pelopor booking hardcore punk & metal Sejak 1983',
    'hero.badge': isEn ? 'Since 1990' : 'Sejak 1990',
    'hero.btn_tours': isEn ? 'View All Tours' : 'Lihat Semua Tur',
    'hero.btn_dates': isEn ? 'View All Dates' : 'Lihat Semua Jadwal',

    // Section Titles
    'section.all_tours': isEn ? 'All Tours' : 'Semua Tur',
    'section.featured_video': isEn ? 'Featured Video' : 'Video Pilihan',
    'section.vinyl_records': isEn ? 'Vinyl Records' : 'Piringan Hitam Vinyl',
    'section.featured_artists': isEn ? 'Featured Artists' : 'Artis Unggulan',
    'section.upcoming_dates': isEn ? 'Upcoming Tour Dates' : 'Jadwal Tur Mendatang',
    'section.festivals': isEn ? 'Festivals & Live Events' : 'Festival & Konser Musik',
    'section.merch_apparel': isEn ? 'Merch & Apparel' : 'Merch & Pakaian',
    'section.all_accessories': isEn ? 'All Accessories' : 'Semua Aksesoris',
    'section.label_catalog': isEn ? 'Label Vinyl Catalog' : 'Katalog Label Vinyl',
    'section.related_products': isEn ? 'Related Products' : 'Produk Terkait',
    'section.artist_tours': isEn ? 'Upcoming Tours' : 'Tur Mendatang',
    'section.artist_bio': isEn ? 'Biography' : 'Biografi',
    'section.discography': isEn ? 'Discography & Releases' : 'Diskografi & Rilis',

    // Cards
    'card.tour_by': isEn ? 'Tour by' : 'Tur oleh',
    'card.sold_out': isEn ? 'Sold Out' : 'Habis',
    'card.in_stock': isEn ? 'In Stock' : 'Tersedia',
    'card.format': isEn ? 'Format' : 'Format',

    // Tour Detail Page
    'detail.event_starts_in': isEn ? 'EVENT STARTS IN' : 'EVENT DIMULAI DALAM',
    'detail.days': isEn ? 'Days' : 'Hari',
    'detail.hours': isEn ? 'Hours' : 'Jam',
    'detail.minutes': isEn ? 'Minutes' : 'Menit',
    'detail.seconds': isEn ? 'Seconds' : 'Detik',
    'detail.organized_by': isEn ? 'Organized by' : 'Diselenggarakan oleh',
    'detail.share_event': isEn ? 'Share Event' : 'Bagikan Event',
    'detail.contact_organizer': isEn ? 'Contact Organizer' : 'Hubungi Organizer',
    'detail.tab_desc': isEn ? 'Description' : 'Deskripsi',
    'detail.tab_dates': isEn ? 'Dates' : 'Tanggal',
    'detail.tab_location': isEn ? 'Location' : 'Lokasi',
    'detail.tab_terms': isEn ? 'Terms & Conditions' : 'Syarat & Ketentuan',
    'detail.read_more': isEn ? 'Read More' : 'Baca Selengkapnya',
    'detail.close': isEn ? 'Close' : 'Tutup',
    'detail.select_date': isEn ? 'Select Date' : 'Pilih Tanggal',
    'detail.view_maps': isEn ? 'View on Google Maps' : 'Lihat di Google Maps',

    // Footer
    'footer.promoted_by': isEn ? 'PROMOTED BY' : 'DIPROMOSIKAN OLEH',
    'footer.copyright': isEn ? '© 2026 M.A.D. TOURBOOKING. ALL RIGHTS RESERVED' : '© 2026 M.A.D. TOURBOOKING. HAK CIPTA DILINDUNGI',

    // Dates Page
    'dates.title': isEn ? 'Tour Dates' : 'Jadwal Tur',
    'dates.subtitle': isEn ? 'Find upcoming hardcore, punk & metal shows worldwide' : 'Temukan jadwal konser hardcore, punk & metal mendatang di seluruh dunia',
    'dates.search_placeholder': isEn ? 'Search band, venue, or city...' : 'Cari band, tempat, atau kota...',
    'dates.table_date': isEn ? 'Date' : 'Tanggal',
    'dates.table_show': isEn ? 'Artist / Tour' : 'Artis / Tur',
    'dates.table_location': isEn ? 'City & Venue' : 'Kota & Tempat',
    'dates.table_action': isEn ? 'Tickets' : 'Tiket',

    // Tours Page
    'tours.title': isEn ? 'All Tours' : 'Semua Tur',
    'tours.subtitle': isEn ? 'Browse current & upcoming tour lineups' : 'Jelajahi jajaran tur terbaru & mendatang',
    'tours.search_placeholder': isEn ? 'Search tours or bands...' : 'Cari tur atau band...',

    // Artists Page
    'artists.title': isEn ? 'Artist Roster' : 'Daftar Artis',
    'artists.subtitle': isEn ? 'Pioneering Hardcore, Punk & Metal bands on tour' : 'Band Hardcore, Punk & Metal pilihan yang sedang tur',
    'artists.search_placeholder': isEn ? 'Search artists...' : 'Cari artis...',

    // About Page
    'about.title': isEn ? 'About Warriors Booking' : 'Tentang Warriors Booking',
    'about.subtitle': isEn ? 'Booking & Promoting Hardcore, Punk & Metal Music Worldwide' : 'Booking & Promosi Musik Hardcore, Punk & Metal di Seluruh Dunia',

    // Login Page
    'login.title': isEn ? 'Sign In' : 'Masuk',
    'login.subtitle': isEn ? 'Access your Warriors account' : 'Akses akun Warriors Anda',
    'login.email': isEn ? 'Email Address' : 'Alamat Email',
    'login.password': isEn ? 'Password' : 'Kata Sandi',
    'login.submit': isEn ? 'Sign In' : 'Masuk',
    'login.register_prompt': isEn ? 'Don\'t have an account?' : 'Belum punya akun?',
    'login.register_link': isEn ? 'Register here' : 'Daftar di sini'
  }
  return translations[key] || key
}
