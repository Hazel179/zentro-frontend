<template>
  <div class="service-detail max-w-2xl mx-auto py-12 px-4">
    <div class="service-info mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ service?.title || service?.name }}</h1>
      <p class="text-gray-700 mb-2">{{ service?.description }}</p>
      <div class="price text-2xl font-bold text-green-700 mb-2">${{ service?.price }}</div>
      <div class="text-gray-500 mb-2">Duration: {{ service?.duration }}</div>
      <div class="text-gray-500 mb-2">Category: {{ service?.category }}</div>
    </div>
    <button 
      @click="handleBooking"
      :disabled="isBooking"
      class="booking-button w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
      :class="{ 'booking-loading': isBooking }"
    >
      <span v-if="isBooking">Loading...</span>
      <span v-else>Book This Service</span>
    </button>
    <button 
      @click="handleContact"
      class="contact-button w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
    >
      Contact Consultant
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const service = ref(null)
const loading = ref(true)
const error = ref(null)
const isBooking = ref(false)

const fetchService = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await api.get(`/services/${route.params.id}`)
    service.value = response.data.data
  } catch (err) {
    console.error('Error fetching service:', err)
    error.value = 'Failed to load service details.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchService)

function handleBooking() {
  isBooking.value = true
  router.push({ name: 'ConsultantList' })
}

function handleContact() {
  console.log('Contact consultant clicked')
  alert('Contact consultant feature coming soon!')
}
</script>

<style scoped>
.booking-button {
  width: 100%;
  background-color: #059669;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}
.booking-button:hover:not(:disabled) {
  background-color: #047857;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}
.booking-button:disabled {
  background-color: #9CA3AF;
  cursor: not-allowed;
  transform: none;
}
.booking-loading {
  position: relative;
}
.contact-button {
  width: 100%;
  background-color: #E5E7EB;
  color: #374151;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.contact-button:hover {
  background-color: #D1D5DB;
  transform: translateY(-1px);
}
.service-info {
  margin-bottom: 20px;
}
.price {
  font-size: 24px;
  font-weight: bold;
  color: #059669;
  margin: 10px 0;
}
</style> 