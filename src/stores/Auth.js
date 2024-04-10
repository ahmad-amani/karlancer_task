import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  return {user}
})
