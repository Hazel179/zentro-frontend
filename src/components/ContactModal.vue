<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <span aria-hidden="true">&times;</span>
      </button>
      <h3 class="text-xl font-semibold mb-4">Contact Consultant</h3>
      <form @submit.prevent="handleContact" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input v-model="contactData.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Enter your name" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input v-model="contactData.email" type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="your@email.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input v-model="contactData.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="+1 234 567 890" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select v-model="contactData.subject" required class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="pricing">Pricing Information</option>
            <option value="schedule">Schedule Consultation</option>
            <option value="custom">Custom Request</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea v-model="contactData.message" rows="4" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Tell us about your needs and how we can help..."></textarea>
        </div>
        <div class="flex gap-3 pt-2">
          <button type="button" @click="closeModal" class="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
          <button type="submit" :disabled="loading" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
            <span v-if="loading">Sending...</span>
            <span v-else>Send Message</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  service: Object
})
const emit = defineEmits(['close', 'contact-success'])

const loading = ref(false)
const contactData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

function closeModal() {
  emit('close')
  // Reset form
  contactData.value = { name: '', email: '', phone: '', subject: '', message: '' }
}

async function handleContact() {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    emit('contact-success', {
      service: props.service,
      contact: { ...contactData.value }
    })
    closeModal()
  } catch (e) {
    alert('Failed to send message. Please try again.')
  } finally {
    loading.value = false
  }
}
</script> 