<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-sm text-gray-600">Welcome back, {{ authStore.user?.firstName }}!</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/profile" class="btn-outline">
              Profile
            </router-link>
            <button @click="handleLogout" class="btn-ghost">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Role-specific content -->
      <div v-if="authStore.isClient" class="space-y-8">
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <MagnifyingGlassIcon class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Find Consultants</h3>
              <p class="text-sm text-gray-600 mb-4">Browse and book sessions with expert consultants</p>
              <router-link to="/consultants" class="btn-primary">
                Browse Consultants
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <CalendarIcon class="w-6 h-6 text-secondary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">My Bookings</h3>
              <p class="text-sm text-gray-600 mb-4">View and manage your upcoming sessions</p>
              <router-link to="/bookings" class="btn-secondary">
                View Bookings
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <StarIcon class="w-6 h-6 text-green-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Rate Sessions</h3>
              <p class="text-sm text-gray-600 mb-4">Leave reviews for completed consultations</p>
              <router-link to="/bookings" class="btn-outline">
                Rate Sessions
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="authStore.isConsultant" class="space-y-8">
        <!-- Consultant Dashboard -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <CalendarIcon class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Manage Bookings</h3>
              <p class="text-sm text-gray-600 mb-4">View and respond to booking requests</p>
              <router-link to="/bookings" class="btn-primary">
                View Bookings
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <UserIcon class="w-6 h-6 text-secondary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">My Profile</h3>
              <p class="text-sm text-gray-600 mb-4">Update your consultant profile and availability</p>
              <router-link to="/profile" class="btn-secondary">
                Edit Profile
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <ChartBarIcon class="w-6 h-6 text-green-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p class="text-sm text-gray-600 mb-4">View your performance and earnings</p>
              <button class="btn-outline" disabled>
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="authStore.isAdmin" class="space-y-8">
        <!-- Admin Dashboard -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <UsersIcon class="w-6 h-6 text-primary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Manage Users</h3>
              <router-link to="/admin/users" class="btn-primary">
                View Users
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                <UserGroupIcon class="w-6 h-6 text-secondary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Consultants</h3>
              <router-link to="/admin/consultants" class="btn-secondary">
                Manage Consultants
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CalendarIcon class="w-6 h-6 text-green-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Bookings</h3>
              <router-link to="/admin/bookings" class="btn-outline">
                View All Bookings
              </router-link>
            </div>
          </div>

          <div class="card">
            <div class="card-body text-center">
              <div class="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <TagIcon class="w-6 h-6 text-purple-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
              <router-link to="/admin/categories" class="btn-outline">
                Manage Categories
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div class="card-body">
          <div class="text-center text-gray-500 py-8">
            <p>No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  StarIcon, 
  UserIcon, 
  ChartBarIcon,
  UsersIcon,
  UserGroupIcon,
  TagIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script> 