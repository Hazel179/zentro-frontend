<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Find Consultants</h1>
            <p class="text-sm text-gray-600">Browse and connect with expert consultants</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="btn-ghost">
              Home
            </router-link>
            <router-link v-if="authStore.isAuthenticated" to="/dashboard" class="btn-outline">
              Dashboard
            </router-link>
            <router-link v-else to="/login" class="btn-primary">
              Sign In
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <div class="card mb-8">
        <div class="card-body">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Category Filter -->
            <div>
              <label class="form-label">Category</label>
              <select v-model="filters.category" class="form-input">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Sort By -->
            <div>
              <label class="form-label">Sort By</label>
              <select v-model="filters.sort" class="form-input">
                <option value="rating">Rating</option>
                <option value="hourlyRate">Price</option>
                <option value="experience">Experience</option>
              </select>
            </div>

            <!-- Price Range -->
            <div>
              <label class="form-label">Max Price</label>
              <input
                v-model="filters.maxRate"
                type="number"
                placeholder="Any price"
                class="form-input"
              />
            </div>

            <!-- Availability -->
            <div>
              <label class="form-label">Availability</label>
              <select v-model="filters.available" class="form-input">
                <option value="">Any</option>
                <option value="true">Available Now</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="loading" class="text-center py-12">
        <div class="spinner-lg mx-auto mb-4"></div>
        <p class="text-gray-600">Loading consultants...</p>
      </div>

      <div v-else-if="consultants.length === 0" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <UserGroupIcon class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No consultants found</h3>
        <p class="text-gray-600">Try adjusting your filters or check back later.</p>
      </div>

      <div v-else>
        <!-- Consultant Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ConsultantCard
            v-for="consultant in consultants"
            :key="consultant._id"
            :consultant="consultant"
            @book="handleBookConsultant"
            @view="handleViewConsultant"
          />
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="flex justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="btn-outline px-3 py-2"
            >
              Previous
            </button>
            
            <span class="px-3 py-2 text-sm text-gray-600">
              Page {{ pagination.page }} of {{ pagination.pages }}
            </span>
            
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.pages"
              class="btn-outline px-3 py-2"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import ConsultantCard from '@/components/ConsultantCard.vue'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import { consultantAPI, categoryAPI } from '@/services/api'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

// State
const loading = ref(false)
const consultants = ref([])
const categories = ref([])
const pagination = ref({
  page: 1,
  limit: 12,
  total: 0,
  pages: 0
})

const filters = reactive({
  category: '',
  sort: 'rating',
  order: 'desc',
  maxRate: '',
  available: ''
})

// Methods
const loadConsultants = async () => {
  try {
    loading.value = true
    
    const params = {
      page: pagination.value.page,
      limit: pagination.value.limit,
      sort: filters.sort,
      order: filters.order
    }
    
    if (filters.category) params.category = filters.category
    if (filters.maxRate) params.maxRate = filters.maxRate
    if (filters.available) params.available = filters.available
    
    const response = await consultantAPI.getAll(params)
    
    if (response.data.success) {
      consultants.value = response.data.data.consultants
      pagination.value = response.data.data.pagination
    }
  } catch (error) {
    console.error('Failed to load consultants:', error)
    toast.error('Failed to load consultants')
  } finally {
    loading.value = false
  }
}

const loadCategories = async () => {
  try {
    const response = await categoryAPI.getAll({ active: true })
    if (response.data.success) {
      categories.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}

const changePage = (page) => {
  pagination.value.page = page
  loadConsultants()
}

const handleBookConsultant = (consultant) => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please sign in to book a consultation')
    router.push('/login')
    return
  }
  
  if (!consultant.isCurrentlyAvailable) {
    toast.warning('This consultant is currently unavailable')
    return
  }
  
  router.push(`/book/${consultant._id}`)
}

const handleViewConsultant = (consultant) => {
  router.push(`/consultants/${consultant._id}`)
}

// Watchers
watch(filters, () => {
  pagination.value.page = 1
  loadConsultants()
}, { deep: true })

// Initialize
onMounted(() => {
  loadCategories()
  loadConsultants()
})
</script> 