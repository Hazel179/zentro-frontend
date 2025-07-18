<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manage Consultants</h1>
            <p class="text-sm text-gray-600">View and manage consultant profiles</p>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/admin" class="btn-outline">
              Admin Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="card">
        <div class="card-body">
          <div v-if="loading" class="text-center py-8">Loading consultants...</div>
          <div v-else-if="error" class="text-center text-red-600 py-8">{{ error }}</div>
          <div v-else>
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="consultant in consultants" :key="consultant.id">
                  <td class="px-4 py-2">{{ consultant.user?.firstName }} {{ consultant.user?.lastName }}</td>
                  <td class="px-4 py-2">{{ consultant.user?.email }}</td>
                  <td class="px-4 py-2">
                    <select v-model="consultant.isActive" @change="updateStatus(consultant)" class="form-input">
                      <option :value="true">Active</option>
                      <option :value="false">Inactive</option>
                    </select>
                  </td>
                  <td class="px-4 py-2">
                    <button @click="deleteConsultant(consultant)" class="btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="consultants.length === 0" class="text-center text-gray-500 py-8">No consultants found.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminAPI } from '@/services/api'

const consultants = ref([])
const loading = ref(false)
const error = ref('')

const fetchConsultants = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await adminAPI.getConsultants()
    consultants.value = res.data.data.consultants || res.data.data || []
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load consultants'
  } finally {
    loading.value = false
  }
}

const deleteConsultant = async (consultant) => {
  if (!confirm(`Delete consultant ${consultant.user?.email}?`)) return
  try {
    await adminAPI.updateUserStatus(consultant.user.id, 'deleted')
    consultants.value = consultants.value.filter(c => c.user.id !== consultant.user.id)
  } catch (err) {
    alert('Failed to delete consultant')
  }
}

const updateStatus = async (consultant) => {
  try {
    await adminAPI.updateUserStatus(consultant.user.id, consultant.isActive ? 'active' : 'inactive')
  } catch (err) {
    alert('Failed to update status')
  }
}

onMounted(fetchConsultants)
</script> 