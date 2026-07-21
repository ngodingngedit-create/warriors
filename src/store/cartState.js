import { reactive, computed } from 'vue'

export const cartState = reactive({
  isOpen: false,
  badgeAnim: false,
  items: [
    { id: 1, name: 'Teflon Dons - Unstoppable LP', price: 450000, image: 'https://mad-tourbooking.de/media/Red-Light-Final-scaled-e1784117912711-900x495.png', quantity: 1 }
  ],

  addItem(product, qty = 1) {
    const pId = product.id || Date.now()
    const pName = product.title || product.name || 'Produk'
    const pPrice = product.price || 250000
    const pImage = product.coverImage || product.image || ''

    const existing = this.items.find(i => i.id === pId)
    if (existing) {
      existing.quantity += qty
    } else {
      this.items.push({
        id: pId,
        name: pName,
        price: pPrice,
        image: pImage,
        quantity: qty
      })
    }

    // Trigger badge animation flag
    this.badgeAnim = true
    setTimeout(() => {
      this.badgeAnim = false
    }, 800)

    // Automatically slide open the cart sidebar!
    this.isOpen = true
  },

  incrementQty(id) {
    const item = this.items.find(i => i.id === id)
    if (item) item.quantity++
  },

  decrementQty(id) {
    const item = this.items.find(i => i.id === id)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(id)
      }
    }
  },

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id)
  },

  clearCart() {
    this.items = []
  }
})

export const totalCartCount = computed(() => {
  return cartState.items.reduce((sum, item) => sum + item.quantity, 0)
})

export const totalCartPrice = computed(() => {
  return cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})
