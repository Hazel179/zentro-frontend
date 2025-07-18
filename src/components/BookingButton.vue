<template>
  <button
    @click="handleClick"
    :disabled="isLoading || disabled"
    class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
  >
    <span v-if="isLoading">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Booking...
    </span>
    <span v-else>
      <slot>Book This Service</slot>
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  service: Object,
  disabled: Boolean
})
const emit = defineEmits(['book-service'])
const isLoading = ref(false)

const handleClick = async () => {
  isLoading.value = true
  try {
    console.log('BookingButton: emitting book-service', props.service)
    emit('book-service', props.service)
  } finally {
    isLoading.value = false
  }
}
</script> 