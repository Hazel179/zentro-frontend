import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isConsultant = computed(() => user.value?.role === 'consultant')
  const isClient = computed(() => user.value?.role === 'client')
  const userRole = computed(() => user.value?.role)

  // Actions
  const login = async (credentials) => {
    try {
      isLoading.value = true
      const response = await api.post('/auth/login', credentials)
      
      if (response.data.success) {
        const { user: userData, token: tokenData } = response.data.data
        
        user.value = userData
        token.value = tokenData
        
        // Set token in localStorage and API headers
        localStorage.setItem('token', tokenData)
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
        
        toast.success('Login successful!')
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    try {
      isLoading.value = true
      const response = await api.post('/auth/register', userData)
      
      if (response.data.success) {
        const { user: newUser, token: tokenData } = response.data.data
        
        user.value = newUser
        token.value = tokenData
        
        // Set token in localStorage and API headers
        localStorage.setItem('token', tokenData)
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenData}`
        
        toast.success('Registration successful!')
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    
    // Clear localStorage and API headers
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    
    toast.success('Logged out successfully')
  }

  const fetchUser = async () => {
    try {
      if (!token.value) return
      
      const response = await api.get('/auth/me')
      if (response.data.success) {
        user.value = response.data.data.user
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
      // If token is invalid, logout
      if (error.response?.status === 401) {
        logout()
      }
    }
  }

  const updateProfile = async (profileData) => {
    try {
      isLoading.value = true
      const response = await api.put('/users/profile', profileData)
      
      if (response.data.success) {
        user.value = { ...user.value, ...response.data.data.user }
        toast.success('Profile updated successfully!')
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  const changePassword = async (passwordData) => {
    try {
      isLoading.value = true
      const response = await api.post('/auth/change-password', passwordData)
      
      if (response.data.success) {
        toast.success('Password changed successfully!')
        return { success: true }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      isLoading.value = false
    }
  }

  const initializeAuth = () => {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      fetchUser()
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    
    // Getters
    isAuthenticated,
    isAdmin,
    isConsultant,
    isClient,
    userRole,
    
    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
    initializeAuth
  }
}) 