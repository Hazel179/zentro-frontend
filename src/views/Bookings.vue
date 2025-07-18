<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p class="text-sm text-gray-600">Manage your consultations</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard" class="btn-outline">
              Dashboard
            </router-link>
            <router-link to="/consultants" class="btn-primary">
              Find Consultants
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="card mb-8">
        <div class="card-body">
          <div class="flex flex-wrap gap-4">
            <button
              v-for="filter in statusFilters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeFilter === filter.value
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="spinner-lg mx-auto mb-4"></div>
        <p class="text-gray-600">Loading your bookings...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredBookings.length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <CalendarIcon class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
        <p class="text-gray-600 mb-6">
          {{ activeFilter === 'all' ? 'You haven\'t made any bookings yet.' : `No ${activeFilter} bookings found.` }}
        </p>
        <router-link to="/consultants" class="btn-primary">
          Find Consultants
        </router-link>
      </div>

      <!-- Bookings List -->
      <div v-else class="space-y-6">
        <div
          v-for="booking in filteredBookings"
          :key="booking._id"
          class="card"
        >
          <div class="card-body">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <!-- Booking Info -->
              <div class="flex items-start space-x-4 flex-1">
                <!-- Consultant Avatar -->
                <div class="avatar-lg">
                  <img 
                    v-if="booking.consultant?.user?.avatar" 
                    :src="booking.consultant.user.avatar" 
                    :alt="booking.consultant.user?.firstName"
                    class="h-full w-full rounded-full object-cover"
                  />
                  <span v-else class="text-primary-600 text-xl">
                    {{ getInitials(booking.consultant?.user?.firstName, booking.consultant?.user?.lastName) }}
                  </span>
                </div>

                <!-- Booking Details -->
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ booking.consultant?.user?.firstName }} {{ booking.consultant?.user?.lastName }}
                    </h3>
                    <span :class="getStatusBadgeClass(booking.status)">
                      {{ getStatusLabel(booking.status) }}
                    </span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div class="flex items-center">
                      <CalendarIcon class="h-4 w-4 mr-2" />
                      <span>{{ formatDate(booking.date) }}</span>
                    </div>
                    <div class="flex items-center">
                      <ClockIcon class="h-4 w-4 mr-2" />
                      <span>{{ booking.time }} ({{ booking.duration }} min)</span>
                    </div>
                    <div class="flex items-center">
                      <VideoCameraIcon class="h-4 w-4 mr-2" />
                      <span>{{ getTypeLabel(booking.type) }}</span>
                    </div>
                    <div class="flex items-center">
                      <CurrencyDollarIcon class="h-4 w-4 mr-2" />
                      <span>${{ booking.totalAmount }}</span>
                    </div>
                  </div>

                  <!-- Topics -->
                  <div v-if="booking.topics" class="mt-3">
                    <p class="text-sm text-gray-700">
                      <strong>Topics:</strong> {{ booking.topics }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-4 lg:mt-0 flex flex-col space-y-2">
                <div v-if="booking.status === 'pending'" class="flex space-x-2">
                  <button
                    @click="handleAccept(booking._id)"
                    :disabled="processing"
                    class="btn-primary text-sm"
                  >
                    Accept
                  </button>
                  <button
                    @click="handleDecline(booking._id)"
                    :disabled="processing"
                    class="btn-outline text-sm"
                  >
                    Decline
                  </button>
                </div>

                <div v-if="booking.status === 'confirmed'" class="flex space-x-2">
                  <button
                    @click="handleJoin(booking._id)"
                    class="btn-primary text-sm"
                  >
                    Join Session
                  </button>
                  <button
                    @click="handleReschedule(booking._id)"
                    class="btn-outline text-sm"
                  >
                    Reschedule
                  </button>
                </div>

                <div v-if="booking.status === 'completed'" class="flex space-x-2">
                  <button
                    v-if="!booking.hasReview"
                    @click="handleReview(booking._id)"
                    class="btn-secondary text-sm"
                  >
                    Leave Review
                  </button>
                  <button
                    @click="handleBookAgain(booking.consultant._id)"
                    class="btn-outline text-sm"
                  >
                    Book Again
                  </button>
                </div>

                <div v-if="booking.status === 'cancelled'" class="flex space-x-2">
                  <button
                    @click="handleBookAgain(booking.consultant._id)"
                    class="btn-primary text-sm"
                  >
                    Book Again
                  </button>
                </div>

                <button
                  v-if="['pending', 'confirmed'].includes(booking.status)"
                  @click="handleCancel(booking._id)"
                  :disabled="processing"
                  class="btn-ghost text-sm text-red-600 hover:text-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { 
  CalendarIcon, 
  ClockIcon, 
  VideoCameraIcon, 
  CurrencyDollarIcon 
} from '@heroicons/vue/24/outline'
import { bookingAPI } from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// State
const loading = ref(false)
const processing = ref(false)
const bookings = ref([])
const activeFilter = ref('all')

// Filters
const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' }
]

// Computed
const filteredBookings = computed(() => {
  if (activeFilter.value === 'all') return bookings.value
  return bookings.value.filter(booking => booking.status === activeFilter.value)
})

// Methods
const loadBookings = async () => {
  try {
    loading.value = true
    const response = await bookingAPI.getMyBookings()
    
    if (response.data.success) {
      bookings.value = response.data.data.bookings
    }
  } catch (error) {
    console.error('Failed to load bookings:', error)
    toast.error('Failed to load bookings')
  } finally {
    loading.value = false
  }
}

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'badge-warning',
    confirmed: 'badge-success',
    completed: 'badge-primary',
    cancelled: 'badge-gray'
  }
  return classes[status] || 'badge-gray'
}

const getTypeLabel = (type) => {
  const labels = {
    video: 'Video Call',
    audio: 'Audio Call',
    chat: 'Text Chat'
  }
  return labels[type] || type
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleAccept = async (bookingId) => {
  try {
    processing.value = true
    const response = await bookingAPI.updateStatus(bookingId, { status: 'confirmed' })
    
    if (response.data.success) {
      toast.success('Booking confirmed!')
      loadBookings()
    }
  } catch (error) {
    console.error('Failed to accept booking:', error)
    toast.error('Failed to accept booking')
  } finally {
    processing.value = false
  }
}

const handleDecline = async (bookingId) => {
  try {
    processing.value = true
    const response = await bookingAPI.updateStatus(bookingId, { status: 'cancelled' })
    
    if (response.data.success) {
      toast.success('Booking declined')
      loadBookings()
    }
  } catch (error) {
    console.error('Failed to decline booking:', error)
    toast.error('Failed to decline booking')
  } finally {
    processing.value = false
  }
}

const handleCancel = async (bookingId) => {
  if (!confirm('Are you sure you want to cancel this booking?')) return
  
  try {
    processing.value = true
    const response = await bookingAPI.updateStatus(bookingId, { status: 'cancelled' })
    
    if (response.data.success) {
      toast.success('Booking cancelled')
      loadBookings()
    }
  } catch (error) {
    console.error('Failed to cancel booking:', error)
    toast.error('Failed to cancel booking')
  } finally {
    processing.value = false
  }
}

const handleJoin = (bookingId) => {
  toast.info('Join session feature coming soon!')
}

const handleReschedule = (bookingId) => {
  toast.info('Reschedule feature coming soon!')
}

const handleReview = (bookingId) => {
  router.push(`/review/${bookingId}`)
}

const handleBookAgain = (consultantId) => {
  router.push(`/book/${consultantId}`)
}

// Initialize
onMounted(() => {
  loadBookings()
})
</script> 