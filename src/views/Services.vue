<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of wellness and fitness services designed to help you achieve your goals.
          </p>
        </div>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading services...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <i class="fas fa-exclamation-triangle text-6xl text-red-600 mb-4"></i>
        
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Unable to load services</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button 
          @click="fetchServices" 
          class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="service in services" 
          :key="service._id"
          class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <!-- Service Image -->
          <div class="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <div v-html="getServiceIcon(service.category)" class="text-6xl">
            </div>
          </div>

          <!-- Service Content -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-xl font-bold text-gray-900">{{ service.title }}</h3>
              <div class="flex items-center">
                <i class="fas fa-star text-yellow-500"></i>
                <span class="ml-1 text-sm text-gray-600">{{ service.rating }}</span>
              </div>
            </div>

            <p class="text-gray-600 mb-4 line-clamp-3">{{ service.description }}</p>

            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-clock mr-1"></i>
                <span class="mr-4">{{ service.duration }}</span>
                <i class="fas fa-dollar-sign mr-1"></i>
                <span>${{ service.price }}</span>
              </div>
              <span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {{ service.category }}
              </span>
            </div>

            <router-link 
              :to="`/services/${service._id}`"
              class="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              View Details
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && services.length === 0" class="text-center py-12">
        <i class="fas fa-clipboard-list text-6xl text-gray-400 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No services available</h3>
        <p class="text-gray-600">Check back later for new services.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

export default {
  name: 'Services',
  setup() {
    const services = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchServices = async () => {
      try {
        loading.value = true
        error.value = null
        const response = await api.get('/services')
        services.value = response.data.data
      } catch (err) {
        console.error('Error fetching services:', err)
        error.value = 'Failed to load services. Please try again later.'
      } finally {
        loading.value = false
      }
    }

    const getServiceIcon = (category) => {
      const icons = {
        'Businesses': '<i class="fas fa-briefcase text-4xl text-blue-600"></i>',
        'Healthcare': '<i class="fas fa-heartbeat text-4xl text-red-600"></i>',
        'Technology': '<i class="fas fa-laptop-code text-4xl text-purple-600"></i>',
        'Personal Growth': '<i class="fas fa-user-graduate text-4xl text-green-600"></i>'
      }
      return icons[category] || '<i class="fas fa-star text-4xl text-gray-600"></i>'
    }

    onMounted(() => {
      fetchServices()
    })

    return {
      services,
      loading,
      error,
      fetchServices,
      getServiceIcon
    }
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 