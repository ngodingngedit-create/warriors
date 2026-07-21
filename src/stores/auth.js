import { reactive } from 'vue'

export const authStore = reactive({
  isLoggedIn: false
})

export function login() {
  authStore.isLoggedIn = true
}

export function logout() {
  authStore.isLoggedIn = false
}
