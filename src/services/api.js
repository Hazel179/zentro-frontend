import axios from 'axios'
import { useToast } from 'vue-toastification'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const toast = useToast()
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          toast.error('Access denied. You do not have permission to perform this action.')
          break
        case 404:
          toast.error('Resource not found.')
          break
        case 422:
          // Validation errors
          if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach(err => {
              toast.error(err.msg || 'Validation error')
            })
          } else {
            toast.error(data.message || 'Validation error')
          }
          break
        case 429:
          toast.error('Too many requests. Please try again later.')
          break
        case 500:
          toast.error('Server error. Please try again later.')
          break
        default:
          toast.error(data.message || 'An error occurred')
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.')
    } else {
      // Other error
      toast.error('An unexpected error occurred')
    }
    
    return Promise.reject(error)
  }
)

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  refresh: () => api.post('/auth/refresh'),
  changePassword: (passwordData) => api.post('/auth/change-password', passwordData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getUser: (id) => api.get(`/users/${id}`),
  changePassword: (passwordData) => api.post('/users/change-password', passwordData),
  deleteAccount: () => api.delete('/users/account'),
}

export const categoryAPI = {
  getAll: (params) => api.get('/categories', { params }),
  getById: (id) => api.get(`/categories/${id}`),
  create: (categoryData) => api.post('/categories', categoryData),
  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  delete: (id) => api.delete(`/categories/${id}`),
  getConsultants: (id, params) => api.get(`/categories/${id}/consultants`, { params }),
}

export const consultantAPI = {
  getAll: (params) => api.get('/consultants', { params }),
  getById: (id) => api.get(`/consultants/${id}`),
  create: (consultantData) => api.post('/consultants', consultantData),
  update: (id, consultantData) => api.put(`/consultants/${id}`, consultantData),
  getMyProfile: () => api.get('/consultants/profile/me'),
  updateProfile: (profileData) => api.put('/consultants/profile/me', profileData),
}

export const bookingAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getAll: (params) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  getMyBookings: () => api.get('/bookings/me'),
  updateStatus: (id, statusData) => api.put(`/bookings/${id}/status`, statusData),
  cancel: (id, reason) => api.post(`/bookings/${id}/cancel`, { reason }),
  rate: (id, ratingData) => api.post(`/bookings/${id}/rate`, ratingData),
}

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, status),
  getConsultants: (params) => api.get('/admin/consultants', { params }),
  verifyConsultant: (id, verified) => api.put(`/admin/consultants/${id}/verify`, { isVerified: verified }),
  getBookings: (params) => api.get('/admin/bookings', { params }),
  updateBookingStatus: (id, statusData) => api.put(`/admin/bookings/${id}/status`, statusData),
}

export const serviceAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
}

export default api 