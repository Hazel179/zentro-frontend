<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p class="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div v-if="!isAuthenticated" class="space-y-4">
          <router-link to="/" class="btn-primary">
            Go Home
          </router-link>
          <div class="text-sm">
            <button @click="$router.go(-1)" class="text-primary-600 hover:text-primary-500">
              ← Go Back
            </button>
          </div>
        </div>
        <div v-else class="space-y-4">
          <p class="text-gray-600 mb-4">You are logged in. Redirecting to your dashboard...</p>
          <router-link to="/dashboard" class="btn-primary">
            Go to Dashboard Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = authStore.isAuthenticated

onMounted(() => {
  if (isAuthenticated) {
    setTimeout(() => {
      router.replace('/dashboard')
    }, 1200)
  }
})
</script> 