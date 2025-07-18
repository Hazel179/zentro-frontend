<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner-lg mx-auto mb-4"></div>
        <p class="text-gray-600">Loading consultant profile...</p>
      </div>

      <div v-else-if="!consultant" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Consultant not found</h2>
        <p class="text-gray-600 mb-6">The consultant you're looking for doesn't exist or has been removed.</p>
        <router-link to="/consultants" class="btn-primary">
          Browse Consultants
        </router-link>
      </div>

      <div v-else class="space-y-8">
        <!-- Back Button -->
        <div>
          <router-link to="/consultants" class="btn-ghost">
            ← Back to Consultants
          </router-link>
        </div>

        <!-- Profile Header -->
        <div class="card">
          <div class="card-body">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between">
              <div class="flex items-start space-x-6">
                <!-- Avatar -->
                <div class="relative">
                  <div class="avatar-xl">
                    <img 
                      v-if="consultant.user?.avatar" 
                      :src="consultant.user.avatar" 
                      :alt="consultant.user?.firstName"
                      class="h-full w-full rounded-full object-cover"
                    />
                    <span v-else class="text-primary-600 text-2xl">
                      {{ getInitials(consultant.user?.firstName, consultant.user?.lastName) }}
                    </span>
                  </div>
                  <!-- Availability indicator -->
                  <div 
                    class="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-white"
                    :class="getAvailabilityClass()"
                  ></div>
                </div>

                <!-- Basic Info -->
                <div class="flex-1">
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">
                    {{ consultant.user?.firstName }} {{ consultant.user?.lastName }}
                  </h1>
                  
                  <div class="flex items-center space-x-4 mb-4">
                    <div class="flex items-center">
                      <StarIcon class="h-5 w-5 text-secondary-400 fill-current" />
                      <span class="ml-1 text-lg font-medium text-gray-700">
                        {{ consultant.rating?.average?.toFixed(1) || '0.0' }}
                      </span>
                      <span class="ml-1 text-gray-500">
                        ({{ consultant.rating?.count || 0 }} reviews)
                      </span>
                    </div>
                    
                    <div class="text-lg font-bold text-primary-600">
                      ${{ consultant.hourlyRate }}/hr
                    </div>
                    
                    <div class="text-gray-600">
                      {{ consultant.experience }} years experience
                    </div>
                  </div>

                  <!-- Categories -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span 
                      v-for="category in consultant.categories" 
                      :key="category._id"
                      class="badge-primary"
                      :style="{ backgroundColor: `${category.color}20`, color: category.color }"
                    >
                      {{ category.name }}
                    </span>
                  </div>

                  <!-- Languages -->
                  <div v-if="consultant.languages?.length" class="flex items-center text-sm text-gray-600">
                    <GlobeAltIcon class="h-4 w-4 mr-1" />
                    <span>{{ consultant.languages.join(', ') }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 md:mt-0 flex flex-col space-y-3">
                <BookingButton
                  :service="consultant"
                  :disabled="!isAvailable"
                  @book-service="handleBook"
                >
                  <template #default>
                    <CalendarIcon class="h-5 w-5 mr-2" />
                    {{ isAvailable ? 'Book Consultation' : 'Unavailable' }}
                  </template>
                </BookingButton>
                
                <button 
                  v-if="authStore.isAuthenticated && authStore.isClient"
                  @click="handleContact"
                  class="btn-outline"
                >
                  <EnvelopeIcon class="h-4 w-4 mr-2" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">About</h2>
          </div>
          <div class="card-body">
            <p class="text-gray-700 leading-relaxed">{{ consultant.bio }}</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <div class="card-body text-center">
              <div class="text-2xl font-bold text-primary-600 mb-2">
                {{ consultant.totalBookings }}
              </div>
              <div class="text-sm text-gray-600">Total Sessions</div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-body text-center">
              <div class="text-2xl font-bold text-green-600 mb-2">
                {{ consultant.completionRate }}%
              </div>
              <div class="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-body text-center">
              <div class="text-2xl font-bold text-secondary-600 mb-2">
                {{ consultant.rating?.count || 0 }}
              </div>
              <div class="text-sm text-gray-600">Reviews</div>
            </div>
          </div>
        </div>

        <!-- Qualifications -->
        <div v-if="consultant.qualifications?.length" class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Qualifications</h2>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div 
                v-for="qual in consultant.qualifications" 
                :key="qual.name"
                class="flex justify-between items-start"
              >
                <div>
                  <div class="font-medium text-gray-900">{{ qual.name }}</div>
                  <div class="text-sm text-gray-600">{{ qual.institution }}</div>
                </div>
                <div class="text-sm text-gray-500">{{ qual.year }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div v-if="consultant.certifications?.length" class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Certifications</h2>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div 
                v-for="cert in consultant.certifications" 
                :key="cert.name"
                class="flex justify-between items-start"
              >
                <div>
                  <div class="font-medium text-gray-900">{{ cert.name }}</div>
                  <div class="text-sm text-gray-600">{{ cert.issuingBody }}</div>
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(cert.issueDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Specializations/Topics -->
        <div v-if="consultant.specializations?.length" class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Specializations & Topics</h2>
          </div>
          <div class="card-body">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="topic in consultant.specializations" :key="topic" class="text-gray-700">{{ topic }}</li>
            </ul>
          </div>
        </div>

        <!-- Achievements -->
        <div v-if="consultant.achievements?.length" class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Achievements</h2>
          </div>
          <div class="card-body">
            <ul class="list-disc list-inside space-y-1">
              <li v-for="ach in consultant.achievements" :key="ach" class="text-gray-700">{{ ach }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { 
  StarIcon, 
  CalendarIcon, 
  GlobeAltIcon, 
  EnvelopeIcon 
} from '@heroicons/vue/24/outline'
import BookingButton from '@/components/BookingButton.vue'
import { consultantAPI } from '@/services/api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// State
const loading = ref(false)
const consultant = ref(null)

// Computed
const isAvailable = computed(() => {
  return consultant.value?.isCurrentlyAvailable && consultant.value?.isActive
})

// Methods
const loadConsultant = async () => {
  loading.value = true
  const id = route.params.id
  try {
    const response = await consultantAPI.getById(id)
    if (response.data.success) {
      consultant.value = response.data.data.consultant
    } else {
      consultant.value = null
    }
  } catch (e) {
    consultant.value = null
  } finally {
    loading.value = false
  }
}

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const getAvailabilityClass = () => {
  if (!consultant.value?.isActive) return 'bg-gray-400'
  if (consultant.value?.isCurrentlyAvailable) return 'bg-green-400'
  return 'bg-yellow-400'
}

const formatDate = (date) => {
  return new Date(date).getFullYear()
}

const handleBook = () => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please sign in to book a consultation')
    router.push('/login')
    return
  }
  if (!isAvailable.value) {
    toast.warning('This consultant is currently unavailable')
    return
  }
  router.push(`/book/${consultant.value._id}`)
}

const handleContact = () => {
  toast.info('Contact feature coming soon!')
}

// Initialize
onMounted(loadConsultant)
</script> 