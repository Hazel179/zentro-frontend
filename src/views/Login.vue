<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
        <p class="mt-2 text-sm text-gray-600">
          Sign in to your Zentro account
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="form-label">Email address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="form-input"
                placeholder="Enter your email"
              />
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="form-input"
                placeholder="Enter your password"
              />
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="authStore.isLoading"
                class="btn-primary w-full"
              >
                <span v-if="authStore.isLoading" class="spinner-sm mr-2"></span>
                {{ authStore.isLoading ? 'Signing in...' : 'Sign in' }}
              </button>
            </div>
          </form>

          <!-- Links -->
          <div class="mt-6 text-center">
            <router-link
              to="/forgot-password"
              class="text-sm text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </router-link>
          </div>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <router-link
                to="/register"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  authStore.isLoading = true
  try {
    const result = await authStore.login(form.value)
    if (result.success) {
      // Store userId, role, and JWT in localStorage
      localStorage.setItem('userId', authStore.user?.id || authStore.user?._id || '')
      localStorage.setItem('role', authStore.userRole)
      localStorage.setItem('token', authStore.token)
      // Role-based redirect
      if (authStore.userRole === 'admin') {
        router.push('/admin')
      } else if (authStore.userRole === 'client') {
        router.push('/home')
      } else if (authStore.userRole === 'consultant') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } else {
      // Show error alert for known errors
      if (result.error && (result.error.includes('401') || result.error.toLowerCase().includes('unauthorized'))){
        alert('Invalid credentials. Please check your email and password.')
      } else if (result.error && (result.error.includes('403') || result.error.toLowerCase().includes('forbidden'))){
        alert('Access denied. You do not have permission to log in.')
      } else if (result.error && (result.error.includes('500') || result.error.toLowerCase().includes('server'))){
        alert('Server error. Please try again later.')
      } else {
        alert(result.error || 'Login failed')
      }
      console.log('Login error:', result.error)
    }
  } catch (err) {
    alert('Login failed')
    console.log('Login error:', err)
  } finally {
    authStore.isLoading = false
  }
}
</script> 