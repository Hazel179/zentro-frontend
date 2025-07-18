<template>
  <div class="card hover:shadow-medium transition-all duration-300 group">
    <div class="card-body">
      <!-- Header with avatar and availability -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <!-- Avatar -->
          <div class="relative">
            <div class="avatar-lg">
              <img 
                v-if="consultant.user?.avatar" 
                :src="consultant.user.avatar" 
                :alt="consultant.user?.firstName"
                class="h-full w-full rounded-full object-cover"
              />
              <span v-else class="text-primary-600">
                {{ getInitials(consultant.user?.firstName, consultant.user?.lastName) }}
              </span>
            </div>
            <!-- Availability indicator -->
            <div 
              class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white"
              :class="getAvailabilityClass()"
            ></div>
          </div>
          
          <!-- Name and rating -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {{ consultant.user?.firstName }} {{ consultant.user?.lastName }}
            </h3>
            <div class="flex items-center space-x-2 mt-1">
              <div class="flex items-center">
                <StarIcon class="h-4 w-4 text-secondary-400 fill-current" />
                <span class="ml-1 text-sm font-medium text-gray-700">
                  {{ consultant.rating?.average?.toFixed(1) || '0.0' }}
                </span>
              </div>
              <span class="text-sm text-gray-500">
                ({{ consultant.rating?.count || 0 }} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <!-- Hourly rate -->
        <div class="text-right">
          <div class="text-lg font-bold text-primary-600">
            ${{ consultant.hourlyRate }}/hr
          </div>
          <div class="text-sm text-gray-500">
            {{ consultant.experience }} years exp.
          </div>
        </div>
      </div>

      <!-- Expertise tags -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="category in consultant.categories" 
            :key="category._id"
            class="badge-primary text-xs"
            :style="{ backgroundColor: `${category.color}20`, color: category.color }"
          >
            {{ category.name }}
          </span>
        </div>
      </div>

      <!-- Bio preview -->
      <p class="text-sm text-gray-600 mb-4 line-clamp-2">
        {{ consultant.bio }}
      </p>

      <!-- Stats -->
      <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <CheckCircleIcon class="h-4 w-4 text-green-500 mr-1" />
            <span>{{ consultant.completionRate }}% completion</span>
          </div>
          <div class="flex items-center">
            <ClockIcon class="h-4 w-4 text-blue-500 mr-1" />
            <span>{{ consultant.totalBookings }} sessions</span>
          </div>
        </div>
        
        <!-- Languages -->
        <div v-if="consultant.languages?.length" class="flex items-center">
          <GlobeAltIcon class="h-4 w-4 text-gray-400 mr-1" />
          <span>{{ consultant.languages[0] }}{{ consultant.languages.length > 1 ? ` +${consultant.languages.length - 1}` : '' }}</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex space-x-3">
        <button 
          @click="$emit('book', consultant)"
          class="btn-primary flex-1"
          :disabled="!isAvailable"
        >
          <CalendarIcon class="h-4 w-4 mr-2" />
          {{ isAvailable ? 'Book Now' : 'Unavailable' }}
        </button>
        
        <button 
          @click="$emit('view', consultant)"
          class="btn-outline"
        >
          <EyeIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  StarIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  GlobeAltIcon, 
  CalendarIcon, 
  EyeIcon 
} from '@heroicons/vue/24/outline'

// Props
const props = defineProps({
  consultant: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['book', 'view'])

// Computed
const isAvailable = computed(() => {
  return props.consultant.isCurrentlyAvailable && props.consultant.isActive
})

// Methods
const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const getAvailabilityClass = () => {
  if (!props.consultant.isActive) return 'bg-gray-400'
  if (props.consultant.isCurrentlyAvailable) return 'bg-green-400'
  return 'bg-yellow-400'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 