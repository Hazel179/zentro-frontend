<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
            <p class="text-sm text-gray-600">Manage your account settings</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard" class="btn-outline">
              Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-8">
        <!-- Profile Information -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Profile Information</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleUpdateProfile" class="space-y-6">
              <!-- Avatar -->
              <div class="flex items-center space-x-6">
                <div class="avatar-xl">
                  <img 
                    v-if="form.avatar" 
                    :src="form.avatar" 
                    :alt="form.firstName"
                    class="h-full w-full rounded-full object-cover"
                  />
                  <span v-else class="text-primary-600 text-2xl">
                    {{ getInitials(form.firstName, form.lastName) }}
                  </span>
                </div>
                <div>
                  <label class="form-label">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleAvatarChange"
                    class="form-input"
                  />
                  <p class="text-sm text-gray-500 mt-1">
                    Upload a profile picture (optional)
                  </p>
                </div>
              </div>

              <!-- Name -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="form-label">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="form-input"
                  />
                </div>
                <div>
                  <label class="form-label">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="form-input"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label class="form-label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="form-input"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="form-label">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                />
              </div>

              <!-- Bio (for consultants) -->
              <div v-if="authStore.isConsultant">
                <label class="form-label">Bio</label>
                <textarea
                  v-model="form.bio"
                  rows="4"
                  class="form-input"
                  placeholder="Tell clients about your expertise and experience..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updating"
                  class="btn-primary"
                >
                  <span v-if="updating" class="spinner-sm mr-2"></span>
                  {{ updating ? 'Updating...' : 'Update Profile' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Consultant Profile (if consultant) -->
        <div v-if="authStore.isConsultant" class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Consultant Profile</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleUpdateConsultantProfile" class="space-y-6">
              <!-- Categories -->
              <div>
                <label class="form-label">Expertise Categories</label>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label 
                    v-for="category in categories" 
                    :key="category._id"
                    class="flex items-center"
                  >
                    <input
                      v-model="form.categories"
                      type="checkbox"
                      :value="category._id"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                  </label>
                </div>
              </div>

              <!-- Hourly Rate -->
              <div>
                <label class="form-label">Hourly Rate ($)</label>
                <input
                  v-model="form.hourlyRate"
                  type="number"
                  min="10"
                  max="1000"
                  required
                  class="form-input"
                />
              </div>

              <!-- Experience -->
              <div>
                <label class="form-label">Years of Experience</label>
                <input
                  v-model="form.experience"
                  type="number"
                  min="0"
                  max="50"
                  required
                  class="form-input"
                />
              </div>

              <!-- Languages -->
              <div>
                <label class="form-label">Languages (comma-separated)</label>
                <input
                  v-model="form.languages"
                  type="text"
                  class="form-input"
                  placeholder="English, Spanish, French"
                />
              </div>

              <!-- Qualifications -->
              <div>
                <label class="form-label">Qualifications</label>
                <div class="space-y-4">
                  <div 
                    v-for="(qual, index) in form.qualifications" 
                    :key="index"
                    class="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <input
                      v-model="qual.name"
                      type="text"
                      placeholder="Degree/Certification"
                      class="form-input"
                    />
                    <input
                      v-model="qual.institution"
                      type="text"
                      placeholder="Institution"
                      class="form-input"
                    />
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="qual.year"
                        type="number"
                        placeholder="Year"
                        class="form-input"
                      />
                      <button
                        type="button"
                        @click="removeQualification(index)"
                        class="btn-ghost text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="addQualification"
                    class="btn-outline"
                  >
                    Add Qualification
                  </button>
                </div>
              </div>

              <!-- Availability -->
              <div>
                <label class="form-label">Availability</label>
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input
                      v-model="form.isCurrentlyAvailable"
                      type="checkbox"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Currently available for bookings</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.isActive"
                      type="checkbox"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Active consultant profile</span>
                  </label>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="updating"
                  class="btn-primary"
                >
                  <span v-if="updating" class="spinner-sm mr-2"></span>
                  {{ updating ? 'Updating...' : 'Update Consultant Profile' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Change Password -->
        <div class="card">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-gray-900">Change Password</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleChangePassword" class="space-y-6">
              <div>
                <label class="form-label">Current Password</label>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  required
                  class="form-input"
                />
              </div>
              <div>
                <label class="form-label">New Password</label>
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  required
                  minlength="6"
                  class="form-input"
                />
              </div>
              <div>
                <label class="form-label">Confirm New Password</label>
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  required
                  class="form-input"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="changingPassword"
                  class="btn-outline"
                >
                  <span v-if="changingPassword" class="spinner-sm mr-2"></span>
                  {{ changingPassword ? 'Changing...' : 'Change Password' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Delete Account -->
        <div class="card border-red-200">
          <div class="card-header">
            <h2 class="text-xl font-semibold text-red-900">Delete Account</h2>
          </div>
          <div class="card-body">
            <p class="text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              @click="handleDeleteAccount"
              class="btn-danger"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { userAPI, consultantAPI, categoryAPI } from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// State
const updating = ref(false)
const changingPassword = ref(false)
const categories = ref([])

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  avatar: '',
  bio: '',
  categories: [],
  hourlyRate: '',
  experience: '',
  languages: '',
  qualifications: [],
  isCurrentlyAvailable: true,
  isActive: true
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Methods
const loadProfile = async () => {
  try {
    const response = await userAPI.getProfile()
    
    if (response.data.success) {
      const user = response.data.data.user
      Object.assign(form, {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || ''
      })

      // Load consultant profile if applicable
      if (authStore.isConsultant) {
        const consultantResponse = await consultantAPI.getMyProfile()
        if (consultantResponse.data.success) {
          const consultant = consultantResponse.data.data.consultant
          Object.assign(form, {
            bio: consultant.bio || '',
            categories: consultant.categories?.map(c => c._id) || [],
            hourlyRate: consultant.hourlyRate || '',
            experience: consultant.experience || '',
            languages: consultant.languages?.join(', ') || '',
            qualifications: consultant.qualifications || [],
            isCurrentlyAvailable: consultant.isCurrentlyAvailable,
            isActive: consultant.isActive
          })
        }
      }
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
    toast.error('Failed to load profile')
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

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.avatar = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const addQualification = () => {
  form.qualifications.push({
    name: '',
    institution: '',
    year: ''
  })
}

const removeQualification = (index) => {
  form.qualifications.splice(index, 1)
}

const handleUpdateProfile = async () => {
  try {
    updating.value = true
    
    const response = await userAPI.updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      avatar: form.avatar
    })
    
    if (response.data.success) {
      toast.success('Profile updated successfully!')
      authStore.updateUser(response.data.data.user)
    }
  } catch (error) {
    console.error('Failed to update profile:', error)
    toast.error('Failed to update profile')
  } finally {
    updating.value = false
  }
}

const handleUpdateConsultantProfile = async () => {
  try {
    updating.value = true
    
    const consultantData = {
      bio: form.bio,
      categories: form.categories,
      hourlyRate: parseInt(form.hourlyRate),
      experience: parseInt(form.experience),
      languages: form.languages.split(',').map(lang => lang.trim()).filter(lang => lang),
      qualifications: form.qualifications.filter(q => q.name && q.institution),
      isCurrentlyAvailable: form.isCurrentlyAvailable,
      isActive: form.isActive
    }
    
    const response = await consultantAPI.updateProfile(consultantData)
    
    if (response.data.success) {
      toast.success('Consultant profile updated successfully!')
    }
  } catch (error) {
    console.error('Failed to update consultant profile:', error)
    toast.error('Failed to update consultant profile')
  } finally {
    updating.value = false
  }
}

const handleChangePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    toast.error('New passwords do not match')
    return
  }
  
  try {
    changingPassword.value = true
    
    const response = await userAPI.changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    })
    
    if (response.data.success) {
      toast.success('Password changed successfully!')
      Object.assign(passwordForm, {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  } catch (error) {
    console.error('Failed to change password:', error)
    toast.error('Failed to change password')
  } finally {
    changingPassword.value = false
  }
}

const handleDeleteAccount = async () => {
  if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    return
  }
  
  try {
    const response = await userAPI.deleteAccount()
    
    if (response.data.success) {
      toast.success('Account deleted successfully')
      authStore.logout()
      router.push('/')
    }
  } catch (error) {
    console.error('Failed to delete account:', error)
    toast.error('Failed to delete account')
  }
}

// Initialize
onMounted(() => {
  loadProfile()
  if (authStore.isConsultant) {
    loadCategories()
  }
})
</script> 