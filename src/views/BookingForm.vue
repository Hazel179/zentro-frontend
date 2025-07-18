<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { consultantAPI, bookingAPI } from '@/services/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const submitting = ref(false)
const consultant = ref(null)

const consultantId = computed(() => route.params.consultantId)

const form = ref({
  date: '',
  time: '',
  duration: '',
  type: '',
  topics: '',
  requirements: ''
})

const today = computed(() => new Date().toISOString().split('T')[0])
const platformFee = 5

const totalCost = computed(() => {
  if (!form.value.duration || !consultant.value) return 0
  const durationHours = form.value.duration / 60
  const sessionCost = consultant.value.hourlyRate * durationHours
  return (sessionCost + platformFee).toFixed(2)
})

const availableTimes = computed(() => {
  const times = []
  for (let hour = 9; hour <= 18; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`)
    times.push(`${hour.toString().padStart(2, '0')}:30`)
  }
  return times
})

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const computeEndTime = (start, duration) => {
  if (!start || !duration) return ''
  const [h, m] = start.split(':').map(Number)
  const startDate = new Date(2000, 0, 1, h, m)
  const endDate = new Date(startDate.getTime() + duration * 60000)
  return endDate.toTimeString().slice(0, 5)
}

const handleSubmit = async () => {
  try {
    submitting.value = true
    if (!form.value.date || !form.value.time || !form.value.duration || !form.value.type) {
      toast.error('Please fill in all required fields')
      submitting.value = false
      return
    }
    const categoryId = Array.isArray(consultant.value.categories) ? (consultant.value.categories[0]?._id || consultant.value.categories[0]) : null
    if (!categoryId) {
      toast.error('Consultant has no available categories')
      submitting.value = false
      return
    }
    const duration = parseInt(form.value.duration) || 60
    const hourlyRate = consultant.value?.hourlyRate || 100
    const sessionCost = hourlyRate * (duration / 60)
    const totalAmount = Math.round((sessionCost + platformFee) * 100) / 100
    const endTime = computeEndTime(form.value.time, duration) || '16:00'
    if (!totalAmount || !endTime) {
      toast.error('Total amount and end time are required.')
      submitting.value = false
      return
    }
    const bookingData = {
      consultant: consultant.value._id,
      category: categoryId,
      date: form.value.date,
      startTime: form.value.time,
      endTime: endTime,
      duration: duration,
      meetingType: form.value.type,
      totalAmount: totalAmount,
      notes: {
        client: [form.value.topics, form.value.requirements].filter(Boolean).join(' | ')
      }
    }
    // Debug: Log the exact payload being sent
    console.log('=== BOOKING PAYLOAD DEBUG ===')
    console.log('totalAmount:', totalAmount, typeof totalAmount)
    console.log('endTime:', endTime, typeof endTime)
    console.log('Full payload:', JSON.stringify(bookingData, null, 2))
    console.log('=== END DEBUG ===')
    const response = await bookingAPI.create(bookingData)
    if (response.data.success) {
      toast.success('Booking created successfully!')
      router.push({
        name: 'BookingConfirmation',
        state: {
          booking: {
            date: bookingData.date,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            consultantName: consultant.value.user?.firstName + ' ' + consultant.value.user?.lastName,
            meetingType: bookingData.meetingType,
            totalAmount: bookingData.totalAmount
          }
        }
      })
      return
    }
  } catch (error) {
    console.error('Failed to create booking:', error)
    if (error.response?.data?.errors) {
      const errorMessages = error.response.data.errors.map(err => err.msg).join(', ')
      toast.error(`Validation errors: ${errorMessages}`)
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Failed to create booking. Please try again.')
    }
  } finally {
    submitting.value = false
  }
}

const loadConsultant = async () => {
  if (!consultantId.value) return
  loading.value = true
  try {
    const response = await consultantAPI.getById(consultantId.value)
    consultant.value = response.data.data.consultant
  } catch (e) {
    consultant.value = null
  } finally {
    loading.value = false
  }
}
onMounted(loadConsultant)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="spinner-lg mx-auto mb-4"></div>
        <p class="text-gray-600">Loading booking form...</p>
      </div>
      <div v-else-if="!consultant" class="text-center py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Consultant not found</h2>
        <p class="text-gray-600 mb-6">The consultant you're trying to book is not available.</p>
        <router-link to="/consultants" class="btn-primary">
          Browse Consultants
        </router-link>
      </div>
      <div v-else class="space-y-8">
        <div>
          <router-link :to="`/consultants/${consultant._id}`" class="btn-ghost">
            ← Back to Profile
          </router-link>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="flex items-center space-x-4">
              <div class="avatar-lg">
                <img 
                  v-if="consultant.user?.avatar" 
                  :src="consultant.user.avatar" 
                  :alt="consultant.user?.firstName"
                  class="h-full w-full rounded-full object-cover"
                />
                <span v-else class="text-primary-600 text-xl">
                  {{ getInitials(consultant.user?.firstName, consultant.user?.lastName) }}
                </span>
              </div>
              <div class="flex-1">
                <h2 class="text-xl font-bold text-gray-900">
                  {{ consultant.user?.firstName }} {{ consultant.user?.lastName }}
                </h2>
                <p class="text-gray-600">{{ consultant.categories?.map(c => c.name).join(', ') }}</p>
                <div class="flex items-center mt-2">
                  <span class="ml-1 text-sm text-gray-700">
                    {{ consultant.rating?.average?.toFixed(1) || '0.0' }} ({{ consultant.rating?.count || 0 }} reviews)
                  </span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-primary-600">${{ consultant.hourlyRate }}/hr</div>
                <div class="text-sm text-gray-600">{{ consultant.experience }} years experience</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Book Consultation</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="form-label">Preferred Date</label>
                <input
                  v-model="form.date"
                  type="date"
                  required
                  :min="today"
                  class="form-input"
                />
              </div>
              <div>
                <label class="form-label">Preferred Time</label>
                <select v-model="form.time" required class="form-input">
                  <option value="">Select a time</option>
                  <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
              </div>
              <div>
                <label class="form-label">Session Duration</label>
                <select v-model="form.duration" required class="form-input">
                  <option value="">Select duration</option>
                  <option value="30">30 minutes - ${{ (consultant.hourlyRate * 0.5).toFixed(0) }}</option>
                  <option value="60">1 hour - ${{ consultant.hourlyRate }}</option>
                  <option value="90">1.5 hours - ${{ (consultant.hourlyRate * 1.5).toFixed(0) }}</option>
                  <option value="120">2 hours - ${{ (consultant.hourlyRate * 2).toFixed(0) }}</option>
                </select>
              </div>
              <div>
                <label class="form-label">Consultation Type</label>
                <select v-model="form.type" required class="form-input">
                  <option value="">Select type</option>
                  <option value="video">Video Call</option>
                  <option value="audio">Audio Call</option>
                  <option value="chat">Text Chat</option>
                </select>
              </div>
              <div>
                <label class="form-label">Topics to Discuss</label>
                <textarea
                  v-model="form.topics"
                  rows="4"
                  class="form-input"
                  placeholder="Please describe what you'd like to discuss during the consultation..."
                ></textarea>
              </div>
              <div>
                <label class="form-label">Special Requirements (Optional)</label>
                <textarea
                  v-model="form.requirements"
                  rows="3"
                  class="form-input"
                  placeholder="Any special requirements or accommodations needed..."
                ></textarea>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium text-gray-900 mb-3">Cost Summary</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Session Duration:</span>
                    <span>{{ form.duration || 0 }} minutes</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Rate:</span>
                    <span>${{ consultant.hourlyRate }}/hour</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Platform Fee:</span>
                    <span>${{ platformFee }}</span>
                  </div>
                  <div class="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span class="text-primary-600">${{ totalCost }}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <router-link :to="`/consultants/${consultant._id}`" class="btn-outline">
                  Cancel
                </router-link>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="btn-primary"
                >
                  <span v-if="submitting" class="spinner-sm mr-2"></span>
                  {{ submitting ? 'Booking...' : 'Confirm Booking' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 