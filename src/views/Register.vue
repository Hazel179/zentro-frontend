<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Join Zentro and connect with expert consultants
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- First Name -->
            <div>
              <label for="firstName" class="form-label">First name</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="form-input"
                placeholder="Enter your first name"
              />
            </div>

            <!-- Last Name -->
            <div>
              <label for="lastName" class="form-label">Last name</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="form-input"
                placeholder="Enter your last name"
              />
            </div>

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
                minlength="6"
                class="form-input"
                placeholder="Create a password (min 6 characters)"
              />
            </div>

            <!-- Role Selection -->
            <div>
              <label class="form-label">I want to join as:</label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    v-model="form.role"
                    type="radio"
                    value="client"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span class="ml-3 text-sm text-gray-700">
                    <strong>Client</strong> - I want to book consultations with experts
                  </span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="form.role"
                    type="radio"
                    value="consultant"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <span class="ml-3 text-sm text-gray-700">
                    <strong>Consultant</strong> - I want to offer my expertise
                  </span>
                </label>
              </div>
            </div>

            <!-- Phone (Optional) -->
            <div>
              <label for="phone" class="form-label">Phone number (optional)</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="form-input"
                placeholder="Enter your phone number"
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
                {{ authStore.isLoading ? 'Creating account...' : 'Create account' }}
              </button>
            </div>
          </form>

          <!-- Links -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link
                to="/login"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in
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
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'client',
  phone: ''
})

const handleRegister = async () => {
  const result = await authStore.register(form.value)
  if (result.success) {
    router.push('/dashboard')
  }
}
</script> 