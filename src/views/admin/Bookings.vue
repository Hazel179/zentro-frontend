<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manage Bookings</h1>
            <p class="text-sm text-gray-600">View and manage all bookings</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/admin" class="btn-outline">
              Admin Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="card">
        <div class="card-body">
          <div class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <select v-model="statusFilter" class="form-input w-full md:w-48">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div v-if="loading" class="text-center py-8">Loading bookings...</div>
          <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Consultant</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="booking in filteredBookings" :key="booking.id">
                  <td class="px-4 py-2">{{ booking.client?.firstName }} {{ booking.client?.lastName }}</td>
                  <td class="px-4 py-2">{{ booking.consultant?.user?.firstName }} {{ booking.consultant?.user?.lastName }}</td>
                  <td class="px-4 py-2">{{ formatDate(booking.date) }}</td>
                  <td class="px-4 py-2">{{ booking.status }}</td>
                  <td class="px-4 py-2">
                    <button v-if="booking.status !== 'cancelled'" @click="cancelBooking(booking)" class="btn-danger btn-sm mr-2">Cancel</button>
                    <button v-if="booking.status === 'pending'" @click="confirmBooking(booking)" class="btn-primary btn-sm">Confirm</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="filteredBookings.length === 0" class="text-center text-gray-500 py-8">No bookings found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminAPI } from '@/services/api'

const bookings = ref([])
const loading = ref(false)
const error = ref('')
const statusFilter = ref('')

const fetchBookings = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await adminAPI.getBookings()
    bookings.value = res.data.data.bookings || res.data.data || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load bookings'
  } finally {
    loading.value = false
  }
}

const cancelBooking = async (booking) => {
  if (!confirm('Cancel this booking?')) return
  try {
    await adminAPI.updateBookingStatus(booking.id, { status: 'cancelled' })
    booking.status = 'cancelled'
  } catch (err) {
    alert('Failed to cancel booking')
  }
}

const confirmBooking = async (booking) => {
  try {
    await adminAPI.updateBookingStatus(booking.id, { status: 'confirmed' })
    booking.status = 'confirmed'
  } catch (err) {
    alert('Failed to confirm booking')
  }
}

const filteredBookings = computed(() => {
  if (!statusFilter.value) return bookings.value
  return bookings.value.filter(b => b.status === statusFilter.value)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

onMounted(fetchBookings)
</script> 